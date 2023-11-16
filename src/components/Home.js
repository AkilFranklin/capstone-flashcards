import React, { useEffect, useState, Fragment } from "react";
import DeckCreate from "./decks/DeckCreate";
import DeckList from "./decks/DeckList";
import CardList from "./decks/cards/CardList";
import { createDeck, listDecks } from "../utils/api";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import DeckStudy from "./decks/DeckStudy";
import {
  NavLink,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom";
import NotFound from "../Layout/NotFound";
import DeckEdit from "./decks/DeckEdit";
import CardAddEdit from "./decks/cards/CardAddEdit";

function Home() {
  const [decks, setDecks] = useState([]);

  const createNewDeck = (newDeck) => createDeck(newDeck);

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDecks(response);
    }

    loadDecks();
  }, []);

  const deleteDeck = (indexToDelete) => {
    const result = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (result) {
      setDecks((currentDecks) =>
        currentDecks.filter((deck, index) => index !== indexToDelete)
      );
    }
  };

  return (
    <div>
      <button className="btn-create-deck">
        <NavLink to={"/decks/new"}>+ Create Deck</NavLink>
      </button>

      <Switch>
        <Route exact path="/decks/:deckId/study">
          <DeckStudy />
        </Route>

        <Route exact path="/decks/new">
          <DeckCreate createDeck={createNewDeck} />
        </Route>

        <Route exact path="/decks/:deckId/edit">
          <DeckEdit />
        </Route>

        <Route exact path="/decks/:deckId">
          <CardList />
        </Route>

        <Route exact path="/decks/:deckId/cards/:cardId/edit">
          <CardAddEdit />
        </Route>

        <Route exact path="/decks/:deckId/cards/new">
          <CardAddEdit />
        </Route>

        <Route exact path="/">
          <DeckList
            decks={decks}
            deleteDeck={deleteDeck}
          />
        </Route>

        <Route path="*">
            <NotFound />
          </Route>
      </Switch>
    </div>
  );
}

export default Home;
