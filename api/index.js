const { Server } = require('socket.io');
const express = require('express');
const http = require('http');
const trumpStrength = {
  '6': 10,
  '7': 11,
  '8': 12,
  '10': 13,
  'Queen': 14,
  'King': 15,
  'Ace': 16,
  '9': 17,
  'Jack': 18
};
const cardStrengths = {
  '6': 1,
  '7': 2,
  '8': 3,
  '9': 4,
  '10': 5,
  'Jack': 6,
  'Queen': 7,
  'King': 8,
  'Ace': 9
};

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
  startingPlayer: null,
  trumpSuit: null,
  playedCards: [],
  playerIdCounter: 1, // Start from 1
};

const startGame = () => {
  // Shuffle the deck and deal cards
  gameState.deck = shuffleDeck(createDeck());
  dealCards();
  
  // Reset played cards
  gameState.playedCards = [];

  // Randomly select a player to choose the trump suit
  const playerIndex = Math.floor(Math.random() * gameState.players.length);
  const startingPlayer = gameState.players[playerIndex];

  // Set the current turn and starting player
  gameState.currentTurn = playerIndex;
  gameState.startingPlayer = playerIndex;

  // Emit a message to the selected player to choose the trump suit
  io.to(startingPlayer.socketId).emit('chooseTrumpSuit');

  // Emit the updated game state
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
  const player = { id: gameState.playerIdCounter++, name: playerName, socketId: socket.id, points:null};
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
  } 
  else {
    // It's not the player's turn, send an error message or handle it accordingly
    socket.emit('errorMessage', 'It is not your turn to play a card.');
    console.log("Wrong player");
    console.log(console.log("Non Updated playedCards:", gameState.playedCards));
  }
});

// Event: Select Trump Suit
socket.on('selectTrumpSuit', (suit) => {
  const playerIndex = getPlayerIndex(socket.id);
  if (playerIndex === -1 || gameState.currentTurn !== playerIndex) return; // Player not found or not their turn
  
  // Convert the selected trump suit to English
  const englishSuits = {
    'Karo': 'Diamond',
    'Herz': 'Heart',
    'Pik': 'Spade',
    'Kreuz': 'Klubs',
    'Eichel': 'Diamond',
    'Rose': 'Heart',
    'Schilte': 'Spade',
    'Schelle': 'Klubs'
  };
  const englishSuit = englishSuits[suit];

  if (englishSuit) {
    gameState.trumpSuit = englishSuit;
    io.emit('updateGame', gameState);
    console.log(englishSuit)
    console.log(gameState.trumpSuit)
  } else {
    console.error('Invalid trump suit:', suit);
  }
});


  // Event: Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
    gameState.players = gameState.players.filter(player => player.socketId !== socket.id);
    io.emit('updateGame', gameState);
  });
});

const compareCardStrength = (card1, card2, firstCardSuit, trumpSuit) => {
  // Check if both cards are of the trump suit
  const isTrumpCard1 = card1.suit === trumpSuit;
  const isTrumpCard2 = card2.suit === trumpSuit;

  // Compare cards based on their suits and values
  if (card1.suit === firstCardSuit && card2.suit === firstCardSuit) {
    // Both cards are of the same non-trump suit, compare using cardStrengths
    const strength1 = cardStrengths[card1.value];
    const strength2 = cardStrengths[card2.value];
    return strength1 - strength2;
  } else if (isTrumpCard1 && isTrumpCard2) {
    // Both cards are of the trump suit, compare using trumpStrength
    const trumpStrength1 = trumpStrength[card1.value];
    const trumpStrength2 = trumpStrength[card2.value];
    return trumpStrength1 - trumpStrength2;
  } else if (isTrumpCard1) {
    return 1; // card1 is a trump card, so it's stronger
  } else if (isTrumpCard2) {
    return -1; // card2 is a trump card, so it's stronger
  } else {
    return 0; // Neither card is of the trump suit, no comparison
  }
};

const cardPoints = {
  '6': 0,
  '7': 0,
  '8': 0,
  '9': 0,
  '10': 10,
  'Jack': 2,
  'Queen': 3,
  'King': 4,
  'Ace': 11
};

const calculatePoints = (hand) => {
  let points = 0;
  hand.forEach((card) => {
    // Check if the card value exists in the cardPoints object
    if (card.value in cardPoints) {
      // Add the points of the card to the total points
      points += cardPoints[card.value];
    }
  });
  console.log(points)
  return points;
};

const endTurn = () => {
  // Check if there are any played cards
  if (gameState.playedCards.length === 0) {
    console.log("No cards have been played yet.");
    return; // Exit the function early if no cards have been played
  }

  // Determine the suit of the first played card
  const firstCardSuit = gameState.playedCards[0].card.suit;

  // Determine the winning card and the player who played it
  let winningCard = gameState.playedCards[0].card;
  let winningPlayerIndex = gameState.playedCards[0].playerIndex;

  for (let i = 1; i < gameState.playedCards.length; i++) {
    const card = gameState.playedCards[i].card;
    const playerIndex = gameState.playedCards[i].playerIndex;
    // Compare cards only if they have the same suit as the first played card
    if (card.suit === firstCardSuit && compareCardStrength(card, winningCard, firstCardSuit, gameState.trumpSuit) > 0) {
      winningCard = card;
      winningPlayerIndex = playerIndex;
    }
  }

  // Set the starting player to the winning player
  gameState.startingPlayer = winningPlayerIndex;

  // Set the current turn to the starting player
  gameState.currentTurn = winningPlayerIndex;

  // Calculate points from the played cards
  const points = calculatePoints(gameState.playedCards.map((playedCard) => playedCard.card));

  // Add points to the winning player
  gameState.players[winningPlayerIndex].points += points;

  // Emit the played cards to update the game state
  io.emit('playedCards', gameState.playedCards);

  // Set a timeout to clear the played cards after 3 seconds
  setTimeout(() => {
    // Reset played cards
    gameState.playedCards = [];

    // Update the game state with the points and the next turn
    io.emit('updateGame', gameState);
    console.log("Next turn starting with player index:", gameState.currentTurn);
    console.log(winningCard)
    console.log(gameState.players.points)
  }, 3000);
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
