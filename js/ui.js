'use strict';

// ── UI State ──────────────────────────────────────────────────────────────────
let selectedHandCard    = null;
let selectedCenterItems = [];
let isAnimating         = false;

// ── Bootstrap ─────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initGame();
    renderGame();
    updateStatus('Welcome to Kassino Kings! Select a card from your hand to play.');
});

function el(id) { return document.getElementById(id); }

function setupEventListeners() {
    el('btn-capture').addEventListener('click', handleCapture);
    el('btn-build').addEventListener('click', handleBuild);
    el('btn-trail').addEventListener('click', handleTrail);
    el('btn-new-game').addEventListener('click', () => {
        if (confirm('Start a brand-new game? Current scores will be lost.')) {
            initGame();
            resetSelection();
            renderGame();
            updateStatus('New game! Select a card from your hand to start.');
        }
    });
    el('btn-next-round').addEventListener('click', handleNextRound);
    el('btn-play-again').addEventListener('click', handlePlayAgain);
}

// ── Master render ─────────────────────────────────────────────────────────────
function renderGame() {
    renderAIHand();
    renderPlayerHand();
    renderCenter();
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
        const itemEl = item.type === 'build' ? buildBuildEl(item) : buildCardEl(item);

        if (selectedCenterItems.some(s => s === item)) {
            itemEl.classList.add('center-selected');
        }
        if (GameState.currentTurn === 'player' && !isAnimating) {
            itemEl.addEventListener('click', () => handleCenterItemClick(item));
        }
        container.appendChild(itemEl);
    }
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
    // Stack needs enough width
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

// ── Score panel ───────────────────────────────────────────────────────────────
function renderScorePanel() {
    el('player-game-score').textContent = GameState.playerScore;
    el('ai-game-score').textContent     = GameState.aiScore;

    const pCapEl = el('player-round-info');
    const aCapEl = el('ai-round-info');
    if (pCapEl) pCapEl.textContent = `Captured: ${GameState.playerCaptures.length}  Sweeps: ${GameState.playerSweeps}`;
    if (aCapEl) aCapEl.textContent = `Captured: ${GameState.aiCaptures.length}  Sweeps: ${GameState.aiSweeps}`;
}

function updateDeckInfo() {
    const n = GameState.deck.length;
    const countEl = el('deck-count');
    if (countEl) countEl.textContent = n;
    const backEl = document.querySelector('.deck-card-back');
    if (backEl) backEl.style.opacity = n > 0 ? '1' : '0.2';
}

// ── Button states ─────────────────────────────────────────────────────────────
function updateButtonStates() {
    const isPlayerTurn = GameState.currentTurn === 'player' && !isAnimating;
    const hasHand      = selectedHandCard !== null;
    const hasCenter    = selectedCenterItems.length > 0;

    const captureOk = hasHand && hasCenter &&
        isValidCapture(selectedHandCard, selectedCenterItems);

    const buildOk = hasHand && hasCenter &&
        isValidBuild(selectedHandCard, selectedCenterItems, GameState.playerHand);

    const trailOk = hasHand && !hasActiveBuild('player');

    el('btn-capture').disabled = !(isPlayerTurn && captureOk);
    el('btn-build').disabled   = !(isPlayerTurn && buildOk);
    el('btn-trail').disabled   = !(isPlayerTurn && trailOk);
}

// ── Status / hint ─────────────────────────────────────────────────────────────
function updateStatus(msg) {
    const statusEl = el('status-message');
    if (statusEl) statusEl.textContent = msg;
}

