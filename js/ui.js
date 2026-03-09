'use strict';

// ── UI State ──────────────────────────────────────────────────────────────────
let selectedHandCard      = null;
let selectedCenterItems   = [];  // items selected from the center table
let includeOpponentPile   = false; // whether AI's pile top card is selected
let isAnimating           = false;

// ── Bootstrap ─────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initGame();
    renderGame();
    updateStatus('Welcome to Kassino Kings! Round 1 — select a card to play it or start building.');
});

function el(id) { return document.getElementById(id); }

function setupEventListeners() {
    el('btn-capture').addEventListener('click', handleCapture);
    el('btn-build').addEventListener('click', handleBuild);
    el('btn-drift').addEventListener('click', handleDrift);
    el('btn-play-card').addEventListener('click', handlePlayCard);
    el('btn-new-game').addEventListener('click', () => {
        if (confirm('Start a brand-new game? Current scores will be lost.')) {
            initGame();
            resetSelection();
            renderGame();
            updateStatus('New game! No cards on the table — you must play a card first.');
        }
    });
    el('btn-next-round').addEventListener('click', handleNextRound);
    el('btn-play-again').addEventListener('click', handlePlayAgain);
}

// ── Build the full selection array (center items + optional pile top card) ────
function buildFullSelection() {
    if (!includeOpponentPile) return selectedCenterItems;
    const pileItem = getOpponentTopPileItem(true); // player's perspective
    return pileItem ? [...selectedCenterItems, pileItem] : selectedCenterItems;
}

// ── Master render ─────────────────────────────────────────────────────────────
function renderGame() {
    renderAIHand();
    renderPlayerHand();
    renderCenter();
    renderCapturePiles();
    renderScorePanel();
    updateDeckInfo();
    updateButtonStates();
}

// ── Hands ─────────────────────────────────────────────────────────────────────
function renderAIHand() {
    const container = el('ai-hand');
    container.innerHTML = '';
    for (let i = 0; i < GameState.aiHand.length; i++) {
        const back = document.createElement('div');
        back.className = 'card-back';
        container.appendChild(back);
    }
    const countEl = el('ai-card-count');
    const n = GameState.aiHand.length;
    if (countEl) countEl.textContent = `${n} card${n !== 1 ? 's' : ''}`;
}

function renderPlayerHand() {
    const container = el('player-hand');
    container.innerHTML = '';
    for (const card of GameState.playerHand) {
        const cardEl = buildCardEl(card);
        if (selectedHandCard && selectedHandCard.id === card.id) {
            cardEl.classList.add('selected');
        }
        if (GameState.currentTurn === 'player' && !isAnimating) {
            cardEl.addEventListener('click', () => handleHandCardClick(card));
        }
        container.appendChild(cardEl);
    }
}

// ── Center table ──────────────────────────────────────────────────────────────
function renderCenter() {
    const container = el('center-cards');
    container.innerHTML = '';
    for (const item of GameState.centerCards) {
        let itemEl;
        if (item.type === 'build') {
            itemEl = buildBuildEl(item);
        } else if (item.type === 'drifted') {
            itemEl = buildDriftedEl(item);
        } else {
            itemEl = buildCardEl(item);
        }

        if (selectedCenterItems.some(s => s === item)) {
            itemEl.classList.add('center-selected');
        }
        if (GameState.currentTurn === 'player' && !isAnimating) {
            itemEl.addEventListener('click', () => handleCenterItemClick(item));
        }
        container.appendChild(itemEl);
    }
}

// ── Capture pile display ──────────────────────────────────────────────────────
function renderCapturePiles() {
    renderPlayerPile();
    renderAIPile();
}

function renderPlayerPile() {
    const topArea  = el('player-pile-top');
    const countEl  = el('player-pile-count');
    topArea.innerHTML = '';

    const n = GameState.playerCaptures.length;
    if (n > 0) {
        const topCard = GameState.playerCaptures[n - 1];
        const cardEl  = buildCardEl(topCard);
        cardEl.classList.add('pile-card');
        topArea.appendChild(cardEl);
    } else {
        topArea.appendChild(makePileEmptyEl());
    }
    if (countEl) countEl.textContent = `${n} card${n !== 1 ? 's' : ''}`;
}

