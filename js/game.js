'use strict';

// ── Game State ────────────────────────────────────────────────────────────────
const GameState = {
    deck:            [],
    centerCards:     [],   // cards, builds, and drifted piles on the table
    playerHand:      [],
    aiHand:          [],
    playerCaptures:  [],   // face-up capture pile (top = last element = the capturing card)
    aiCaptures:      [],   // face-up capture pile (top = last element = the capturing card)
    playerScore:     0,    // cumulative game score
    aiScore:         0,    // cumulative game score
    lastCapture:     null, // 'player' | 'ai'
    currentTurn:     'player',
    gamePhase:       'playing', // 'playing' | 'roundOver' | 'gameOver'
    roundNumber:     1,         // 1 or 2; game ends after round 2
    nextFirstPlayer: 'player'   // who goes first in the next round
};

// ── Initialization ────────────────────────────────────────────────────────────
// The 40-card deck is created ONCE per game and split across the two rounds.
function initGame() {
    GameState.playerScore     = 0;
    GameState.aiScore         = 0;
    GameState.roundNumber     = 1;
    GameState.gamePhase       = 'playing';
    GameState.nextFirstPlayer = 'player';
    GameState.deck            = shuffleDeck(createDeck()); // one deck for the whole game
    startRound();
}

// Deal 10 cards each from the shared deck and reset per-round state.
// Called twice per game (round 1 and round 2).
function startRound() {
    GameState.centerCards    = [];
    GameState.playerHand     = [];
    GameState.aiHand         = [];
    GameState.playerCaptures = [];
    GameState.aiCaptures     = [];
    GameState.lastCapture    = null;
    GameState.currentTurn    = GameState.nextFirstPlayer;

    // Deal 10 cards to each player from the shared deck.
    for (let i = 0; i < 10; i++) {
        GameState.playerHand.push(GameState.deck.pop());
        GameState.aiHand.push(GameState.deck.pop());
    }
}

// ── Item value helpers ────────────────────────────────────────────────────────
function getItemValue(item) {
    if (item.type === 'build')       return item.targetValue;
    if (item.type === 'drifted')     return item.value;
    if (item.type === 'pileTopCard') return item.card.value;
    return item.value;
}

// ── Subset-sum (for capture / build lookups) ──────────────────────────────────
function findSubsetsWithSum(items, targetSum) {
    const results = [];
    function bt(idx, chosen, sum) {
        if (sum === targetSum && chosen.length > 0) {
            results.push([...chosen]);
        }
        if (sum >= targetSum || idx >= items.length) return;
        for (let i = idx; i < items.length; i++) {
            const v = getItemValue(items[i]);
            if (sum + v <= targetSum) {
                chosen.push(items[i]);
                bt(i + 1, chosen, sum + v);
                chosen.pop();
            }
        }
    }
    bt(0, [], 0);
    return results;
}

// ── Pile top card helpers ─────────────────────────────────────────────────────
// Returns the top-card wrapper for the OPPONENT's pile.
// isPlayer = true  → player is acting; opponent = AI
// isPlayer = false → AI is acting;     opponent = player
function getOpponentTopPileItem(isPlayer) {
    const pile = isPlayer ? GameState.aiCaptures : GameState.playerCaptures;
    if (pile.length === 0) return null;
    const card = pile[pile.length - 1];
    return {
        type:      'pileTopCard',
        pileOwner: isPlayer ? 'ai' : 'player',
        card,
        value:     card.value,
        rank:      card.rank,
        suit:      card.suit,
        id:        card.id + '_pileTop'
    };
}

// ── Capture validation ────────────────────────────────────────────────────────
// SA 40-card deck: all values are numeric (A=1, 2–10). No dual-value Ace.
function isValidCapture(handCard, selectedItems) {
    if (!selectedItems || selectedItems.length === 0) return false;
    const sum = selectedItems.reduce((s, item) => s + getItemValue(item), 0);
    return sum === handCard.value;
}

// Return all valid capture combinations for handCard (includes opponent pile top).
function getValidCaptureOptions(handCard, isPlayer = true) {
    const center   = GameState.centerCards;
    const oppTop   = getOpponentTopPileItem(isPlayer);
    const capturable = oppTop ? [...center, oppTop] : [...center];
    return findSubsetsWithSum(capturable, handCard.value);
}