function updateActionHint() {
    if (!selectedHandCard) {
        updateStatus('Select a card from your hand to play.');
        return;
    }
    const opts = getValidCaptureOptions(selectedHandCard);
    if (isFaceCard(selectedHandCard)) {
        if (opts.length > 0) {
            updateStatus(`${cardToString(selectedHandCard)} selected — click Capture to take matching face cards, or Trail.`);
        } else {
            updateStatus(`${cardToString(selectedHandCard)} selected — no matching face cards to capture. Click Trail.`);
        }
        return;
    }
    if (selectedCenterItems.length === 0) {
        if (opts.length > 0) {
            updateStatus(`${cardToString(selectedHandCard)} selected — select center cards to capture/build, or Trail.`);
        } else {
            updateStatus(`${cardToString(selectedHandCard)} selected — no captures available. Select center cards to build, or Trail.`);
        }
    } else {
        const sum = selectedCenterItems.reduce((s, i) => s + getItemValue(i), 0);
        const captureValid = isValidCapture(selectedHandCard, selectedCenterItems);
        const buildValid   = isValidBuild(selectedHandCard, selectedCenterItems, GameState.playerHand);
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
    } else {
        selectedHandCard    = card;
        selectedCenterItems = [];

        // Auto-select matching face cards for face cards
        if (isFaceCard(card)) {
            selectedCenterItems = GameState.centerCards.filter(
                item => item.type !== 'build' && isFaceCard(item) && item.rank === card.rank
            );
        }
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

    if (isFaceCard(selectedHandCard)) {
        if (item.type !== 'build' && isFaceCard(item) && item.rank === selectedHandCard.rank) {
            toggleCenterItem(item);
        } else {
            updateStatus(`${selectedHandCard.rank}s can only capture other ${selectedHandCard.rank}s.`);
        }
    } else {
        if (item.type === 'build' && item.owner === 'player') {
            // Can select own build for adding to it (extending build)
            toggleCenterItem(item);
        } else if (item.type === 'build' && item.owner === 'ai') {
            // Allow capturing opponent's build if sum matches
            toggleCenterItem(item);
        } else {
            toggleCenterItem(item);
        }
    }

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
    if (!isValidCapture(selectedHandCard, selectedCenterItems)) {
        const sum = selectedCenterItems.reduce((s, i) => s + getItemValue(i), 0);
        updateStatus(`Invalid capture — selected cards sum to ${sum}, but you played a ${selectedHandCard.value}.`);
        return;
    }

    const hc    = selectedHandCard;
    const items = [...selectedCenterItems];
    resetSelection();

    const result = executeCapture(hc, items, true);

    if (result.isSweep) {
        updateStatus(`🌟 SWEEP! You cleared the table — +1 sweep point!`);
        flashSweep();
    } else {
        updateStatus(`You captured ${result.capturedCards.length} card${result.capturedCards.length !== 1 ? 's' : ''}!`);
    }

    afterPlayerMove();
}

function handleBuild() {
    if (!selectedHandCard || isAnimating) return;
    if (!isValidBuild(selectedHandCard, selectedCenterItems, GameState.playerHand)) {
        const sum    = selectedCenterItems.reduce((s, i) => s + getItemValue(i), 0);
        const target = selectedHandCard.value + sum;
        updateStatus(`Invalid build — you need a ${target} in your hand to build to ${target}.`);
        return;
    }

    const hc    = selectedHandCard;
    const items = [...selectedCenterItems];
    const sum   = items.reduce((s, i) => s + getItemValue(i), 0);
    const target = hc.value + sum;
    resetSelection();

    executeBuild(hc, items, true);
    updateStatus(`Built to ${target}! Capture it on your next turn with a ${target}.`);
    afterPlayerMove();
}

function handleTrail() {
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
    updateStatus(`Trailed ${cardToString(hc)} to the center.`);
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
    if (status === 'newHands') {
        renderGame();
        updateStatus('New cards dealt!');
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
            // Fallback: force trail first card
            executeTrail(GameState.aiHand[0], false);
            updateStatus(`AI trailed ${cardToString(GameState.aiHand[0])}.`);
        } else if (move) {
            applyAIMove(move);
        }

        renderGame();

        const status = checkAfterTurn();
        if (status === 'roundOver') {
            setTimeout(endRoundUI, 900);
            return;
        }
        if (status === 'newHands') {
            renderGame();
        }

        GameState.currentTurn = 'player';
        renderGame();
        updateStatus("Your turn! Select a card from your hand.");
    }, 700);
}

function applyAIMove(move) {
    if (move.type === 'capture') {
        const result = executeCapture(move.handCard, move.centerItems, false);
        if (result.isSweep) {
            updateStatus(`AI got a SWEEP — cleared the table!`);
            flashSweep();
        } else {
            updateStatus(`AI captured ${result.capturedCards.length} card${result.capturedCards.length !== 1 ? 's' : ''}.`);
        }
    } else if (move.type === 'build') {
        const result = executeBuild(move.handCard, move.centerItems, false);
        updateStatus(`AI built to ${result.targetValue}.`);
    } else if (move.type === 'trail') {
        executeTrail(move.handCard, false);
        updateStatus(`AI trailed ${cardToString(move.handCard)}.`);
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
        makeScoreRow(`Cards captured (${scores.player.cardCount} vs ${scores.ai.cardCount})`,
            scores.player.mostCards, scores.ai.mostCards) +
        makeScoreRow(`Most Spades (${scores.player.spadeCount} vs ${scores.ai.spadeCount})`,
            scores.player.mostSpades, scores.ai.mostSpades) +
        makeScoreRow('2♠ Little Casino', scores.player.littleCasino, scores.ai.littleCasino) +
        makeScoreRow('10♦ Big Casino',   scores.player.bigCasino,    scores.ai.bigCasino) +
        makeScoreRow('Aces',             scores.player.aces,         scores.ai.aces) +
        makeScoreRow('Sweeps',           scores.player.sweeps,       scores.ai.sweeps) +
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
        <p class="gameover-note">First to 11 points wins.</p>`;

    el('gameover-overlay').classList.remove('hidden');
}

function handleNextRound() {
    el('score-overlay').classList.add('hidden');
    startRound();
    resetSelection();
    renderGame();
    updateStatus('New round! Select a card from your hand.');
}

function handlePlayAgain() {
    el('gameover-overlay').classList.add('hidden');
    initGame();
    resetSelection();
    renderGame();
    updateStatus('New game! Select a card from your hand.');
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function resetSelection() {
    selectedHandCard    = null;
    selectedCenterItems = [];
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
