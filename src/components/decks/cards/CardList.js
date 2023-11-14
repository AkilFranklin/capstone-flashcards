import React, { useEffect, useState } from "react";
import CardView from "./cardView";
import {
  Link,
  NavLink,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { deleteCard, readDeck } from "../../../utils/api";

function CardList() {
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({});
  const history = useHistory();

  const handleDelete = (card) => {
    const result = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    if (result) {
      deleteCard(card.id);
      history.go(0);
    }
  };

  useEffect(() => {
    async function loadCards() {
      const response = await readDeck(deckId);
      setCurrentDeck(response);
      setCards(response.cards);
    }

    loadCards();
  }, []);

  if (cards.length > 0) {
    return (
      <div className="card-list">
        <h5 style={{ backgroundColor: "#f1f1f1" }}>
        <Link to="/">Home</Link> /{" "}
        {currentDeck.name}
      </h5>
        <div>
          <h3>{currentDeck.name}</h3>
          <h5>{currentDeck.description}</h5>
          <NavLink to={`/decks/${deckId}/edit`}>
            <button>Edit</button>
          </NavLink>
          <NavLink to={`/decks/${deckId}/study`}>
            <button>Study</button>
          </NavLink>
          <NavLink to={`/decks/${currentDeck.id}/cards/new`}>
            <button>+ Add Cards</button>
          </NavLink>
          <button>Delete</button>
        </div>
        <h2>Cards</h2>
        <table>
          <tbody>
            {cards.map((card, index) => (
              <CardView
                card={card}
                key={index}
                index={index}
                deleteCard={() => handleDelete(card)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <p>Please select a deck</p>;
}

export default CardList;