// ── Build validation ──────────────────────────────────────────────────────────
function isValidBuild(handCard, selectedCenterItems, hand) {
    if (!selectedCenterItems || selectedCenterItems.length === 0) return false;

    const who = (hand === GameState.playerHand) ? 'player' : 'ai';

    const hasMyBuild        = hasActiveBuild(who);
    const myBuildSelected   = selectedCenterItems.some(item => item.type === 'build' && item.owner === who);
    const oppBuildSelected  = selectedCenterItems.some(item => item.type === 'build' && item.owner !== who);

    // Cannot use your own pile's top card as build material
    if (selectedCenterItems.some(item => item.type === 'pileTopCard' && item.pileOwner === who))
        return false;

    // Pile top rule: you may include the opponent's pile top in a build only when:
    //  (a) it is the only center material (no other center cards selected alongside it), OR
    //  (b) every other selected center item has the exact same value as the pile top card.
    if (selectedCenterItems.some(item => item.type === 'pileTopCard')) {
        const pileTop      = selectedCenterItems.find(i => i.type === 'pileTopCard');
        const pileTopValue = pileTop.card.value;
        const otherItems   = selectedCenterItems.filter(i => i.type !== 'pileTopCard');
        if (otherItems.length > 0 && !otherItems.every(i => getItemValue(i) === pileTopValue)) {
            return false;
        }
    }

    // Cannot include a drifted pile in a build
    if (selectedCenterItems.some(item => item.type === 'drifted'))
        return false;

    // ── Steal opponent's build ────────────────────────────────────────────────
    // Allowed once per build; you must NOT already own a build.
    if (oppBuildSelected) {
        if (hasMyBuild) return false; // can't steal while owning a build
        const oppBuild = selectedCenterItems.find(item => item.type === 'build' && item.owner !== who);
        if (oppBuild && oppBuild.stolen) return false; // already been stolen once
    }

    // ── One build per player: must extend existing build if one is active ─────
    if (hasMyBuild && !myBuildSelected && !oppBuildSelected) return false;

    const selectedSum = selectedCenterItems.reduce((s, item) => s + getItemValue(item), 0);
    const target = handCard.value + selectedSum;

    // SA 40-card deck: max card value is 10
    if (target < 2 || target > 10) return false;

    // Must hold another card in hand to capture this build later
    return hand.some(card => {
        if (card === handCard) return false;
        return card.value === target;
    });
}

// ── State helpers ─────────────────────────────────────────────────────────────
function hasActiveBuild(who) {
    return GameState.centerCards.some(item => item.type === 'build' && item.owner === who);
}

// ── Drift validation ──────────────────────────────────────────────────────────
// Drifting: intentionally not capturing your building by playing the capture card
// on top of it — the build becomes an open pile anyone can capture.
function isValidDrift(handCard, isPlayer) {
    const who = isPlayer ? 'player' : 'ai';
    const myBuild = GameState.centerCards.find(item => item.type === 'build' && item.owner === who);
    if (!myBuild) return false;
    return handCard.value === myBuild.targetValue;
}

// ── Execute moves ─────────────────────────────────────────────────────────────
function executeCapture(handCard, selectedCenterItems, isPlayer) {
    const who = isPlayer ? 'player' : 'ai';

    // Remove played card from hand
    if (isPlayer) {
        GameState.playerHand = GameState.playerHand.filter(c => c.id !== handCard.id);
    } else {
        GameState.aiHand = GameState.aiHand.filter(c => c.id !== handCard.id);
    }

    // Flatten all captured cards (handle pileTopCard, build, drifted, and regular cards)
    const capturedCards = [];
    for (const item of selectedCenterItems) {
        if (item.type === 'pileTopCard') {
            capturedCards.push(item.card);
        } else if (item.type === 'build' || item.type === 'drifted') {
            capturedCards.push(...item.cards);
        } else {
            capturedCards.push(item);
        }
    }

    // Remove pile top cards from their piles
    for (const item of selectedCenterItems) {
        if (item.type === 'pileTopCard') {
            const pile = item.pileOwner === 'player' ? GameState.playerCaptures : GameState.aiCaptures;
            const idx  = pile.length - 1;
            if (idx >= 0 && pile[idx].id === item.card.id) pile.splice(idx, 1);
        }
    }

    // Remove non-pile items from center
    const centerItems = selectedCenterItems.filter(i => i.type !== 'pileTopCard');
    GameState.centerCards = GameState.centerCards.filter(
        item => !centerItems.some(sel => sel === item)
    );

    // Sort captured cards: highest at bottom (index 0), capturing card on top (last)
    capturedCards.sort((a, b) => b.value - a.value);
    const sortedCards = [...capturedCards, handCard]; // capturing card goes on top

    if (isPlayer) {
        GameState.playerCaptures.push(...sortedCards);
    } else {
        GameState.aiCaptures.push(...sortedCards);
    }

    GameState.lastCapture = who;

    const isTableClear = GameState.centerCards.length === 0;
    return { isTableClear, capturedCards: sortedCards };
}

