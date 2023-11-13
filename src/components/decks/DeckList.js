import React, { useEffect, useState } from "react";
import DeckView from "./DeckView";
import { Link, useRouteMatch } from "react-router-dom/cjs/react-router-dom";

function DeckList({ decks, setCurrentDeck, deleteDeck }) {
  const { path, url } = useRouteMatch();
  console.log("decklist decks :" + decks);

  if (decks) {
    return (
      <div className="decks">
        <tbody>
          {decks.map((deck, index) => (
            <div>
              <DeckView
                deck={deck}
                setCurrentDeck={setCurrentDeck}
                deleteDeck={() => deleteDeck(index)}
                key={index}
                index={index}
              />
            </div>
          ))}
        </tbody>
      </div>
    );
  }
}

export default DeckList;
