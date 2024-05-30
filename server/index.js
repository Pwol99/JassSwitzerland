const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let gameState = {
  players: [],
  cards: [],
  currentTurn: null,
};

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  socket.on('joinGame', (playerName) => {
    const player = { id: socket.id, name: playerName };
    gameState.players.push(player);
    if (gameState.players.length === 4) {
      startGame();
    } else {
      io.emit('updateGame', gameState);
    }
  });

  socket.on('playCard', (card) => {
    // Handle card play logic
    io.emit('updateGame', gameState);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
    gameState.players = gameState.players.filter(player => player.id !== socket.id);
    io.emit('updateGame', gameState);
  });
});

const startGame = () => {
  // Initialize game logic
  gameState.currentTurn = gameState.players[0].id;
  io.emit('updateGame', gameState);
};

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
