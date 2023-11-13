import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function CardView({ card, deleteCard }) {
  return (
    <tr>
      <tr>
        <td className="card-front">{card.front}</td>
        <td className="card-back">{card.back}</td>
      </tr>
      <tr>
      <NavLink to={`/decks/${card.deckId}/cards/${card.id}/edit`}>
            <button>Edit</button>
          </NavLink>
        <button className="card-delete-button" onClick={deleteCard}>Delete</button>
      </tr>
    </tr>
  );
}

export default CardView;
