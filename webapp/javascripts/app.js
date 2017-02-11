import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { createStore, applyMiddleware, combineReducers } from "redux";
import App from "components/App.jsx";
import AdminMap from "components/Admin/Map.jsx";
import { reducer as routingReducer } from "utils/react-router-extras.js";
import { reducer as authReducer } from "resources/auth.js";
import { reducer as publicationsReducer } from "resources/publications.js";
import { reducer as breedsReducer } from "resources/breeds.js";
import { reducer as publicationReducer } from "resources/publication.js";
import { getAll } from "utils/dom/data.js";

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

const COMPONENTS_MAP = {
  "app": App,
  "adminMap": AdminMap,
};

export default () => {
  _.forEach(COMPONENTS_MAP, (Component, name) => {
    _.forEach(document.getElementsByClassName(`js-${name}`), (el) => {
      ReactDOM.render(
        React.createElement(Component, {
          store: store,
          translations: global._TRANSLATIONS,
          data: getAll(el),
        }),
        el
      );
    });
  });
};
