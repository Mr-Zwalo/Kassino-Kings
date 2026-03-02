'use strict';

const MIN_BUILD_TARGET_VALUE = 5; // builds to values below this are rarely worth the effort

// ── AI entry point ────────────────────────────────────────────────────────────
function getAIMove() {
    // 1. Capture (best scoring)
    const capture = findBestAICapture();
    if (capture) return capture;

    // 2. Build (only if no active build already)
    if (!hasActiveBuild('ai')) {
        const build = findBestAIBuild();
        if (build) return build;
    }

    // 3. Trail (least valuable card)
    return findBestAITrail();
}

// ── Capture ───────────────────────────────────────────────────────────────────
function findBestAICapture() {
    let bestMove  = null;
    let bestScore = -1;

    for (const card of GameState.aiHand) {
        const options = getValidCaptureOptions(card);
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

    // Sweep is best
    if (GameState.centerCards.length === centerItems.length) score += 100;

    // Count total cards captured (including those inside builds)
    let cardCount = 1; // +1 for the played hand card
    for (const item of centerItems) {
        cardCount += item.type === 'build' ? item.cards.length : 1;
    }
    score += cardCount * 3;

    // Special card bonuses
    for (const item of centerItems) {
        const cards = item.type === 'build' ? item.cards : [item];
        for (const c of cards) {
            if (c.rank === '10' && c.suit === 'diamonds') score += 25; // Big Casino
            if (c.rank === '2'  && c.suit === 'spades')   score += 12; // Little Casino
            if (c.rank === 'A')                            score += 10;
            if (c.suit === 'spades')                       score +=  4;
        }
    }

    // Capturing our own build scores extra (we planned for this)
    if (centerItems.some(item => item.type === 'build' && item.owner === 'ai')) score += 15;

    return score;
}

// ── Build ─────────────────────────────────────────────────────────────────────
function findBestAIBuild() {
    const hand   = GameState.aiHand;
    const center = GameState.centerCards;

    for (const card of hand) {
        if (isFaceCard(card)) continue;

        // Collect all target values the AI could build to (from other hand cards)
        const possibleTargets = new Set();
        for (const other of hand) {
            if (other === card) continue;
            if (other.rank === 'A') { possibleTargets.add(1); possibleTargets.add(14); }
            else possibleTargets.add(other.value);
        }

        // Center items the AI may use (not opponent builds)
        const usable = center.filter(
            item => !(item.type === 'build' && item.owner === 'player')
        );

        for (const target of possibleTargets) {
            const needed = target - card.value;
            if (needed <= 0 || needed > 13) continue;

            const subsets = findSubsetsWithSum(usable, needed);
            for (const subset of subsets) {
                if (subset.length === 0) continue;

                // Confirm the capture card still exists in hand
                const captureCard = hand.find(c => {
                    if (c === card) return false;
                    if (c.rank === 'A') return target === 1 || target === 14;
                    return c.value === target;
                });

                if (captureCard) {
                    // Only build if target value is high enough to be worthwhile
                    if (target >= MIN_BUILD_TARGET_VALUE) {
                        return { type: 'build', handCard: card, centerItems: subset, targetValue: target };
                    }
                }
            }
        }
    }
    return null;
}

// ── Trail ─────────────────────────────────────────────────────────────────────
function findBestAITrail() {
    const hand = GameState.aiHand;
    if (hand.length === 0) return null;

    // If AI has active build it must not trail (but if somehow stuck, trail anyway)
    // Sort by trail penalty ascending – lowest penalty trailed first
    const sorted = [...hand].sort((a, b) => trailPenalty(a) - trailPenalty(b));
    return { type: 'trail', handCard: sorted[0] };
}

function trailPenalty(card) {
    if (card.rank === 'A')                            return 100;
    if (card.rank === '10' && card.suit === 'diamonds') return  90;
    if (card.rank === '2'  && card.suit === 'spades')   return  80;
    if (card.suit === 'spades')                         return  20 + card.value;
    return card.value;
}
