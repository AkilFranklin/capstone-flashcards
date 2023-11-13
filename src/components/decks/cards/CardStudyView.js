import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CardStudyView({ currentCard, setCurrentCard, cards }) {
  const [showFront, setShowFront] = useState(true);
  const [displayedSide, setDisplayedSide] = useState("");
  const [wasFlipped, setWasFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const history = useHistory();

  const handleFlipClick = () => {
    setWasFlipped(true);
    if (showFront) {
      setDisplayedSide(currentCard.back);
      setShowFront(false);
    } else {
      setDisplayedSide(currentCard.front);
      setShowFront(true);
    }
  };

  const handleNextClick = () => {
    if (cardIndex === cards.length - 1) {
      const result = window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the home page."
      );
      if (result) {
        setCardIndex(0);
        setCurrentCard(cards[0]);
      } else {
        history.push("/");
      }
    } else {
      setCurrentCard(cards[cardIndex + 1]);
      setCardIndex(cardIndex + 1);
    }
  };

  
  if (currentCard && wasFlipped) {
    return (
      <div>
        <h3>
          Card {cardIndex + 1} of {cards.length}
        </h3>
        <p>{displayedSide}</p>
        <button onClick={() => handleFlipClick()}>Flip</button>
        <button onClick={() => handleNextClick()}>Next</button>
      </div>
    );
  }

  return (
    <div>
      <h3>
        Card {cardIndex + 1} of {cards.length}
      </h3>
      <p>{showFront ? currentCard.front : currentCard.back}</p>
      <button onClick={() => handleFlipClick()}>Flip</button>
    </div>
  );
}

export default CardStudyView;
