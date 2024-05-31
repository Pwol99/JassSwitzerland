const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const suits = ['Diamond', 'Heart', 'Spade', 'Klubs'];
const values = ['6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!'); // Example response
});

let gameState = {
  players: [],
  hands: [], // To store the hands dealt to each player
  currentTurn: null,
  trumpSuit: null,
  playedCards: [],
  playerIdCounter: 1, // Start from 1
};

// Function: Start Game
const startGame = () => {
  gameState.deck = shuffleDeck(createDeck());
  dealCards();
  gameState.playedCards = [];
  gameState.currentTurn = Math.floor(Math.random() * 4); // Randomly select starting player
  io.emit('updateGame', gameState);
};

// Function: Deal Cards
const dealCards = () => {
  let newDeck = shuffleDeck(createDeck());
  let newHands = Array.from({ length: 4 }, () => []);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 4; j++) {
      newHands[j].push(newDeck.pop());
    }
  }

  // Sort each player's hand
  newHands.forEach(hand => {
    hand.sort((a, b) => {
      // First, sort by suit
      const suitComparison = suits.indexOf(a.suit) - suits.indexOf(b.suit);
      if (suitComparison !== 0) return suitComparison;
      // If suits are the same, sort by value
      return values.indexOf(a.value) - values.indexOf(b.value);
    });
  });

  gameState.hands = newHands;

  // Emit hands to each player individually
  gameState.players.forEach((player, index) => {
    io.to(player.socketId).emit('updateHand', gameState.hands[index]);
  });

  // Emit the rest of the game state
  io.emit('updateGame', {
    currentTurn: gameState.currentTurn,
    trumpSuit: gameState.trumpSuit,
    playedCards: gameState.playedCards,
  });
};

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

// Event: Join Game
socket.on('joinGame', (playerName) => {
  console.log(playerName + " joined the game ");
  const player = { id: gameState.playerIdCounter++, name: playerName, socketId: socket.id };
  gameState.players.push(player);
  console.log(gameState.players.length);

  // Assign a unique player index to the player
  const playerIndex = gameState.players.length - 1;
  socket.emit('playerIndex', playerIndex); // Emit the player index back to the player

  if (gameState.players.length === 4) {
    startGame();
    console.log("game Started");
  } else {
    io.emit('updateGame', gameState);
  }
});


  // Event: Play Card
socket.on('playCard', ({ playerIndex, card }) => {
  console.log("Card received from player " + playerIndex + ": " + card.suit + " " + card.value);
  // Check if it's the player's turn to play
  if (playerIndex === gameState.currentTurn) {
    // Update the game state with the played card
    gameState.playedCards.push({ playerIndex, card });
    gameState.hands[playerIndex] = gameState.hands[playerIndex].filter(
      (c) => !(c.suit === card.suit && c.value === card.value)
    );

    console.log("Updated playedCards:", gameState.playedCards);
    // Emit the updated played cards list to all players
    io.emit('playedCards', gameState.playedCards);

    // Check if all players have played their cards
    if (gameState.playedCards.length === 4) {
      endTurn();
    } else {
      // Advance to the next turn
      gameState.currentTurn = (gameState.currentTurn + 1) % 4;
      io.emit('updateGame', gameState);
    }
  } else {
    // It's not the player's turn, send an error message or handle it accordingly
    socket.emit('errorMessage', 'It is not your turn to play a card.');
    console.log("Wrong player");
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
    gameState.players = gameState.players.filter(player => player.socketId !== socket.id);
    io.emit('updateGame', gameState);
  });
});

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
  return gameState.players.findIndex(player => player.socketId === socketId);
};

// Function: Create Deck
const createDeck = () => {
  let deck = [];
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
