import React, { useEffect, useState, Fragment } from "react";
import DeckCreate from "./decks/CreateDeck";
import DeckList from "./decks/DeckList";
import CardList from "./decks/cards/CardList";
import { deleteDeck, listDecks } from "../utils/api";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import DeckStudy from "./decks/DeckStudy";
import {
  Link,
  NavLink,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NotFound from "../Layout/NotFound";
import DeckEdit from "./decks/DeckEdit";
import CardAdd from "./decks/cards/CardAdd";
import CardEdit from "./decks/cards/CardEdit";

function Home() {
  const [decks, setDecks] = useState([]);
  const [currentDeck, setCurrentDeck] = useState();
  const { path, url } = useRouteMatch();

  const createDeck = (newDeck) =>
    setDecks((currentDecks) => [newDeck, ...currentDecks]);

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
          {/* <DeckStudy currentDeck={currentDeck}/> */}
        </Route>

        <Route exact path="/decks/new">
          <DeckCreate createDeck={createDeck} />
        </Route>

        <Route exact path="/decks/:deckId/edit">
          <DeckEdit />
        </Route>

        <Route exact path="/decks/:deckId">
          <CardList />
        </Route>

        <Route exact path="/decks/:deckId/cards/:cardId/edit">
          <CardEdit />
        </Route>

        <Route exact path="/decks/:deckId/cards/new">
          <CardAdd />
        </Route>

        <Route exact path="/">
          <DeckList
            decks={decks}
            setCurrentDeck={setCurrentDeck}
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
