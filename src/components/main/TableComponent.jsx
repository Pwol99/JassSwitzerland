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
const getCardImage = (index) => {
  const imageIndex = String(index).padStart(2, '0');
  return `https://www.jassportal.ch/qxathena/images/fra/${imageIndex}.png`;
};

const JassGame = () => {
  const [deck, setDeck] = useState(shuffleDeck(createDeck()));
  const [hands, setHands] = useState([[], [], [], []]);

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

  return (
    <div>
      <h1>Jass Game</h1>
      <button onClick={startGame}>Start Game</button>
      {hands.map((hand, playerIndex) => (
        <div key={playerIndex}>
          <h2>Player {playerIndex + 1} Hand</h2>
          <div style={{ display: 'flex' }}>
            {hand.map((card, index) => {
              const cardIndex = getCardIndex(card);
              return (
                <div key={index} style={{ margin: '10px' }}>
                  <img
                    src={getCardImage(cardIndex)}
                    alt={`${card.value} of ${card.suit}`}
                    style={{ width: '100px' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JassGame;