function executeBuild(handCard, selectedCenterItems, isPlayer) {
    const who = isPlayer ? 'player' : 'ai';

    const isSteal = selectedCenterItems.some(item => item.type === 'build' && item.owner !== who);

    const selectedSum = selectedCenterItems.reduce((s, item) => s + getItemValue(item), 0);
    const target = handCard.value + selectedSum;

    // Collect all cards going into the new build
    const buildCards = [handCard];
    for (const item of selectedCenterItems) {
        if (item.type === 'pileTopCard') {
            buildCards.push(item.card);
        } else {
            buildCards.push(...(item.type === 'build' ? item.cards : [item]));
        }
    }

    if (isPlayer) {
        GameState.playerHand = GameState.playerHand.filter(c => c.id !== handCard.id);
    } else {
        GameState.aiHand = GameState.aiHand.filter(c => c.id !== handCard.id);
    }

    for (const item of selectedCenterItems) {
        if (item.type === 'pileTopCard') {
            const pile = item.pileOwner === 'player' ? GameState.playerCaptures : GameState.aiCaptures;
            const idx  = pile.length - 1;
            if (idx >= 0 && pile[idx].id === item.card.id) pile.splice(idx, 1);
        }
    }

    const centerItems = selectedCenterItems.filter(i => i.type !== 'pileTopCard');
    GameState.centerCards = GameState.centerCards.filter(
        item => !centerItems.some(sel => sel === item)
    );

    // Sort: highest card at index 0 (bottom of visual stack), lowest on top
    buildCards.sort((a, b) => b.value - a.value);

    const build = {
        type:        'build',
        cards:       buildCards,
        targetValue: target,
        owner:       who,
        stolen:      isSteal, // stolen builds cannot be stolen a second time
        id:          `build_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    };
    GameState.centerCards.push(build);

    return { targetValue: target, build };
}

// "Drift" your own build: play the capture card on top of the build, converting
// it to an open pile that anyone can capture.
function executeDrift(handCard, isPlayer) {
    const who = isPlayer ? 'player' : 'ai';
    const myBuild = GameState.centerCards.find(item => item.type === 'build' && item.owner === who);
    if (!myBuild) return { error: 'No active build to drift.' };
    if (handCard.value !== myBuild.targetValue) {
        return { error: `You must play a ${myBuild.targetValue} to drift your build.` };
    }

    if (isPlayer) {
        GameState.playerHand = GameState.playerHand.filter(c => c.id !== handCard.id);
    } else {
        GameState.aiHand = GameState.aiHand.filter(c => c.id !== handCard.id);
    }

    // Convert the build to an open drifted pile (hand card goes on top)
    const drifted = {
        type:  'drifted',
        cards: [...myBuild.cards, handCard], // original build cards + drift card on top
        value: handCard.value,
        id:    `drifted_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    };

    GameState.centerCards = GameState.centerCards.filter(item => item !== myBuild);
    GameState.centerCards.push(drifted);

    return { success: true, drifted };
}

// "Play Card": place a card face-up on the center table without capturing.
// In round 1, this is blocked if the player has an active build.
function executeTrail(handCard, isPlayer) {
    if (isPlayer && hasActiveBuild('player') && GameState.roundNumber === 1) {
        return { error: "Round 1: You have a build — you must capture or drift it, not play a card!" };
    }
    if (!isPlayer && hasActiveBuild('ai') && GameState.roundNumber === 1) {
        return { error: "AI has a build in round 1." };
    }

    if (isPlayer) {
        GameState.playerHand = GameState.playerHand.filter(c => c.id !== handCard.id);
    } else {
        GameState.aiHand = GameState.aiHand.filter(c => c.id !== handCard.id);
    }

    GameState.centerCards.push(handCard);
    return { success: true };
}

