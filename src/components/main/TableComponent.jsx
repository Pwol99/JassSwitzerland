import React, { useState, useEffect } from 'react';
import teppich from "./jass_teppich.png"; // Import the image
import io from 'socket.io-client';
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, FormControl, InputLabel, Select, MenuItem, Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Avatar } from "@mui/material";
import "../../Styles.css";

// Connect to the backend WebSocket server
const socket = io('http://localhost:3001');

const joinGame = (playerName) => {
  socket.emit('joinGame', playerName); // Pass playerName instead of playooor
};

// Define the cards and their values
const suits = ['Diamond', 'Heart', 'Spade', 'Klubs'];
const values = ['6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
const trumpSuitLabels = {
  fra: ['Karo','Herz', 'Pik','Kreuz'],
  ger: ['Eichel', 'Rose', 'Schilte', 'Schelle']
};

// Map each card to an index for the image
const getCardIndex = (card) => {
  const suitIndex = suits.indexOf(card.suit);
  const valueIndex = values.indexOf(card.value);
  return suitIndex * values.length + valueIndex;
};

// Function to get the image path for a card
const getCardImage = (index, decktype) => {
  const imageIndex = String(index).padStart(2, '0');
  const baseUrl = decktype === 'fra'
    ? 'https://www.jassportal.ch/qxathena/images/fra/'
    : 'https://www.jassportal.ch/qxathena/images/ger/';
  return `${baseUrl}${imageIndex}.png`;
};

const JassGame = (props) => {
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [playedCards, setPlayedCards] = useState([]);
  const [hands, setHands] = useState(Array.from({ length: 4 }, () => [])); // Initialize hands with empty arrays
  const [trumpSuit, setTrumpSuit] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [playerIndex, setPlayerIndex] = useState(null);
  const [trumpSuitOptions, setTrumpSuitOptions] = useState(['Diamond', 'Heart', 'Spade', 'Klubs']);
  const [openTrumpModal, setOpenTrumpModal] = useState(false);
  const [Player1, setPlayer1] = useState(null)
  const [Player2, setPlayer2] = useState(null)
  const [Player3, setPlayer3] = useState(null)
  const [Player4, setPlayer4] = useState(null)
  const [PlayerP1, setPlayerP1] = useState(null)
  const [PlayerP2, setPlayerP2] = useState(null)
  const [PlayerP3, setPlayerP3] = useState(null)
  const [PlayerP4, setPlayerP4] = useState(null)

  
  useEffect(() => {
    console.log("run joinGame");
    joinGame(props.playername);
  }, [props.playername]);

  useEffect(() => {
    // Listen for 'updateGame' event from the server
    socket.on('updateGame', (updatedGameState) => {
      // Update the component state with the new game state received from the server
      setHands(updatedGameState.hands || []);
      setPlayedCards(updatedGameState.playedCards || []);
      setTrumpSuit(updatedGameState.trumpSuit || null);
      setCurrentTurn(updatedGameState.currentTurn || 0);
      
      
    });
    

    socket.on('playerIndex', (index) => {
      setPlayerIndex(index);
      console.log(index) // Set the player index received from the server
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      socket.off('updateGame');
      socket.off('playerIndex');
    };
  }, []);

// Function to play a card
const playCard = (index) => {
  if (hands[playerIndex]) {
    const card = hands[playerIndex][index]; // Get the card that the player clicked on

    // Emit a playCard event to the server
    socket.emit('playCard', { playerIndex: playerIndex, card });

    // Update the local state if needed
    const updatedHands = [...hands]; // Create a copy of the current hands
    updatedHands[selectedPlayer].splice(index, 1);
    setHands(updatedHands);
    const newPlayedCards = [{ ...card, index: playerIndex }];
    setPlayedCards([...playedCards, newPlayedCards]); // Update the played cards state
  }
};

useEffect(() => {
  // Listen for 'playedCards' event from the server
  socket.on('playedCards', (cards) => {
    setPlayedCards(cards);
  });

  
  // Clean up the event listener when the component unmounts
  return () => {
    socket.off('playedCards');
  };
}, []);

 useEffect(() => {
  // Listen for the 'chooseTrumpSuit' event from the server
  socket.on('chooseTrumpSuit', () => {
    // Open the modal for choosing trump suit
    setOpenTrumpModal(true);
  });

  // Clean up the event listener when the component unmounts
  return () => {
    socket.off('chooseTrumpSuit');
  };
}, []);

const handleCloseTrumpModal = () => {
  // Close the modal for choosing trump suit
  setOpenTrumpModal(false);
};

const handleTrumpSuitSelect = (e) => {
  const chosenSuit = e.target.value;
  if (chosenSuit) {
    // Emit the chosen trump suit to the server
    socket.emit('selectTrumpSuit', chosenSuit);
    setOpenTrumpModal(false); // Close the modal after selection
  }
};

const playername = props.playername || "";
const [open, setOpen] = useState(false);
const navigate = useNavigate();
const [avatarColor, setAvatarColor] = useState('');

useEffect(() => {
  const colors = ['#1976D2', '#388E3C', '#FBC02D', '#D32F2F', '#7B1FA2', '#FF5722'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  setAvatarColor(randomColor);
}, []);

const handleGameEnd = () => {
  navigate("/");
};

const handleScoreboard = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const handleNewGame = () => {
  navigate("../form");
};

const renderAvatar = () => {
  if (playername) {
    const initials = playername.charAt(0).toUpperCase();
    return (
      <Avatar sx={{ bgcolor: avatarColor, marginRight: '10px' }}>{initials}</Avatar>
    );
  }
  return null;
};

const buttonStyle = {
  marginBottom: '10px',
  backgroundColor: '#E7F6FF',
  color: '#000',
  height: '36px',
  textTransform: 'none'
};

const scoreboardData = [
  { name: Player1, Player3, points: PlayerP1, PlayerP3 },
  { name: Player3, Player4, points: PlayerP2, PlayerP4 },
];

const sortedPlayers = scoreboardData.sort((a, b) => b.points - a.points);



return (
  <div style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      flex: '1',
      width: '100%',
      height: '100%',
      background: `url(${teppich}) center center no-repeat`, // Use the imported image
      backgroundSize: 'cover'
    }}>
      <>

<div style={{ position: 'absolute', top: '100px', right: '50px'}}>
    <Button variant="contained" color="primary" onClick={handleNewGame} style={buttonStyle}>
      Neues Spiel
    </Button>
    <Button variant="contained" onClick={handleScoreboard} style={buttonStyle}>Scoreboard</Button>
  </div>
  <div style={{ position: 'absolute', top: '0', left: '0', margin: '10px', transform: 'translateX(-100%)' }}>
    {renderAvatar()}
  </div>

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
>
  <Box sx={{ width: 400, bgcolor: 'background.paper', p: 3, borderRadius: '8px' }}>
    <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
      Scoreboard
    </Typography>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Player</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPlayers.map((player, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell align="right">{player.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
      <Button variant="contained" color="primary" onClick={handleNewGame} style={buttonStyle}>
        Neues Spiel
      </Button>
      <Button variant="contained" color="secondary" onClick={handleGameEnd} style={buttonStyle}>
        Beenden
      </Button>
    </Box>
  </Box>
</Modal>
</>
      {playedCards?.filter(card => card !== undefined)?.map((playedCard, index) => (
        <img
          key={index}
          src={playedCard && playedCard.card ? getCardImage(getCardIndex(playedCard.card), props.jasskarten_typ) : ''}
          alt={playedCard && playedCard.card ? `${playedCard.card.value} of ${playedCard.card.suit}` : ''}
          style={{
            width: '80px',
            position: 'absolute',
            top: 'calc(50% - 40px)',
            left: 'calc(50% - 40px)',
            transform: `rotate(${index === 0 ? '0deg' : index === 1 ? '90deg' : index === 2 ? '0deg' : '90deg'})
                        translate(${index === 0 ? '0px, 50px' : index === 1 ? '0px, -50px' : index === 2 ? '0px, -50px' : '0px, 50px'})`,
            zIndex: index === 0 ? '0' : index === 1 ? '1' : index === 2 ? '2' : '3',
            cursor: 'pointer'
          }}
        />
      ))}
    </div>

    <div style={{ marginTop: '20px', marginBottom: '20px', color: 'black' }}>
      <div>player index: {playerIndex}</div>
      <h2>{props.playername}</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {hands[playerIndex] && hands[playerIndex].length > 0 ? (
          hands[playerIndex].map((card, index) => {
            const cardIndex = getCardIndex(card);
            return (
              <div key={index} style={{ margin: '5px', cursor: 'pointer' }} onClick={() => playCard(index)}>
                <img
                  src={getCardImage(cardIndex, props.jasskarten_typ)}
                  alt={`${card.value} of ${card.suit}`}
                  style={{ width: '80px' }}
                />
              </div>
            );
          })
        ) : (
          <p>No cards to display</p>
        )}
      </div>
    </div>

    {/* Trump Suit Selection Modal */}
    {openTrumpModal && (
  <div className="modal" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
      <h2>Choose Trump Suit</h2>
      <select onChange={handleTrumpSuitSelect} defaultValue="" style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '20px' }}>
        <option value="" disabled hidden>Trumpf wählen</option>
        {trumpSuitLabels[props.jasskarten_typ].map((suit, index) => (
          <option key={index} value={suit}>{suit}</option>
        ))}
      </select>
      <button onClick={handleCloseTrumpModal}>Cancel</button>
    </div>
  </div>
)}
  </div>
);
};

export default JassGame;
