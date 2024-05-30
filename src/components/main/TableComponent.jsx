import React, { useState } from 'react';

// Define the cards and their values
const suits = ['Acorns', 'Roses','Bells' , 'Shields'];
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

const JassGame = () => {
  const [deck, setDeck] = useState(shuffleDeck(createDeck()));
  const [hands, setHands] = useState([[], [], [], []]);
  const [deckType, setDeckType] = useState('French');
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [playedCards, setPlayedCards] = useState([]);
  const [playerPlayedCard, setPlayerPlayedCard] = useState(null);

  // Deal cards to four players
  const dealCards = () => {
    let newHands = [[], [], [], []];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 4; j++) {
        newHands[j].push(deck.pop());
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
    let newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
    dealCards();
  };

  // Toggle between French and Swiss decks
  const toggleDeckType = () => {
    setDeckType(deckType === 'French' ? 'Swiss' : 'French');
  };

 // Play a card from the player's hand
const playCard = (index) => {
  const card = hands[selectedPlayer][index];
  const updatedHands = [...hands];
  updatedHands[selectedPlayer].splice(index, 1);
  setHands(updatedHands);

  // Select a random card from each of the other players' hands
  const otherPlayers = hands.filter((_, i) => i !== selectedPlayer);
  const playedCardsTemp = [];
  otherPlayers.forEach((playerHand, playerIndex) => {
    let randomCard;
    if (playerIndex === 0) {
      // For the computer player
      const sameSuitCards = playerHand.filter(c => c.suit === card.suit);
      if (sameSuitCards.length > 0) {
        // If the computer has cards of the same suit, randomly select one
        const randomIndex = Math.floor(Math.random() * sameSuitCards.length);
        randomCard = sameSuitCards[randomIndex];
        playerHand.splice(playerHand.indexOf(randomCard), 1); // Remove card from player's hand
      } else {
        // If the computer doesn't have cards of the same suit, randomly select any card
        const randomIndex = Math.floor(Math.random() * playerHand.length);
        randomCard = playerHand[randomIndex];
        playerHand.splice(randomIndex, 1); // Remove card from player's hand
      }
    } else {
      // For human players, select a random card from their hand
      const sameSuitCards = playerHand.filter(c => c.suit === playedCardsTemp[0].suit);
      if (sameSuitCards.length > 0) {
        // If the player has cards of the same suit, randomly select one
        const randomIndex = Math.floor(Math.random() * sameSuitCards.length);
        randomCard = sameSuitCards[randomIndex];
        playerHand.splice(playerHand.indexOf(randomCard), 1); // Remove card from player's hand
      } else {
        // If the player doesn't have cards of the same suit, randomly select any card
        const randomIndex = Math.floor(Math.random() * playerHand.length);
        randomCard = playerHand[randomIndex];
        playerHand.splice(randomIndex, 1); // Remove card from player's hand
      }
    }
    playedCardsTemp.push({ ...randomCard, index: playerIndex }); // Assigning index for each played card
  });

  // Add player's played card to the played cards list
  setPlayedCards([...playedCardsTemp, { ...card, index: 3 }]);
};

  // Clear the played cards list
  const clearPlayedCards = () => {
    setPlayedCards([]);
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginTop: '20px', color: 'white' }}>
        <button onClick={startGame}>Start Game</button>
        <button onClick={toggleDeckType} style={{ marginLeft: '10px' }}>
          Switch to {deckType === 'French' ? 'Swiss' : 'French'} Deck
        </button>
        <label htmlFor="playerSelect" style={{ marginLeft: '10px' }}>Select Player:</label>
        <select id="playerSelect" value={selectedPlayer} onChange={(e) => setSelectedPlayer(parseInt(e.target.value))}>
          {hands.map((hand, index) => (
            <option key={index} value={index}>Player {index + 1}</option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', flex: '1' }}>
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
              transform: `rotate(${index === 0 ? '90deg' : index === 1 ? '0deg' : index === 2 ? '90deg' : '0deg'})  
                          translate(${card.index === 0 ? '0px, 50px' : card.index === 1 ? '0px, -50px' : card.index === 2 ? '0px, -50px' : '0px, 50px'})`, // Adjusted rotation and translation
              zIndex: index === 0 ? '3' : index === 1 ? '2' : index === 2 ? '1' : '0',
              cursor: 'pointer' // Cursor style for indicating clickability
            }}
            onClick={clearPlayedCards} // Add onClick handler to clear played cards when clicked
          />
        ))}
      </div>
      <div style={{ marginTop: '20px', marginBottom: '20px', color: 'white' }}> 
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