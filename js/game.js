'use strict';

// ── Game State ────────────────────────────────────────────────────────────────
const GameState = {
    deck:            [],
    centerCards:     [],   // cards and builds on the table
    playerHand:      [],
    aiHand:          [],
    playerCaptures:  [],   // face-up capture pile (top = last element = lowest card)
    aiCaptures:      [],   // face-up capture pile (top = last element = lowest card)
    playerScore:     0,    // cumulative game score
    aiScore:         0,    // cumulative game score
    lastCapture:     null, // 'player' | 'ai'
    currentTurn:     'player',
    gamePhase:       'playing', // 'playing' | 'roundOver' | 'gameOver'
    roundNumber:     1,
    isSecondPhase:   false,       // true after the second deal of 10 cards
    nextFirstPlayer: 'player'     // who goes first in the next round (SA: loser goes first)
};

// ── Initialization ────────────────────────────────────────────────────────────
function initGame() {
    GameState.playerScore     = 0;
    GameState.aiScore         = 0;
    GameState.roundNumber     = 1;
    GameState.gamePhase       = 'playing';
    GameState.nextFirstPlayer = 'player';
    startRound();
}

function startRound() {
    const deck = createDeck(); // 40-card SA pack
    GameState.deck           = shuffleDeck(deck);
    GameState.centerCards    = [];
    GameState.playerHand     = [];
    GameState.aiHand         = [];
    GameState.playerCaptures = [];
    GameState.aiCaptures     = [];
    GameState.lastCapture    = null;
    GameState.isSecondPhase  = false;
    GameState.currentTurn    = GameState.nextFirstPlayer;

    // SA rules: for 2 players, NO center cards are dealt at the start.
    // The first player cannot capture — they must drift.
    // Deal 10 cards to each player; 20 remain in deck for the second deal.
    for (let i = 0; i < 10; i++) {
        GameState.playerHand.push(GameState.deck.pop());
        GameState.aiHand.push(GameState.deck.pop());
    }
}

function dealSecondHands() {
    // SA rule: after both players use their first 10 cards, deal 10 more each.
    for (let i = 0; i < 10; i++) {
        GameState.playerHand.push(GameState.deck.pop());
        GameState.aiHand.push(GameState.deck.pop());
    }
    // Second phase: players are always allowed to drift, even with a build on the table.
    GameState.isSecondPhase = true;
}

// ── Item value helpers ────────────────────────────────────────────────────────
function getItemValue(item) {
    if (item.type === 'build')        return item.targetValue;
    if (item.type === 'pileTopCard')  return item.card.value;
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

    // Cannot incorporate an opponent's build
    if (selectedCenterItems.some(item => item.type === 'build' && item.owner !== who))
        return false;

    // Cannot use your own pile's top card as build material
    if (selectedCenterItems.some(item => item.type === 'pileTopCard' && item.pileOwner === who))
        return false;

    // SA rule: can only steal opponent's pile top into a build if you already have an active build
    if (selectedCenterItems.some(item => item.type === 'pileTopCard') && !hasActiveBuild(who))
        return false;

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

// ── Execute moves ─────────────────────────────────────────────────────────────
function executeCapture(handCard, selectedCenterItems, isPlayer) {
    const who = isPlayer ? 'player' : 'ai';

    // Remove played card from hand
    if (isPlayer) {
        GameState.playerHand = GameState.playerHand.filter(c => c.id !== handCard.id);
    } else {
        GameState.aiHand = GameState.aiHand.filter(c => c.id !== handCard.id);
    }

    // Flatten all captured cards (handle pileTopCard, build, and regular cards)
    const capturedCards = [handCard];
    for (const item of selectedCenterItems) {
        if (item.type === 'pileTopCard') {
            capturedCards.push(item.card);
        } else {
            capturedCards.push(...(item.type === 'build' ? item.cards : [item]));
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

    // SA rule: place captured cards in numerical order with the LOWEST card on top.
    // Sort descending so the lowest value ends up as the last element (top of pile).
    capturedCards.sort((a, b) => b.value - a.value);

    if (isPlayer) {
        GameState.playerCaptures.push(...capturedCards);
    } else {
        GameState.aiCaptures.push(...capturedCards);
    }

    GameState.lastCapture = who;

    // Track whether the table was cleared (no score points in SA rules, but useful for UI)
    const isTableClear = GameState.centerCards.length === 0;
    return { isTableClear, capturedCards };
}

function executeBuild(handCard, selectedCenterItems, isPlayer) {
    const who = isPlayer ? 'player' : 'ai';

    const selectedSum = selectedCenterItems.reduce((s, item) => s + getItemValue(item), 0);
    const target = handCard.value + selectedSum;

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

    const build = {
        type:        'build',
        cards:       buildCards,
        targetValue: target,
        owner:       who,
        id:          `build_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    };
    GameState.centerCards.push(build);

    return { targetValue: target, build };
}

// SA terminology: "drifting" = playing a card without capturing
function executeTrail(handCard, isPlayer) {
    // SA rule: cannot drift with an active build (except in the second phase)
    if (isPlayer && hasActiveBuild('player') && !GameState.isSecondPhase) {
        return { error: "You have a build — you must capture or add to your build, not drift!" };
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
// Returns: 'continue' | 'newHands' | 'roundOver'
function checkAfterTurn() {
    if (GameState.playerHand.length > 0 || GameState.aiHand.length > 0) return 'continue';

    // Both hands empty — check for second deal
    if (GameState.deck.length > 0) {
        dealSecondHands();
        return 'newHands';
    }

    // All 40 cards played
    endRoundCleanup();
    return 'roundOver';
}

function endRoundCleanup() {
    if (GameState.centerCards.length > 0 && GameState.lastCapture) {
        const remaining = [];
        for (const item of GameState.centerCards) {
            remaining.push(...(item.type === 'build' ? item.cards : [item]));
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

    // SA rule: the loser of the previous round starts first in the next round
    if (scores.player.total < scores.ai.total) {
        GameState.nextFirstPlayer = 'player';
    } else if (scores.ai.total < scores.player.total) {
        GameState.nextFirstPlayer = 'ai';
    }
    // On a tie, keep the same first player
}

function checkGameOver() {
    return GameState.playerScore >= 11 || GameState.aiScore >= 11;
}

function nextTurn() {
    GameState.currentTurn = GameState.currentTurn === 'player' ? 'ai' : 'player';
}
