import React from "react";
import DeckView from "./deckView";

function DeckList({ decks, deleteDeck }) {
  if (decks) {
    return (
      <div className="decks">
        {decks.map((deck, index) => (
          <DeckView
            deck={deck}
            deleteDeck={() => deleteDeck(index)}
            key={index}
            index={index}
          />
        ))}
      </div>
    );
  }
}

export default DeckList;
