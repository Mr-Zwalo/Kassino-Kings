'use strict';

const MIN_BUILD_TARGET_VALUE = 5; // SA deck max = 10; builds below 5 are rarely strategic

// ── AI entry point ────────────────────────────────────────────────────────────
function getAIMove() {
    // 1. Capture (best scoring): includes opponent pile top card
    const capture = findBestAICapture();
    if (capture) return capture;

    // 2. Build or augment existing build
    const build = findBestAIBuild();
    if (build) return build;

    // 3. Drift (trail) — last resort
    // SA rule: can't drift with active build in first phase, but AI tries builds first.
    // If nothing else works, trail as a fallback.
    return findBestAITrail();
}

// ── Capture ───────────────────────────────────────────────────────────────────
function findBestAICapture() {
    let bestMove  = null;
    let bestScore = -1;

    for (const card of GameState.aiHand) {
        // isPlayer=false → include player's pile top in capture options
        const options = getValidCaptureOptions(card, false);
        for (const option of options) {
            const score = scoreCaptureMove(card, option);
            if (score > bestScore) {
                bestScore = score;
                bestMove  = { type: 'capture', handCard: card, centerItems: option };
            }
        }
    }
    return bestMove;
}

function scoreCaptureMove(handCard, centerItems) {
    let score = 0;

    // Clearing the table is best
    const centerOnlyCount = centerItems.filter(i => i.type !== 'pileTopCard').length;
    if (centerOnlyCount === GameState.centerCards.length && centerOnlyCount > 0) {
        score += 100;
    }

    // Count total cards captured
    let cardCount = 1; // played hand card
    for (const item of centerItems) {
        if (item.type === 'pileTopCard') {
            cardCount += 1;
        } else {
            cardCount += item.type === 'build' ? item.cards.length : 1;
        }
    }
    score += cardCount * 3;

    // Special card bonuses
    for (const item of centerItems) {
        const cards = item.type === 'pileTopCard' ? [item.card]
                    : item.type === 'build'       ? item.cards
                    : [item];
        for (const c of cards) {
            if (c.rank === '10' && c.suit === 'diamonds') score += 25; // Big Casino
            if (c.rank === '2'  && c.suit === 'spades')   score += 12; // Little Casino
            if (c.rank === 'A')                            score += 10;
            if (c.suit === 'spades')                       score +=  4;
        }
    }

    // Capturing our own build is particularly good
    if (centerItems.some(item => item.type === 'build' && item.owner === 'ai')) score += 15;

    return score;
}

// ── Build / Augment ───────────────────────────────────────────────────────────
function findBestAIBuild() {
    const hand             = GameState.aiHand;
    const center           = GameState.centerCards;
    const aiHasActiveBuild = hasActiveBuild('ai');

    // SA rule: can only use player's pile top card in a build if AI already has a build
    const playerTopItem = aiHasActiveBuild ? getOpponentTopPileItem(false) : null;

    for (const card of hand) {
        // Targets are values of other cards in hand (Ace = 1 only, no 14 in 40-card deck)
        const possibleTargets = new Set();
        for (const other of hand) {
            if (other === card) continue;
            possibleTargets.add(other.value);
        }

        // Usable center items: exclude opponent's builds (can't incorporate them)
        const usable = center.filter(
            item => !(item.type === 'build' && item.owner === 'player')
        );
        if (playerTopItem) usable.push(playerTopItem);

        for (const target of possibleTargets) {
            // SA 40-card deck: max card value is 10
            if (target < MIN_BUILD_TARGET_VALUE || target > 10) continue;
            const needed = target - card.value;
            if (needed <= 0) continue;

            const subsets = findSubsetsWithSum(usable, needed);
            for (const subset of subsets) {
                if (subset.length === 0) continue;

                // Verify pile-top restriction: only usable in builds when AI has active build
                if (subset.some(i => i.type === 'pileTopCard') && !aiHasActiveBuild) continue;

                const captureCard = hand.find(c => c !== card && c.value === target);
                if (captureCard) {
                    return { type: 'build', handCard: card, centerItems: subset, targetValue: target };
                }
            }
        }
    }
    return null;
}

// ── Drift (Trail) ─────────────────────────────────────────────────────────────
function findBestAITrail() {
    const hand = GameState.aiHand;
    if (hand.length === 0) return null;

    // Trail the least-valuable card
    const sorted = [...hand].sort((a, b) => trailPenalty(a) - trailPenalty(b));
    return { type: 'trail', handCard: sorted[0] };
}

function trailPenalty(card) {
    if (card.rank === 'A')                              return 100;
    if (card.rank === '10' && card.suit === 'diamonds') return  90;
    if (card.rank === '2'  && card.suit === 'spades')   return  80;
    if (card.suit === 'spades')                         return  20 + card.value;
    return card.value;
}
