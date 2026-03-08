'use strict';

// South African Casino uses a 40-card pack: A, 2-10 in each suit (no J, Q, K)
const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

function getRankValue(rank) {
    if (rank === 'A') return 1;
    return parseInt(rank, 10);
}

function createCard(suit, rank) {
    return {
        suit,
        rank,
        value: getRankValue(rank),
        id: `${rank}_${suit}_${Math.random().toString(36).slice(2, 11)}`
    };
}

function createDeck() {
    const deck = [];
    for (const suit of SUITS) {
        for (const rank of RANKS) {
            deck.push(createCard(suit, rank));
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    const d = [...deck];
    for (let i = d.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [d[i], d[j]] = [d[j], d[i]];
    }
    return d;
}

// No face cards in the SA 40-card deck
function isFaceCard(card) {
    return false;
}

function isAce(card) {
    return card.rank === 'A';
}

function getSuitSymbol(suit) {
    return { hearts: '♥', diamonds: '♦', clubs: '♣', spades: '♠' }[suit] || suit;
}

function getSuitColor(suit) {
    return (suit === 'hearts' || suit === 'diamonds') ? 'red' : 'black';
}

function cardToString(card) {
    return `${card.rank}${getSuitSymbol(card.suit)}`;
}
