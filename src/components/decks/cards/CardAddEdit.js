import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import { createCard, readCard, readDeck, updateCard } from "../../../utils/api";

function CardAddEdit() {
  // path: /decks/:deckId/cards/:cardId/edit
  const { path } = useRouteMatch();
  const { cardId, deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({});
  const [currentCard, setCurrentCard] = useState({});
  const addNewCard = !path.includes("edit");

  const initialFormState = {
    front: "",
    back: "",
    deckId,
  };

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setCurrentDeck(response);
    }

    loadDeck();
  }, [deckId]);

  useEffect(() => {
    async function loadCard() {
      if (addNewCard) {
        setCurrentCard({ ...initialFormState });
      } else {
        const response = await readCard(cardId);
        setCurrentCard(response);
      }
    }

    loadCard();
  }, [cardId, addNewCard]);

  const handleChange = ({ target }) => {
    setCurrentCard({
      ...currentCard,
      [target.name]: target.value,
    });
  };

  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (addNewCard) {
      createCard(deckId, currentCard);
      setCurrentCard({ ...initialFormState });
    } else {
      updateCard(currentCard);
      setCurrentCard({ ...currentCard });
      history.push(`/decks/${currentCard.deckId}`);
    }
  };

  return (
    <form name="addEditCard" onSubmit={handleSubmit}>
      <h3>{currentDeck.name}</h3>
      <fieldset>
        <legend>{addNewCard ? "Add Card" : "Edit Card"}</legend>
        <div>
          <label htmlFor="front">
            Front
            <textarea
              name="front"
              type="textarea"
              rows={4}
              id="front"
              required={true}
              onChange={handleChange}
              value={currentCard.front}
            ></textarea>
          </label>
        </div>
        <div>
          <label htmlFor="back">
            Back
            <textarea
              name="back"
              type="textarea"
              rows={4}
              id="back"
              required={true}
              onChange={handleChange}
              value={currentCard.back}
            ></textarea>
          </label>
        </div>
        <div>
          <button>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </fieldset>
    </form>
  );
}

export default CardAddEdit;
