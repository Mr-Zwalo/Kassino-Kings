'use strict';

// ── Game State ────────────────────────────────────────────────────────────────
const GameState = {
    deck:           [],
    centerCards:    [],   // cards and builds
    playerHand:     [],
    aiHand:         [],
    playerCaptures: [],
    aiCaptures:     [],
    playerSweeps:   0,
    aiSweeps:       0,
    playerScore:    0,    // cumulative game score
    aiScore:        0,    // cumulative game score
    lastCapture:    null, // 'player' | 'ai'
    currentTurn:    'player',
    gamePhase:      'playing', // 'playing' | 'roundOver' | 'gameOver'
    roundNumber:    1
};

// ── Initialization ────────────────────────────────────────────────────────────
function initGame() {
    GameState.playerScore = 0;
    GameState.aiScore     = 0;
    GameState.roundNumber = 1;
    GameState.gamePhase   = 'playing';
    startRound();
}

function startRound() {
    const deck = createDeck();
    GameState.deck           = shuffleDeck(deck);
    GameState.centerCards    = [];
    GameState.playerHand     = [];
    GameState.aiHand         = [];
    GameState.playerCaptures = [];
    GameState.aiCaptures     = [];
    GameState.playerSweeps   = 0;
    GameState.aiSweeps       = 0;
    GameState.lastCapture    = null;
    GameState.currentTurn    = 'player';

    // Deal 4 cards face-up to center
    for (let i = 0; i < 4; i++) {
        GameState.centerCards.push(GameState.deck.pop());
    }
    // Deal 4 cards to each player (alternate)
    for (let i = 0; i < 4; i++) {
        GameState.playerHand.push(GameState.deck.pop());
        GameState.aiHand.push(GameState.deck.pop());
    }
}

function dealNewHands() {
    if (GameState.deck.length === 0) return false;
    for (let i = 0; i < 4; i++) {
        if (GameState.deck.length > 0) GameState.playerHand.push(GameState.deck.pop());
        if (GameState.deck.length > 0) GameState.aiHand.push(GameState.deck.pop());
    }
    return true;
}