function renderAIPile() {
    const topArea  = el('ai-pile-top');
    const countEl  = el('ai-pile-count');
    const hintEl   = el('ai-pile-hint');
    topArea.innerHTML = '';

    const n = GameState.aiCaptures.length;
    if (n > 0) {
        const topCard = GameState.aiCaptures[n - 1];
        const cardEl  = buildCardEl(topCard);
        cardEl.classList.add('pile-card');

        // Highlight if currently selected
        if (includeOpponentPile) {
            cardEl.classList.add('center-selected');
        }

        // Clickable when it's the player's turn and a hand card is selected
        if (GameState.currentTurn === 'player' && !isAnimating) {
            cardEl.classList.add('pile-card-clickable');
            cardEl.addEventListener('click', handleAIPileTopClick);
        }
        topArea.appendChild(cardEl);

        // Show hint when a hand card is selected
        if (hintEl) {
            if (selectedHandCard) {
                const pileTopValue = topCard.value;
                const otherSel = selectedCenterItems.filter(i => i.type !== 'pileTopCard');
                const canUse = otherSel.length === 0 ||
                    otherSel.every(i => getItemValue(i) === pileTopValue);
                hintEl.textContent = canUse ? '← click to include' : `← needs ${pileTopValue} on table`;
            } else {
                hintEl.textContent = '';
            }
        }
    } else {
        topArea.appendChild(makePileEmptyEl());
        if (hintEl) hintEl.textContent = '';
    }
    if (countEl) countEl.textContent = `${n} card${n !== 1 ? 's' : ''}`;
}

function makePileEmptyEl() {
    const div = document.createElement('div');
    div.className = 'pile-empty';
    div.textContent = '—';
    return div;
}

// ── Card element factory ──────────────────────────────────────────────────────
function buildCardEl(card) {
    const div = document.createElement('div');
    div.className = `card ${getSuitColor(card.suit)}`;
    div.dataset.cardId = card.id;

    const sym = getSuitSymbol(card.suit);
    div.innerHTML =
        `<div class="card-corner card-corner-tl"><span class="cr-rank">${card.rank}</span><span class="cr-suit">${sym}</span></div>` +
        `<div class="card-center-suit">${sym}</div>` +
        `<div class="card-corner card-corner-br"><span class="cr-rank">${card.rank}</span><span class="cr-suit">${sym}</span></div>`;
    return div;
}

// ── Build element factory ─────────────────────────────────────────────────────
function buildBuildEl(build) {
    const wrapper = document.createElement('div');
    wrapper.className = 'build-wrapper';
    wrapper.dataset.buildId = build.id;

    const ownerText = build.owner === 'player' ? 'Yours' : "AI's";
    const ownerClass = build.owner === 'player' ? 'owner-player' : 'owner-ai';

    // Stack up to 4 cards visually
    const stack = document.createElement('div');
    stack.className = 'build-stack';
    const shown = build.cards.slice(0, Math.min(build.cards.length, 4));
    shown.forEach((card, idx) => {
        const cardEl = buildCardEl(card);
        cardEl.style.left = `${idx * 18}px`;
        cardEl.style.position = 'absolute';
        cardEl.style.top = `${idx * -3}px`;
        cardEl.style.zIndex = idx;
        stack.appendChild(cardEl);
    });
    stack.style.width  = `${65 + (shown.length - 1) * 18}px`;
    stack.style.height = '90px';

    const label = document.createElement('div');
    label.className = 'build-target-label';
    label.textContent = `▲ ${build.targetValue}`;

    const ownerEl = document.createElement('div');
    ownerEl.className = `build-owner-label ${ownerClass}`;
    ownerEl.textContent = ownerText;

    wrapper.appendChild(label);
    wrapper.appendChild(stack);
    wrapper.appendChild(ownerEl);

    if (selectedCenterItems.some(s => s === build)) {
        wrapper.classList.add('center-selected');
    }
    return wrapper;
}

