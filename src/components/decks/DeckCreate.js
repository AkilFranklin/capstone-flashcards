import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DeckCreate({ createDeck }) {
  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleCreate = (event) => {
    event.preventDefault();
    createDeck(formData);
    setFormData({ ...initialFormState });
  };

  const history = useHistory();
  const handleCancel = (event) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <div>
      <h5 style={{ backgroundColor: "#f1f1f1" }}>
        <Link to="/">Home</Link> /{" "}
        Create Deck
      </h5>
      <form name="createDeck" onSubmit={handleCreate}>
        <fieldset>
          <legend>Create Deck</legend>
          <div>
            <label htmlFor="name">
              Name:
              <input
                name="name"
                type="text"
                id="name"
                required={true}
                onChange={handleChange}
                value={formData.name}
                placeholder="Deck Name"
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
                value={formData.description}
                placeholder="Brief description of the deck"
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

export default DeckCreate;
