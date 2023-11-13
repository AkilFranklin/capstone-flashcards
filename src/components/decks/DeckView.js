import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useParams,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";

function DeckView({ deck, setCurrentDeck, deleteDeck }) {
  const { path, url } = useRouteMatch();
  const { deckId } = useParams();
  console.log("deck: " + deck.name)

  // useEffect(() => {
  //   async function loadDeck() {
  //     const response = await readDeck(deckId);
  //     setCurrentDeck(response);
  //   }

  //   loadDeck();
  // }, [deckId]);
  
  return (
    <tr>
      <tr>
        <td className="deck-name">
          <h4>{deck.name}</h4>
        </td>
        <td className="card-count">
          {deck.cards ? deck.cards.length : 0} cards
        </td>
      </tr>
      <tr>
        <td className="deck-description">
          <p>{deck.description}</p>
        </td>
      </tr>
      <tr>
        <button
          className="deck-study-button"
          onClick={() => {
            setCurrentDeck(deck);
          }}
        >
          <NavLink to={`/decks/${deck.id}/study`}>Study</NavLink>
        </button>
        <button
          className="deck-view-button"
          onClick={() => {
            setCurrentDeck(deck);
          }}
        >
          <Link to={`/decks/${deck.id}`}>View</Link>
        </button>
        <button className="deck-delete-button" onClick={deleteDeck}>
          Delete
        </button>
      </tr>
    </tr>
  );
}

export default DeckView;
