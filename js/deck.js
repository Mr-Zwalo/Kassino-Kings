'use strict';

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function getRankValue(rank) {
    if (rank === 'A')  return 1;
    if (rank === 'J')  return 11;
    if (rank === 'Q')  return 12;
    if (rank === 'K')  return 13;
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

function isFaceCard(card) {
    return card.rank === 'J' || card.rank === 'Q' || card.rank === 'K';
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