// ── Drifted pile element factory ──────────────────────────────────────────────
// A drifted pile is an open pile anyone can capture with the matching card value.
function buildDriftedEl(drifted) {
    const wrapper = document.createElement('div');
    wrapper.className = 'build-wrapper drifted-wrapper';
    wrapper.dataset.driftedId = drifted.id;

    const stack = document.createElement('div');
    stack.className = 'build-stack';
    const shown = drifted.cards.slice(0, Math.min(drifted.cards.length, 4));
    shown.forEach((card, idx) => {
        const cardEl = buildCardEl(card);
        cardEl.style.left = `${idx * 18}px`;
        cardEl.style.position = 'absolute';
        cardEl.style.top = `${idx * -3}px`;
        cardEl.style.zIndex = idx;
        stack.appendChild(cardEl);
    });
    stack.style.width  = `${65 + (shown.length - 1) * 18}px`;
    stack.style.height = '90px';

    const label = document.createElement('div');
    label.className = 'build-target-label drifted-label';
    label.textContent = `⟳ ${drifted.value}`;

    const noteEl = document.createElement('div');
    noteEl.className = 'build-owner-label';
    noteEl.textContent = 'Open pile';

    wrapper.appendChild(label);
    wrapper.appendChild(stack);
    wrapper.appendChild(noteEl);

    if (selectedCenterItems.some(s => s === drifted)) {
        wrapper.classList.add('center-selected');
    }
    return wrapper;
}

function renderScorePanel() {
    el('player-game-score').textContent = GameState.playerScore;
    el('ai-game-score').textContent     = GameState.aiScore;

    const pCapEl = el('player-round-info');
    const aCapEl = el('ai-round-info');
    if (pCapEl) pCapEl.textContent = `Captured: ${GameState.playerCaptures.length}`;
    if (aCapEl) aCapEl.textContent = `Captured: ${GameState.aiCaptures.length}`;
}

function updateDeckInfo() {
    // SA Casino deals all cards in two batches; deck count shown if visible
    const countEl = el('deck-count');
    if (countEl) countEl.textContent = GameState.deck.length;
    const backEl = document.querySelector('.deck-card-back');
    if (backEl) backEl.style.opacity = GameState.deck.length > 0 ? '1' : '0.15';
}

// ── Button states ─────────────────────────────────────────────────────────────
function updateButtonStates() {
    const isPlayerTurn = GameState.currentTurn === 'player' && !isAnimating;
    const hasHand      = selectedHandCard !== null;
    const fullSel      = buildFullSelection();
    const hasCenter    = fullSel.length > 0;

    const captureOk = hasHand && hasCenter &&
        isValidCapture(selectedHandCard, fullSel);

    const buildOk = hasHand && hasCenter &&
        isValidBuild(selectedHandCard, fullSel, GameState.playerHand);

    // Drift: play a matching card on your own build to convert it to an open pile
    const driftOk = hasHand && isValidDrift(selectedHandCard, true);

    // Play Card: place any card on the center table (blocked in round 1 with active build)
    const playCardOk = hasHand && (!hasActiveBuild('player') || GameState.roundNumber !== 1);

    el('btn-capture').disabled   = !(isPlayerTurn && captureOk);
    el('btn-build').disabled     = !(isPlayerTurn && buildOk);
    el('btn-drift').disabled     = !(isPlayerTurn && driftOk);
    el('btn-play-card').disabled = !(isPlayerTurn && playCardOk);
}

// ── Status / hint ─────────────────────────────────────────────────────────────
function updateStatus(msg) {
    const statusEl = el('status-message');
    if (statusEl) statusEl.textContent = msg;
}

