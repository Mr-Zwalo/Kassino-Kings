'use strict';

const MIN_BUILD_TARGET_VALUE = 5; // SA deck max = 10; builds below 5 are rarely strategic

// ── Pile-top build rule ───────────────────────────────────────────────────────
// Pile top in 'usable' is only added when globally activated (isPileTopActivatedFor),
// so any subset produced by findSubsetsWithSum that contains the pile top is valid.
// Sweep pile top (pile top value == build target) is handled separately after subset search.
function isPileTopValidInSubset(subset) {
    return true; // activation is checked before adding to usable
}

// ── AI entry point ────────────────────────────────────────────────────────────
function getAIMove() {
    const aiHasActiveBuild = hasActiveBuild('ai');

    // 1. Capture (best scoring): includes opponent pile top card
    const capture = findBestAICapture();
    if (capture) return capture;

    // 2. Drift own build when in round 1 and can't capture
    //    (round 1 forbids "play card" with an active build)
    if (aiHasActiveBuild && GameState.roundNumber === 1) {
        const drift = findBestAIDrift();
        if (drift) return drift;
        // AI is stuck in round 1 with a build it can't capture or drift;
        // this shouldn't normally happen, but fall through to build/trail as a safety valve.
    }

    // 3. Build or augment existing build / steal opponent's build
    const build = findBestAIBuild();
    if (build) return build;

    // 4. Drift own build (round 2: optional strategic drift)
    if (aiHasActiveBuild) {
        const drift = findBestAIDrift();
        if (drift) return drift;
    }

    // 5. Play card (trail) — last resort
    // (blocked by executeTrail's own guard if AI has build in round 1, but AI
    //  shouldn't reach here in round 1 with a build since drift is tried first)
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
        } else if (item.type === 'build' || item.type === 'drifted') {
            cardCount += item.cards.length;
        } else {
            cardCount += 1;
        }
    }
    score += cardCount * 3;

    // Special card bonuses
    for (const item of centerItems) {
        const cards = item.type === 'pileTopCard' ? [item.card]
                    : (item.type === 'build' || item.type === 'drifted') ? item.cards
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

// ── Build / Augment / Steal / Hijack ─────────────────────────────────────────
function findBestAIBuild() {
    const hand             = GameState.aiHand;
    const center           = GameState.centerCards;
    const aiHasActiveBuild = hasActiveBuild('ai');

    // Player's pile top: only added to 'usable' when globally activated.
    // Sweep pile top (value == build target) is handled separately below.
    const playerTopItem   = getOpponentTopPileItem(false);
    const pileTopActive   = playerTopItem && isPileTopActivatedFor(playerTopItem.card.value);

    // ── Try to HIJACK the player's build (AI already owns a build) ────────────
    // Hijack condition: handCard + playerBuild.targetValue == myBuild.targetValue
    if (aiHasActiveBuild) {
        const myBuild     = center.find(item => item.type === 'build' && item.owner === 'ai');
        const playerBuild = center.find(item => item.type === 'build' && item.owner === 'player' && !item.stolen);
        if (myBuild && playerBuild) {
            for (const card of hand) {
                if (card.value + playerBuild.targetValue !== myBuild.targetValue) continue;
                // Must still hold a capture card (not the card being played)
                if (!hand.some(c => c !== card && c.value === myBuild.targetValue)) continue;
                return {
                    type:        'build',
                    handCard:    card,
                    centerItems: [playerBuild, myBuild],
                    targetValue: myBuild.targetValue
                };
            }
        }
    }

    // ── Try to steal the player's build (AI does NOT own a build) ────────────
    if (!aiHasActiveBuild) {
        const playerBuild = center.find(item => item.type === 'build' && item.owner === 'player' && !item.stolen);
        if (playerBuild) {
            for (const card of hand) {
                for (const other of hand) {
                    if (other === card) continue;
                    const newTarget = card.value + playerBuild.targetValue;
                    if (newTarget < MIN_BUILD_TARGET_VALUE || newTarget > 10) continue;
                    if (other.value === newTarget) {
                        return { type: 'build', handCard: card, centerItems: [playerBuild], targetValue: newTarget };
                    }
                }
            }
        }
    }

    // ── Standard build / extend ───────────────────────────────────────────────
    for (const card of hand) {
        // Targets are values of other cards in hand
        const possibleTargets = new Set();
        for (const other of hand) {
            if (other === card) continue;
            possibleTargets.add(other.value);
        }

        // Usable contributing center items:
        // - exclude opponent's builds (can only steal/hijack, not incorporate)
        // - exclude drifted piles
        // - include player's pile top only when globally activated
        let usable = center.filter(
            item => !(item.type === 'build' && item.owner === 'player') &&
                    item.type !== 'drifted'
        );
        if (pileTopActive) usable = [...usable, playerTopItem];

        // If AI already has a build, it must be included in the selection
        const myBuild = aiHasActiveBuild
            ? center.find(item => item.type === 'build' && item.owner === 'ai')
            : null;

        for (const target of possibleTargets) {
            if (target < MIN_BUILD_TARGET_VALUE || target > 10) continue;
            const needed = target - card.value;
            if (needed <= 0) continue;

            // When extending existing build, it must contribute to the needed sum
            if (myBuild) {
                if (myBuild.targetValue > needed) continue;
                const remaining = needed - myBuild.targetValue;
                const otherUsable = usable.filter(i => i !== myBuild);
                const subsets = remaining === 0
                    ? [[myBuild]]
                    : findSubsetsWithSum(otherUsable, remaining).map(s => [myBuild, ...s]);
                for (const subset of subsets) {
                    if (subset.length === 0) continue;
                    if (!isPileTopValidInSubset(subset)) continue;
                    const captureCard = hand.find(c => c !== card && c.value === target);
                    if (captureCard) {
                        // Optionally sweep pile top into the build if it matches target
                        const centerItems = _maybeAddSweep(subset, playerTopItem, pileTopActive, target);
                        return { type: 'build', handCard: card, centerItems, targetValue: target };
                    }
                }
            } else {
                const subsets = findSubsetsWithSum(usable, needed);
                for (const subset of subsets) {
                    if (subset.length === 0) continue;
                    if (!isPileTopValidInSubset(subset)) continue;
                    const captureCard = hand.find(c => c !== card && c.value === target);
                    if (captureCard) {
                        const centerItems = _maybeAddSweep(subset, playerTopItem, pileTopActive, target);
                        return { type: 'build', handCard: card, centerItems, targetValue: target };
                    }
                }
            }
        }
    }
    return null;
}

// If the player's pile top is not already in the subset but its value == target,
// add it as a sweep (free bonus — doesn't change the build target).
function _maybeAddSweep(subset, playerTopItem, pileTopActive, target) {
    if (!playerTopItem) return subset;
    if (subset.some(i => i.type === 'pileTopCard')) return subset; // already in subset
    // Only sweep when NOT already contributing (activated) to avoid double-counting
    if (pileTopActive && playerTopItem.card.value !== target) return subset;
    if (playerTopItem.card.value === target) return [...subset, playerTopItem];
    return subset;
}

// ── Drift own build ───────────────────────────────────────────────────────────
function findBestAIDrift() {
    const myBuild = GameState.centerCards.find(item => item.type === 'build' && item.owner === 'ai');
    if (!myBuild) return null;
    const card = GameState.aiHand.find(c => c.value === myBuild.targetValue);
    if (!card) return null;
    return { type: 'drift', handCard: card };
}

// ── Play Card (Trail) ─────────────────────────────────────────────────────────
function findBestAITrail() {
    const hand = GameState.aiHand;
    if (hand.length === 0) return null;

    // Trail the least-valuable card
    const sorted = [...hand].sort((a, b) => trailPenalty(a) - trailPenalty(b));
    return { type: 'trail', handCard: sorted[0] };
}

function trailPenalty(card) {
    // In round 1, strongly avoid trailing the build's capture card
    if (GameState.roundNumber === 1) {
        const myBuild = GameState.centerCards.find(item => item.type === 'build' && item.owner === 'ai');
        if (myBuild && card.value === myBuild.targetValue) return 999;
    }
    if (card.rank === 'A')                              return 100;
    if (card.rank === '10' && card.suit === 'diamonds') return  90;
    if (card.rank === '2'  && card.suit === 'spades')   return  80;
    if (card.suit === 'spades')                         return  20 + card.value;
    return card.value;
}
