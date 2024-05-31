import React, { useState, useEffect } from 'react';
import teppich from "./jass_teppich.png"; // Import the image
import io from 'socket.io-client';

// Connect to the backend WebSocket server
const socket = io('http://localhost:3001');

const joinGame = (playerName) => {
  socket.emit('joinGame', playerName); // Pass playerName instead of playooor
};

// Define the cards and their values
const suits = ['Diamond', 'Heart', 'Spade', 'Klubs'];
const values = ['6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

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
      // Update other relevant state properties as needed
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

  const handleTrumpSuitSelect = (e) => {
    if (hands[playerIndex] && hands[playerIndex].length === 9) {
      setTrumpSuit(e.target.value);
    }
  };

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


  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginTop: '20px', color: 'black' }}>
        <label htmlFor="trumpSuit" style={{ marginLeft: '10px' }}>Select Trump Suit:</label>
        <select id="trumpSuit" onChange={handleTrumpSuitSelect} style={{ marginLeft: '10px' }}>
          <option value="">None</option>
          {suits.map((suit, index) => (
            <option key={index} value={suit}>{suit}</option>
          ))}
        </select>
      </div>
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
        {playedCards?.filter(card => card !== undefined)?.map((card, index) => (
          <img
            key={index}
            src={getCardImage(getCardIndex(card), props.jasskarten_typ)}
            alt={`${card.value} of ${card.suit}`}
            style={{
              width: '80px',
              position: 'absolute',
              top: 'calc(50% - 40px)',
              left: 'calc(50% - 40px)',
              transform: `rotate(${index === 0 ? '0deg' : index === 1 ? '90deg' : index === 2 ? '0deg' : '90deg'})
                          translate(${card.index === 0 ? '0px, 50px' : card.index === 1 ? '0px, -50px' : card.index === 2 ? '0px, -50px' : '0px, 50px'})`, // Adjusted rotation and translation
              zIndex: index === 0 ? '0' : index === 1 ? '1' : index === 2 ? '2' : '3',
              cursor: 'pointer' // Cursor style for indicating clickability
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
    </div>
  );
};

export default JassGame;