function updateActionHint() {
    if (!selectedHandCard) {
        const hasBuild = hasActiveBuild('player');
        if (GameState.centerCards.length === 0 && GameState.aiCaptures.length === 0) {
            updateStatus('No cards on the table — select a card to play it to the center.');
        } else if (hasBuild && GameState.roundNumber === 1) {
            updateStatus('You have a build — select your build card to Drift it, or select center cards to Capture/Build.');
        } else {
            updateStatus('Select a card from your hand to play.');
        }
        return;
    }
    const opts = getValidCaptureOptions(selectedHandCard, true);
    const fullSel = buildFullSelection();
    const canDrift = isValidDrift(selectedHandCard, true);

    if (fullSel.length === 0) {
        if (canDrift) {
            updateStatus(`${cardToString(selectedHandCard)} matches your build — click Drift to leave it open, or select center cards.`);
        } else if (opts.length > 0) {
            updateStatus(`${cardToString(selectedHandCard)} selected — select center cards (or AI's pile top) to capture/build, or Play Card.`);
        } else {
            updateStatus(`${cardToString(selectedHandCard)} selected — no captures available. Select cards to build, or Play Card.`);
        }
    } else {
        const sum = fullSel.reduce((s, i) => s + getItemValue(i), 0);
        const captureValid = isValidCapture(selectedHandCard, fullSel);
        const buildValid   = isValidBuild(selectedHandCard, fullSel, GameState.playerHand);
        if (captureValid) {
            updateStatus(`Sum = ${sum} ✓  Click Capture (or add more cards to build).`);
        } else if (buildValid) {
            const target = selectedHandCard.value + sum;
            updateStatus(`Build to ${target} — you have a ${target} in hand to capture later. Click Build.`);
        } else {
            const target = selectedHandCard.value + sum;
            updateStatus(`Sum = ${target}. Not a valid capture or build — try different cards.`);
        }
    }
}

// ── Interaction handlers ──────────────────────────────────────────────────────
function handleHandCardClick(card) {
    if (GameState.currentTurn !== 'player' || isAnimating) return;

    if (selectedHandCard && selectedHandCard.id === card.id) {
        // Deselect
        selectedHandCard    = null;
        selectedCenterItems = [];
        includeOpponentPile = false;
    } else {
        selectedHandCard    = card;
        selectedCenterItems = [];
        includeOpponentPile = false;
    }

    renderGame();
    updateActionHint();
}

function handleCenterItemClick(item) {
    if (GameState.currentTurn !== 'player' || isAnimating) return;
    if (!selectedHandCard) {
        updateStatus('Select a card from your hand first!');
        return;
    }
    toggleCenterItem(item);
    renderGame();
    updateButtonStates();
    updateActionHint();
}

function handleAIPileTopClick() {
    if (GameState.currentTurn !== 'player' || isAnimating) return;
    if (!selectedHandCard) {
        updateStatus('Select a card from your hand first!');
        return;
    }
    // Toggle the AI's pile top card in/out of the selection
    includeOpponentPile = !includeOpponentPile;
    renderGame();
    updateButtonStates();
    updateActionHint();
}

function toggleCenterItem(item) {
    const idx = selectedCenterItems.indexOf(item);
    if (idx >= 0) selectedCenterItems.splice(idx, 1);
    else           selectedCenterItems.push(item);
}

// ── Action handlers ───────────────────────────────────────────────────────────
function handleCapture() {
    if (!selectedHandCard || isAnimating) return;
    const fullSel = buildFullSelection();
    if (!isValidCapture(selectedHandCard, fullSel)) {
        const sum = fullSel.reduce((s, i) => s + getItemValue(i), 0);
        updateStatus(`Invalid capture — selected cards sum to ${sum}, but you played a ${selectedHandCard.value}.`);
        return;
    }

    const hc    = selectedHandCard;
    const items = [...fullSel];
    resetSelection();

    const result = executeCapture(hc, items, true);

    if (result.isTableClear) {
        updateStatus(`Table cleared! You captured ${result.capturedCards.length} cards!`);
    } else {
        updateStatus(`You captured ${result.capturedCards.length} card${result.capturedCards.length !== 1 ? 's' : ''}!`);
    }

    afterPlayerMove();
}

function handleBuild() {
    if (!selectedHandCard || isAnimating) return;
    const fullSel = buildFullSelection();
    if (!isValidBuild(selectedHandCard, fullSel, GameState.playerHand)) {
        const sum    = fullSel.reduce((s, i) => s + getItemValue(i), 0);
        const target = selectedHandCard.value + sum;
        updateStatus(`Invalid build — you need a ${target} in your hand to build to ${target}.`);
        return;
    }

    const hc    = selectedHandCard;
    const items = [...fullSel];
    const sum   = items.reduce((s, i) => s + getItemValue(i), 0);
    const target = hc.value + sum;
    const isSteal = items.some(i => i.type === 'build' && i.owner !== 'player');
    resetSelection();

    executeBuild(hc, items, true);
    if (isSteal) {
        updateStatus(`You stole the AI's build! Now targeting ${target} — capture with a ${target}.`);
    } else {
        updateStatus(`Built to ${target}! Capture it on your next turn with a ${target}.`);
    }
    afterPlayerMove();
}

