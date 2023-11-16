import React, { useEffect, useState } from "react";
import CardStudyView from "./cards/CardStudyView";
import { Link, NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";

function DeckStudy() {
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
        <h5 style={{backgroundColor: "#f1f1f1"}}>
        <Link to="/">Home</Link> / <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Study
        </h5>
        <h2>Study: {currentDeck.name}</h2>
        <CardStudyView
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          cards={cards}
        />
      </div>
    );
  }

  return (
    <div>
      <h5 style={{backgroundColor: "#f1f1f1"}}>
        <Link to="/">Home</Link> / <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Study
        </h5>
      <h2>Study: ${currentDeck.name}</h2>
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are{" "}
        {currentDeck.length ? currentDeck.length : 0} in this deck.
      </p>
      <NavLink to={`/decks/${currentDeck.id}/cards/new`}>
        <button>+ Add Cards</button>
      </NavLink>
    </div>
  );
}

export default DeckStudy;