// ── Round flow ────────────────────────────────────────────────────────────────
// Returns: 'continue' | 'roundOver'
function checkAfterTurn() {
    if (GameState.playerHand.length > 0 || GameState.aiHand.length > 0) return 'continue';

    // Both hands empty — round is over
    endRoundCleanup();
    return 'roundOver';
}

function endRoundCleanup() {
    if (GameState.centerCards.length > 0 && GameState.lastCapture) {
        const remaining = [];
        for (const item of GameState.centerCards) {
            if (item.type === 'build' || item.type === 'drifted') {
                remaining.push(...item.cards);
            } else {
                remaining.push(item);
            }
        }
        if (GameState.lastCapture === 'player') {
            GameState.playerCaptures.push(...remaining);
        } else {
            GameState.aiCaptures.push(...remaining);
        }
    }
    GameState.centerCards = [];
}

// ── Scoring (South African Casino) ───────────────────────────────────────────
function calculateRoundScores() {
    const p = GameState.playerCaptures;
    const a = GameState.aiCaptures;

    const pSpades = p.filter(c => c.suit === 'spades').length;
    const aSpades = a.filter(c => c.suit === 'spades').length;

    const scores = {
        player: {
            mostCards:    0,
            fiveSpades:   0, // at least 5 spades
            littleCasino: 0,
            bigCasino:    0,
            aces:         0,
            total:        0,
            cardCount:    p.length,
            spadeCount:   pSpades
        },
        ai: {
            mostCards:    0,
            fiveSpades:   0,
            littleCasino: 0,
            bigCasino:    0,
            aces:         0,
            total:        0,
            cardCount:    a.length,
            spadeCount:   aSpades
        }
    };

    // Most cards: 2 pts; if tied, each gets 1 pt
    if (p.length > a.length)      { scores.player.mostCards = 2; }
    else if (a.length > p.length) { scores.ai.mostCards     = 2; }
    else                          { scores.player.mostCards = 1; scores.ai.mostCards = 1; }

    // At least 5 spades: 1 pt (each qualifying player scores independently)
    if (pSpades >= 5) scores.player.fiveSpades = 1;
    if (aSpades >= 5) scores.ai.fiveSpades     = 1;

    // 2♠ Little Casino (1 pt)
    if      (p.some(c => c.rank === '2' && c.suit === 'spades')) scores.player.littleCasino = 1;
    else if (a.some(c => c.rank === '2' && c.suit === 'spades')) scores.ai.littleCasino     = 1;

    // 10♦ Big Casino (2 pts)
    if      (p.some(c => c.rank === '10' && c.suit === 'diamonds')) scores.player.bigCasino = 2;
    else if (a.some(c => c.rank === '10' && c.suit === 'diamonds')) scores.ai.bigCasino     = 2;

    // Aces (1 pt each)
    scores.player.aces = p.filter(c => c.rank === 'A').length;
    scores.ai.aces     = a.filter(c => c.rank === 'A').length;

    scores.player.total =
        scores.player.mostCards + scores.player.fiveSpades +
        scores.player.littleCasino + scores.player.bigCasino +
        scores.player.aces;

    scores.ai.total =
        scores.ai.mostCards + scores.ai.fiveSpades +
        scores.ai.littleCasino + scores.ai.bigCasino +
        scores.ai.aces;

    return scores;
}

function applyRoundScores(scores) {
    GameState.playerScore += scores.player.total;
    GameState.aiScore     += scores.ai.total;
    GameState.roundNumber++;

    // The loser of the previous round starts first in the next round
    if (scores.player.total < scores.ai.total) {
        GameState.nextFirstPlayer = 'player';
    } else if (scores.ai.total < scores.player.total) {
        GameState.nextFirstPlayer = 'ai';
    }
    // On a tie, keep the same first player
}

// Two-player Kassino is played over exactly two rounds.
function checkGameOver() {
    return GameState.roundNumber > 2;
}

function nextTurn() {
    GameState.currentTurn = GameState.currentTurn === 'player' ? 'ai' : 'player';
}