// Drift: intentionally not capturing your own build — play the capture card onto it,
// converting it to an open pile that anyone can capture.
function handleDrift() {
    if (!selectedHandCard || isAnimating) return;

    const hc = selectedHandCard;
    if (!isValidDrift(hc, true)) {
        updateStatus('Drift requires your build\'s capture card — select that card first.');
        return;
    }
    resetSelection();

    const result = executeDrift(hc, true);
    if (result.error) {
        selectedHandCard = hc; // restore
        updateStatus(result.error);
        renderGame();
        return;
    }
    updateStatus(`Drifted your build (value ${hc.value}) — it stays on the table as an open pile!`);
    afterPlayerMove();
}

// Play Card: place a card face-up on the center table (no capture).
function handlePlayCard() {
    if (!selectedHandCard || isAnimating) return;

    const hc = selectedHandCard;
    resetSelection();

    const result = executeTrail(hc, true);
    if (result.error) {
        selectedHandCard = hc; // restore
        updateStatus(result.error);
        renderGame();
        return;
    }
    updateStatus(`Played ${cardToString(hc)} to the center.`);
    afterPlayerMove();
}

// ── Post-move flow ────────────────────────────────────────────────────────────
function afterPlayerMove() {
    renderGame();

    const status = checkAfterTurn();

    if (status === 'roundOver') {
        setTimeout(endRoundUI, 900);
        return;
    }

    GameState.currentTurn = 'ai';
    renderGame();
    setTimeout(doAITurn, 1300);
}

function doAITurn() {
    if (GameState.currentTurn !== 'ai') return;
    updateStatus('AI is thinking…');

    setTimeout(() => {
        const move = getAIMove();

        if (!move && GameState.aiHand.length > 0) {
            // Safety fallback: force play first card (should rarely trigger)
            const trailCard = GameState.aiHand[0];
            executeTrail(trailCard, false);
            updateStatus(`AI played ${cardToString(trailCard)} to the center.`);
        } else if (move) {
            applyAIMove(move);
        }

        renderGame();

        const status = checkAfterTurn();
        if (status === 'roundOver') {
            setTimeout(endRoundUI, 900);
            return;
        }

        GameState.currentTurn = 'player';
        renderGame();
        updateStatus("Your turn! Select a card from your hand.");
    }, 700);
}

function applyAIMove(move) {
    if (move.type === 'capture') {
        const result = executeCapture(move.handCard, move.centerItems, false);
        if (result.isTableClear) {
            updateStatus(`AI cleared the table and captured ${result.capturedCards.length} cards!`);
        } else {
            const fromPile = move.centerItems.some(i => i.type === 'pileTopCard');
            const extra    = fromPile ? ' (including your pile top card!)' : '';
            updateStatus(`AI captured ${result.capturedCards.length} card${result.capturedCards.length !== 1 ? 's' : ''}${extra}.`);
        }
    } else if (move.type === 'build') {
        const result = executeBuild(move.handCard, move.centerItems, false);
        const isSteal = move.centerItems.some(i => i.type === 'build' && i.owner === 'player');
        if (isSteal) {
            updateStatus(`AI stole your build! Now targeting ${result.targetValue}.`);
        } else {
            updateStatus(`AI built to ${result.targetValue}.`);
        }
    } else if (move.type === 'drift') {
        const result = executeDrift(move.handCard, false);
        if (result.success) {
            updateStatus(`AI drifted its build (value ${move.handCard.value}) — now an open pile!`);
        }
    } else if (move.type === 'trail') {
        executeTrail(move.handCard, false);
        updateStatus(`AI played ${cardToString(move.handCard)} to the center.`);
    }
}

// ── Round / Game end ──────────────────────────────────────────────────────────
function endRoundUI() {
    const scores = calculateRoundScores();
    applyRoundScores(scores);
    renderGame();

    if (checkGameOver()) {
        showGameOverUI();
    } else {
        showRoundScoresUI(scores);
    }
}

