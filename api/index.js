const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let gameState = {
  players: [],
  cards: [],
  currentTurn: null,
  trumpSuit: null,
  playedCards: [],
};

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  // Event: Join Game
  socket.on('joinGame', (playerName) => {
    const player = { id: socket.id, name: playerName };
    gameState.players.push(player);
    if (gameState.players.length === 4) {
      startGame();
    } else {
      io.emit('updateGame', gameState);
    }
  });

  // Event: Play Card
  socket.on('playCard', (cardIndex) => {
    const playerIndex = getPlayerIndex(socket.id);
    if (playerIndex === -1) return; // Player not found

    const card = gameState.hands[playerIndex][cardIndex];
    if (!card) return; // Invalid card index

    gameState.playedCards.push({ playerIndex, card });
    gameState.hands[playerIndex].splice(cardIndex, 1);

    // Check if all players have played their cards
    if (gameState.playedCards.length === 4) {
      endTurn();
    } else {
      io.emit('updateGame', gameState);
    }
  });

  // Event: Select Trump Suit
  socket.on('selectTrumpSuit', (suit) => {
    const playerIndex = getPlayerIndex(socket.id);
    if (playerIndex === -1 || gameState.currentTurn !== playerIndex) return; // Player not found or not their turn

    gameState.trumpSuit = suit;
    io.emit('updateGame', gameState);
  });

  // Event: Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
    gameState.players = gameState.players.filter(player => player.id !== socket.id);
    io.emit('updateGame', gameState);
  });
});

// Function: Start Game
const startGame = () => {
  gameState.deck = shuffleDeck(createDeck());
  dealCards();
  gameState.currentTurn = Math.floor(Math.random() * 4); // Randomly select starting player
  io.emit('updateGame', gameState);
};

// Function: Deal Cards
const dealCards = () => {
  gameState.hands = Array.from({ length: 4 }, () => []);
  for (let i = 0; i < 36; i++) {
    gameState.hands[i % 4].push(gameState.deck.pop());
  }
};

// Function: End Turn
const endTurn = () => {
  // Determine winner of the turn, update game state accordingly
  // Implement game logic here

  // Reset played cards
  gameState.playedCards = [];

  // Advance to next turn
  gameState.currentTurn = (gameState.currentTurn + 1) % 4;

  io.emit('updateGame', gameState);
};

// Function: Get Player Index by Socket ID
const getPlayerIndex = (socketId) => {
  return gameState.players.findIndex(player => player.id === socketId);
};

// Function: Create Deck
const createDeck = () => {
  let deck = [];
  const suits = ['Diamond', 'Heart', 'Spade', 'Klubs'];
  const values = ['6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

// Function: Shuffle Deck
const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
