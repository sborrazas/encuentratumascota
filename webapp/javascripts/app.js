import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { createStore, applyMiddleware, combineReducers } from "redux";
import App from "components/App.jsx";
import { reducer as routingReducer } from "utils/react-router-extras.js";
import { reducer as authReducer } from "resources/auth.js";
import { reducer as publicationsReducer } from "resources/publications.js";
import { reducer as breedsReducer } from "resources/breeds.js";
import { reducer as publicationReducer } from "resources/publication.js";
import console from "utils/console.js";

const reducersList = [
  authReducer,
  breedsReducer,
  publicationsReducer,
  publicationReducer,
];

const apiReducer = (initState = {}, action) => {
  return _.reduce(reducersList, (state, reducer) => {
    return reducer(state, action);
  }, initState);
};

const reducers = combineReducers({
  routing: routingReducer,
  api: apiReducer,
});
const store = createStore(
  reducers,
  {}
);

export default () => {
  const appEl = document.getElementById("app");

  if (appEl) {
    ReactDOM.render(
      React.createElement(App, {
        store: store,
        translations: global._TRANSLATIONS,
      }),
      document.getElementById("app")
    );
  }
  else {
    console.warn("Element with ID `app` not found.");
  }
};
