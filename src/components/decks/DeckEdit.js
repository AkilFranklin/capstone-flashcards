import React, { useEffect, useState } from "react";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, updateDeck } from "../../utils/api";

function DeckEdit() {
  const { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setCurrentDeck(response);
    }

    loadDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setCurrentDeck({
      ...currentDeck,
      [target.name]: target.value,
    });
  };

  const history = useHistory();
  const handleEdit = (event) => {
    event.preventDefault();
    updateDeck(currentDeck);
    setCurrentDeck({ ...currentDeck });
    history.push(`/decks/${deckId}`);
    history.go(0);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <h5 style={{ backgroundColor: "#f1f1f1" }}>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link> /{" "}
        Edit Deck
      </h5>
      <form name="editDeck" onSubmit={handleEdit}>
        <fieldset>
          <legend>Edit Deck</legend>
          <div>
            <label htmlFor="name">
              Name:
              <input
                name="name"
                type="text"
                id="name"
                required={true}
                onChange={handleChange}
                value={currentDeck.name}
              ></input>
            </label>
          </div>
          <div>
            <label htmlFor="description">
              Description:
              <textarea
                name="description"
                type="textarea"
                rows={4}
                id="description"
                required={true}
                onChange={handleChange}
                value={currentDeck.description}
              ></textarea>
            </label>
          </div>
          <div>
            <button onClick={handleCancel}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default DeckEdit;
