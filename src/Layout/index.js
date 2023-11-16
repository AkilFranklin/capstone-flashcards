import React, { Fragment, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route } from "react-router-dom/cjs/react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import Home from "../components/Home";

function Layout() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <div className="container">
          <Route >
            <Home />
          </Route>
          
        </div>
      </Switch>
    </Fragment>
  );
}

export default Layout;
