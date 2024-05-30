import React, { useState } from 'react';

// Define the cards and their values
const suits = ['Acorns', 'Bells', 'Roses', 'Shields'];
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

  // Deal cards to four players
  const dealCards = () => {
    let newHands = [[], [], [], []];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 4; j++) {
        newHands[j].push(deck.pop());
      }
    }
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

  return (
    <div>
      <h1>Jass Game</h1>
      <button onClick={startGame}>Start Game</button>
      <button onClick={toggleDeckType}>
        Switch to {deckType === 'French' ? 'Swiss' : 'French'} Deck
      </button>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ position: 'relative' }}>
          {/* Central Table */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <h2>Table</h2>
            {/* Display Cards on the Table */}
            {deck.map((card, index) => (
              <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
                <img
                  src={getCardImage(getCardIndex(card), deckType)}
                  alt={`${card.value} of ${card.suit}`}
                  style={{ width: '60px' }}
                />
              </div>
            ))}
          </div>
          {/* Player Hands */}
          {hands.map((hand, playerIndex) => (
            <div
              key={playerIndex}
              style={{
                position: 'absolute',
                left: playerIndex % 2 === 0 ? '5%' : 'auto',
                right: playerIndex % 2 === 1 ? '5%' : 'auto',
                top: playerIndex < 2 ? '5%' : 'auto',
                bottom: playerIndex >= 2 ? '5%' : 'auto',
                transform: playerIndex % 2 === 0 ? 'translateY(-50%)' : 'translateY(50%)',
              }}
            >
              <h2>Player {playerIndex + 1} Hand</h2>
              {/* Display Player's Hand */}
              {hand.map((card, index) => (
                <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
                  <img
                    src={getCardImage(getCardIndex(card), deckType)}
                    alt={`${card.value} of ${card.suit}`}
                    style={{ width: '60px' }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JassGame;
