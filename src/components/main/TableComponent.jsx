import React, { useState } from 'react';
import teppich from "./jass_teppich.png"; // Import the image

// Define the cards and their values
const suits = ['Diamond','Heart','Spade','Klubs'];
const values = ['6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

const createDeck = () => {
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

// Map each card to an index for the image
const getCardIndex = (card) => {
  const suitIndex = suits.indexOf(card.suit);
  const valueIndex = values.indexOf(card.value);
  return suitIndex * values.length + valueIndex;
};

// Function to get the image path for a card
const getCardImage = (index, deckType) => {
  const imageIndex = String(index).padStart(2, '0');
  const baseUrl = deckType === 'French' 
    ? 'https://www.jassportal.ch/qxathena/images/fra/' 
    : 'https://www.jassportal.ch/qxathena/images/ger/';
  return `${baseUrl}${imageIndex}.png`;
};

const JassGame = (props) => {
  const [deckType, setDeckType] = useState('French');
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [playedCards, setPlayedCards] = useState([]);
  const [hands, setHands] = useState(Array.from({ length: 4 }, () => [])); // Initialize hands with empty arrays
  const [trumpSuit, setTrumpSuit] = useState(null);

  useEffect(() => {
    socket.emit('joinGame', props.playerName);
  }, [props.playerName]);
  // Deal cards to four players
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

    setHands(newHands);
  };

  // Start the game by shuffling and dealing cards
  const startGame = () => {
    setDeckType('French');
    dealCards();
  };

  // Toggle between French and Swiss decks
  const toggleDeckType = () => {
    setDeckType(prevDeckType => prevDeckType === 'French' ? 'Swiss' : 'French');
  };

  const handleTrumpSuitSelect = (e) => {
    if (hands[selectedPlayer].length === 9) {
      setTrumpSuit(e.target.value);
    }
  };

  // Play a card from the player's hand
  const playCard = (index) => {
    const card = hands[selectedPlayer][index]; // Get the card that the player clicked on
    const updatedHands = [...hands]; // Create a copy of the current hands
    const PlayedSuit = card.suit;

    // Remove the played card from the player's hand
    updatedHands[selectedPlayer].splice(index, 1);

    // Update the hands state with the modified hand
    setHands(updatedHands);

    // Add the played card to the played cards list with index 0
    const newPlayedCards = [{ ...card, index: 0 }];
    setPlayedCards(newPlayedCards);

    // Iterate over the other players' hands
    updatedHands.forEach((playerHand, playerIndex) => {
      if (playerIndex !== selectedPlayer) {
        // Find cards of the same suit as the played card
        const sameSuitCards = playerHand.filter(c => c.suit === card.suit);

        let selectedCard;
        if (sameSuitCards.length > 0) {
          // If there are cards of the same suit, select a random one
          const randomIndex = Math.floor(Math.random() * sameSuitCards.length);
          selectedCard = sameSuitCards[randomIndex];
        } else {
          // If there are no cards of the same suit, select a random card
          const randomIndex = Math.floor(Math.random() * playerHand.length);
          selectedCard = playerHand[randomIndex];
        }

        // Remove the selected card from the player's hand
        playerHand.splice(playerHand.indexOf(selectedCard), 1);

        // Add the selected card to the played cards list with the corresponding player index
        newPlayedCards.push({ ...selectedCard, index: playerIndex });
      }
    });

    // Update the played cards state with all the played cards
    setPlayedCards(newPlayedCards);

    // Find the strongest card among the played cards
    // Find the strongest card among the played cards
const strongest = findStrongestCard(newPlayedCards, PlayedSuit, trumpSuit);
    console.log(strongest)
  };
// Function to find the strongest card among played cards not from the same suit as the first played card
const findStrongestCard = (playedCards, playedSuit, trumpSuit) => {
  if (!playedCards || playedCards.length === 0) {
    return null; // Return null if playedCards is undefined or empty
  }

  // Initialize strongest card and strength
  let strongestCard = null;
  let strongestStrength = 0;

  // Iterate through played cards
  playedCards.forEach(card => {
    // Check if the card belongs to the same suit as the first card or if it's a trump card
    if (card.suit === playedSuit || card.suit === trumpSuit) {
      const strength = calculateCardStrength(card, trumpSuit);
      if (strength > strongestStrength) {
        strongestCard = card;
        strongestStrength = strength;
      }
    }
  });

  return strongestCard;
};


  // Define strengths based on card values
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

  const calculateCardStrength = (card, trumpSuit) => {
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
  
    if (card.suit === trumpSuit) {
      return trumpStrength[card.value] || 0; // If the card is a trump card, return its trump strength
    } else {
      // If it's not a trump card, return its regular strength
      return cardStrengths[card.value] || 0;
    }
  };
  

  // Function to clear played cards
  const clearPlayedCards = () => {
    setPlayedCards([]);
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginTop:'20px', color: 'black' }}>
        <button onClick={startGame}>Start Game</button>
        <button onClick={toggleDeckType} style={{ marginLeft: '10px' }}>
          Switch to {deckType === 'French' ? 'Swiss' : 'French'} Deck
        </button>
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
        {playedCards.map((card, index) => (
          <img
            key={index}
            src={getCardImage(getCardIndex(card), deckType)}
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
            onClick={clearPlayedCards} // Add onClick handler to clear played cards when clicked
          />
        ))}
      </div>
      <div style={{ marginTop: '20px', marginBottom: '20px', color: 'black' }}> 
        <h2>Player {selectedPlayer + 1} Hand</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {hands[selectedPlayer].map((card, index) => {
            const cardIndex = getCardIndex(card);
            return (
              <div key={index} style={{ margin: '5px', cursor: 'pointer' }} onClick={() => playCard(index)}>
                <img
                  src={getCardImage(cardIndex, deckType)}
                  alt={`${card.value} of ${card.suit}`}
                  style={{ width: '80px' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JassGame;

