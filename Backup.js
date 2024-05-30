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
  