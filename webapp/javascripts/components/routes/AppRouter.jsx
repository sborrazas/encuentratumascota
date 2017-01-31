import React from "react";
import Router, { Route, IndexRoute } from "react-router";
import PublicationsList from "components/Pages/PublicationsList";
import PublicationDetail from "components/Pages/PublicationDetail";
import PublicationNew from "components/Pages/PublicationNew";

    // <Route name="publication-new" path="/p/new" component={PublicationNew} />
    // <Route name="how-it-works" path="how_it_works" />

module.exports = (
  <Route path="/">
    <Route path="p">
      <Route path="new" component={PublicationNew} />
      <Route path=":publicationSlug">
        <IndexRoute component={PublicationDetail} />
      </Route>
    </Route>
    <IndexRoute component={PublicationsList} />
  </Route>
);