// ── Item value helpers ────────────────────────────────────────────────────────
function getItemValue(item) {
    return item.type === 'build' ? item.targetValue : item.value;
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

// ── Capture validation ────────────────────────────────────────────────────────
function isValidCapture(handCard, selectedItems) {
    if (!selectedItems || selectedItems.length === 0) return false;

    if (isFaceCard(handCard)) {
        // Face cards capture same-rank face cards only (no builds, no arithmetic)
        return selectedItems.every(
            item => item.type !== 'build' && isFaceCard(item) && item.rank === handCard.rank
        );
    }

    const sum = selectedItems.reduce((s, item) => s + getItemValue(item), 0);
    if (isAce(handCard)) return sum === 1 || sum === 14;
    return sum === handCard.value;
}

// Return all valid capture combinations for handCard against current center
function getValidCaptureOptions(handCard) {
    const center = GameState.centerCards;

    if (isFaceCard(handCard)) {
        const matches = center.filter(
            item => item.type !== 'build' && isFaceCard(item) && item.rank === handCard.rank
        );
        return matches.length > 0 ? [matches] : [];
    }

    if (isAce(handCard)) {
        const s1  = findSubsetsWithSum(center, 1);
        const s14 = findSubsetsWithSum(center, 14);
        return [...s1, ...s14];
    }

    return findSubsetsWithSum(center, handCard.value);
}

// ── Build validation ──────────────────────────────────────────────────────────
function isValidBuild(handCard, selectedCenterItems, hand) {
    if (!selectedCenterItems || selectedCenterItems.length === 0) return false;
    if (isFaceCard(handCard)) return false;

    // Cannot select opponent builds
    if (selectedCenterItems.some(item => item.type === 'build' && item.owner === 'ai'))
        return false;

    const selectedSum = selectedCenterItems.reduce((s, item) => s + getItemValue(item), 0);
    const target = handCard.value + selectedSum;
    if (target < 2 || target > 14) return false;

    // Must have another card in hand that can later capture this build
    return hand.some(card => {
        if (card === handCard) return false;
        if (card.rank === 'A') return target === 1 || target === 14;
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

    // Flatten all captured cards
    const capturedCards = [handCard];
    for (const item of selectedCenterItems) {
        capturedCards.push(...(item.type === 'build' ? item.cards : [item]));
    }

    // Remove captured items from center
    GameState.centerCards = GameState.centerCards.filter(
        item => !selectedCenterItems.some(sel => sel === item)
    );

    // Add to capture pile
    if (isPlayer) {
        GameState.playerCaptures.push(...capturedCards);
    } else {
        GameState.aiCaptures.push(...capturedCards);
    }

    GameState.lastCapture = who;

    const isSweep = GameState.centerCards.length === 0;
    if (isSweep) {
        if (isPlayer) GameState.playerSweeps++;
        else           GameState.aiSweeps++;
    }

    return { isSweep, capturedCards };
}

function executeBuild(handCard, selectedCenterItems, isPlayer) {
    const who = isPlayer ? 'player' : 'ai';

    const selectedSum = selectedCenterItems.reduce((s, item) => s + getItemValue(item), 0);
    const target = handCard.value + selectedSum;

    const buildCards = [handCard];
    for (const item of selectedCenterItems) {
        buildCards.push(...(item.type === 'build' ? item.cards : [item]));
    }

    // Remove hand card
    if (isPlayer) {
        GameState.playerHand = GameState.playerHand.filter(c => c.id !== handCard.id);
    } else {
        GameState.aiHand = GameState.aiHand.filter(c => c.id !== handCard.id);
    }

    // Remove selected items from center
    GameState.centerCards = GameState.centerCards.filter(
        item => !selectedCenterItems.some(sel => sel === item)
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

function executeTrail(handCard, isPlayer) {
    if (isPlayer && hasActiveBuild('player')) {
        return { error: "You can't trail while you have an active build in the center!" };
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

    if (GameState.deck.length > 0) {
        dealNewHands();
        return 'newHands';
    }

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

// ── Scoring ───────────────────────────────────────────────────────────────────
function calculateRoundScores() {
    const p = GameState.playerCaptures;
    const a = GameState.aiCaptures;

    const pSpades = p.filter(c => c.suit === 'spades').length;
    const aSpades = a.filter(c => c.suit === 'spades').length;

    const scores = {
        player: {
            mostCards:    0,
            mostSpades:   0,
            littleCasino: 0,
            bigCasino:    0,
            aces:         0,
            sweeps:       GameState.playerSweeps,
            total:        0,
            cardCount:    p.length,
            spadeCount:   pSpades
        },
        ai: {
            mostCards:    0,
            mostSpades:   0,
            littleCasino: 0,
            bigCasino:    0,
            aces:         0,
            sweeps:       GameState.aiSweeps,
            total:        0,
            cardCount:    a.length,
            spadeCount:   aSpades
        }
    };

    // Most cards (3 pts, tie = no one scores)
    if (p.length > a.length)      scores.player.mostCards = 3;
    else if (a.length > p.length) scores.ai.mostCards    = 3;

    // Most spades (1 pt, tie = no one scores)
    if (pSpades > aSpades)        scores.player.mostSpades = 1;
    else if (aSpades > pSpades)   scores.ai.mostSpades    = 1;

    // 2♠ Little Casino (1 pt)
    if      (p.some(c => c.rank === '2' && c.suit === 'spades')) scores.player.littleCasino = 1;
    else if (a.some(c => c.rank === '2' && c.suit === 'spades')) scores.ai.littleCasino    = 1;

    // 10♦ Big Casino (2 pts)
    if      (p.some(c => c.rank === '10' && c.suit === 'diamonds')) scores.player.bigCasino = 2;
    else if (a.some(c => c.rank === '10' && c.suit === 'diamonds')) scores.ai.bigCasino    = 2;

    // Aces (1 pt each)
    scores.player.aces = p.filter(c => c.rank === 'A').length;
    scores.ai.aces     = a.filter(c => c.rank === 'A').length;

    // Totals
    scores.player.total =
        scores.player.mostCards + scores.player.mostSpades +
        scores.player.littleCasino + scores.player.bigCasino +
        scores.player.aces + scores.player.sweeps;

    scores.ai.total =
        scores.ai.mostCards + scores.ai.mostSpades +
        scores.ai.littleCasino + scores.ai.bigCasino +
        scores.ai.aces + scores.ai.sweeps;

    return scores;
}

function applyRoundScores(scores) {
    GameState.playerScore += scores.player.total;
    GameState.aiScore     += scores.ai.total;
    GameState.roundNumber++;
}

function checkGameOver() {
    return GameState.playerScore >= 11 || GameState.aiScore >= 11;
}

function nextTurn() {
    GameState.currentTurn = GameState.currentTurn === 'player' ? 'ai' : 'player';
}
