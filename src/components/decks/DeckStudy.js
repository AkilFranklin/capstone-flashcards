import React, { useEffect, useState } from "react";
import CardStudyView from "./cards/CardStudyView";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";

function DeckStudy() {
// function DeckStudy({ currentDeck }) {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [currentDeck, setCurrentDeck] = useState({});
  
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setCurrentDeck(await response);
      setCards(response.cards);
    }
    
    loadDeck();
  }, [deckId]);
  
  useEffect(() => {
    async function loadCurrentCard(cards) {
      setCurrentCard(cards[0]);
    }

    if (cards && cards.length > 2) {
      loadCurrentCard(cards);
    }
  }, [cards]);

  if (cards && cards.length > 2) {
    return (
      <div className="deck-study">
        {/* <h2>{`${currentDeck.name}: Study`}</h2> */}
        <h2>{`${currentDeck.name}`}</h2>
        {/* <div> */}
          <CardStudyView
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            cards={cards}
          />
        {/* </div> */}
      </div>
    );
  }

  return (
    <div>
      {/* <h2>{`${currentDeck.name}: Study`}</h2> */}
      <h2>{`${currentDeck.name}`}</h2>
      <h3>Not enough cards.</h3>
      <p>You need at least 3 cards to study. There are {currentDeck.length ? currentDeck.length : 0} in this deck.</p>
      <NavLink to={`/decks/${currentDeck.id}/cards/new`}>
            <button>+ Add Cards</button>
          </NavLink>
    </div>
  );
}

export default DeckStudy;
