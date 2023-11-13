import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { createCard, readDeck, updateDeck } from "../../../utils/api";

function CardAdd() {
  const { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({});


  const initialFormState = {
    front: "",
    back: ""
  }

  const [formData, setFormData] = useState({...initialFormState});

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setCurrentDeck(response);
    }

    loadDeck();
  }, [deckId]);

  // useEffect(() => {
  //   async function 
  // })

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    })
  }

  const history = useHistory();
  const handleEdit = (event) => {
    event.preventDefault();
    createCard(deckId, formData);
    setFormData({...initialFormState})
    // updateDeck(currentDeck);
    // setCurrentDeck({ ...currentDeck });
    // history.push(`/decks/${deckId}`)
  };

  const handleDone = (deckId) => {
    history.push(`/decks/${deckId}`)
  }

  return (
    <form name="addCard" onSubmit={handleEdit}>
      <fieldset>
        <legend>{currentDeck.name}</legend>
        <h3>Add Card</h3>
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
              value={formData.front}
              placeholder="Front side of card"
            ></textarea>
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Back
            <textarea
              name="back"
              type="textarea"
              rows={4}
              id="description"
              required={true}
              onChange={handleChange}
              value={formData.back}
              placeholder="Back side of card"
            ></textarea>
          </label>
        </div>
        <div>
          <button onClick={() => handleDone(deckId)}>Done</button>
          <button type="submit">Save</button>
        </div>
      </fieldset>
    </form>
  );
}

export default CardAdd;
