import React, { useEffect, useState } from "react";
import { readCard, readDeck } from "../../utils/api";
import {
  useParams,
} from "react-router-dom/cjs/react-router-dom";
import CardStudyView from "./cards/CardStudyView";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function DeckStudy({ currentDeck }) {
  const [cards, setCards] = useState(currentDeck.cards);
  const [currentCard, setCurrentCard] = useState({});
  
  useEffect(() => {
    async function loadCurrentCard() {
      setCurrentCard(currentDeck.cards[0]);
    }

    if (currentDeck.cards && currentDeck.cards.length > 2) {
      loadCurrentCard();
    }
  }, [cards]);
  console.log(currentDeck.name)

  if (cards && cards.length > 2) {
    return (
      <div className="deck-study">
        <h2>{currentDeck.name}: Study</h2>
        <div>
          <CardStudyView
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            cards={cards}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>{currentDeck.name}: Study</h2>
      <h3>Not enough cards.</h3>
      <p>You need at least 3 cards to study. There are {currentDeck.length} in this deck.</p>
      <NavLink to={`/decks/${currentDeck.id}/cards/new`}>
            <button>+ Add Cards</button>
          </NavLink>
    </div>
  );
}

export default DeckStudy;