function showRoundScoresUI(scores) {
    const overlay = el('score-overlay');
    el('overlay-title').textContent = `Round ${GameState.roundNumber - 1} Complete!`;

    el('score-breakdown').innerHTML =
        scoreTableHeader() +
        makeScoreRow(`Most cards (${scores.player.cardCount} vs ${scores.ai.cardCount}) — 2pts, tie=1`,
            scores.player.mostCards, scores.ai.mostCards) +
        makeScoreRow(`5+ Spades (${scores.player.spadeCount} vs ${scores.ai.spadeCount})`,
            scores.player.fiveSpades, scores.ai.fiveSpades) +
        makeScoreRow('2♠ Little Casino', scores.player.littleCasino, scores.ai.littleCasino) +
        makeScoreRow('10♦ Big Casino',   scores.player.bigCasino,    scores.ai.bigCasino) +
        makeScoreRow('Aces',             scores.player.aces,         scores.ai.aces) +
        makeTotalRow('Round Total',      scores.player.total,        scores.ai.total) +
        makeTotalRow('Game Score',       GameState.playerScore,      GameState.aiScore);

    overlay.classList.remove('hidden');
}

function showGameOverUI() {
    const winner = GameState.playerScore > GameState.aiScore ? 'You win! 🎉' :
                   GameState.aiScore > GameState.playerScore ? 'AI wins! 🤖' : "It's a tie!";

    el('gameover-title').textContent = winner;
    el('gameover-content').innerHTML =
        `<div class="final-scores">
            <div class="final-score-row">
                <span class="fscore-label">Your Score</span>
                <span class="fscore-val player">${GameState.playerScore}</span>
            </div>
            <div class="final-score-row">
                <span class="fscore-label">AI Score</span>
                <span class="fscore-val ai">${GameState.aiScore}</span>
            </div>
        </div>
        <p class="gameover-note">Game over after 2 rounds. Most points wins!</p>`;

    el('gameover-overlay').classList.remove('hidden');
}

function handleNextRound() {
    el('score-overlay').classList.add('hidden');
    startRound();
    resetSelection();
    renderGame();
    if (GameState.currentTurn === 'ai') {
        updateStatus('Round 2 — AI goes first (loser starts). No center cards — AI will play first.');
        setTimeout(doAITurn, 1300);
    } else {
        updateStatus('Round 2! No center cards — select a card to play it or start building.');
    }
}

function handlePlayAgain() {
    el('gameover-overlay').classList.add('hidden');
    initGame();
    resetSelection();
    renderGame();
    updateStatus('New game! Round 1 — select a card to play it or start building.');
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function resetSelection() {
    selectedHandCard    = null;
    selectedCenterItems = [];
    includeOpponentPile = false;
}

function flashSweep() {
    const area = el('center-area');
    if (!area) return;
    area.classList.add('sweep-flash');
    setTimeout(() => area.classList.remove('sweep-flash'), 900);
}

// ── Score table helpers ───────────────────────────────────────────────────────
function scoreTableHeader() {
    return `<div class="score-row score-header">
                <span class="sr-label">Category</span>
                <div class="sr-vals">
                    <span class="sr-p-head">You</span>
                    <span class="sr-a-head">AI</span>
                </div>
            </div>`;
}

function makeScoreRow(label, pVal, aVal) {
    const ph = pVal > 0 && pVal >= aVal ? 'highlight' : '';
    const ah = aVal > 0 && aVal >= pVal ? 'highlight' : '';
    return `<div class="score-row">
                <span class="sr-label">${label}</span>
                <div class="sr-vals">
                    <span class="sr-p ${ph}">${pVal}</span>
                    <span class="sr-a ${ah}">${aVal}</span>
                </div>
            </div>`;
}

function makeTotalRow(label, pVal, aVal) {
    return `<div class="score-row score-total">
                <span class="sr-label">${label}</span>
                <div class="sr-vals">
                    <span class="sr-p">${pVal}</span>
                    <span class="sr-a">${aVal}</span>
                </div>
            </div>`;
}
