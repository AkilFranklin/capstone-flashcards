import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readCard, readDeck, updateCard, updateDeck } from "../../../utils/api";

function CardEdit() {
  const { cardId } = useParams();
  // const [currentDeck, setCurrentDeck] = useState({});
  const [currentCard, setCurrentCard] = useState({});

  useEffect(() => {
    async function loadCard() {
      const response = await readCard(cardId);
      setCurrentCard(response);
    }

    loadCard();
  }, [cardId]);

  const handleChange = ({ target }) => {
    setCurrentCard({
      ...currentCard,
      [target.name]: target.value,
    });
  };

  const history = useHistory();
  const handleEdit = (event) => {
    event.preventDefault();
    updateCard(currentCard);
    setCurrentCard({ ...currentCard });
    history.push(`/decks/${currentCard.deckId}`)
  };

  return (
    <form name="editDeck" onSubmit={handleEdit}>
      <fieldset>
        <legend>Edit Card</legend>
        <div>
          <label htmlFor="front">
            Front
            <textarea
              name="front"
              type="textarea"
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

export default CardEdit;
