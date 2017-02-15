import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import thunk from "redux-thunk";
import reduceReducers from "reduce-reducers";
import { createStore, applyMiddleware, combineReducers } from "redux";
import App from "components/App.jsx";
import AdminMap from "components/Admin/Map.jsx";
import { reducer as routingReducer } from "utils/react-router-extras.js";
import authReducer from "resources/auth/reducer.js";
import publicationsReducer from "resources/publications/reducer.js";
import breedsReducer from "resources/breeds/reducer.js";
import publicationReducer from "resources/publication/reducer.js";
import { getAll } from "utils/dom/data.js";

const reducer = combineReducers({
  api: reduceReducers(
    authReducer,
    breedsReducer,
    publicationReducer,
    publicationsReducer,
  ),
  routing: routingReducer,
});

const store = createStore(
  reducer,
  {},
  applyMiddleware(thunk)
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
