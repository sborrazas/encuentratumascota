import React from "react";
import Router, { Route, IndexRoute } from "react-router";
import PublicationsList from "components/Pages/PublicationsList";
import PublicationDetail from "components/Pages/PublicationDetail";
import PublicationNew from "components/Pages/PublicationNew";

export default (
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

const routes = {
  "home": "/",
  "publications": "/p",
  "publicationsNew": "/p/new",
  "publication": "/p/:slug",
};

export { routes };
