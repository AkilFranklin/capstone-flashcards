import React from "react";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom.min";

function DeckView({ deck, deleteDeck }) {
  return (
    <>
      <div>
        <div className="deck-name">
          <h4>{deck.name}
          <span style={{float: "right"}}>{deck.cards ? deck.cards.length : 0} cards</span></h4>
        </div>
      </div>
      <div>
        <div className="deck-description">
          <p>{deck.description}</p>
        </div>
      </div>
      <div>
        <div>
          <button className="deck-study-button">
            <NavLink to={`/decks/${deck.id}/study`}>Study</NavLink>
          </button>
          <button className="deck-view-button">
            <Link to={`/decks/${deck.id}`}>View</Link>
          </button>
          <button className="deck-delete-button" onClick={deleteDeck}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeckView;
