import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import thunk from "redux-thunk";
import reduceReducers from "reduce-reducers";
import { createStore, applyMiddleware, combineReducers } from "redux";
import App from "components/App.jsx";
import AdminMap from "components/Admin/Map.jsx";
import { reducer as routingReducer } from "utils/react-router-extras.js";
import { getAll } from "utils/dom/data.js";
import { createApi } from "utils/api.js";
import document from "utils/dom/document.js";
// Resources
import {
  NAMESPACE as AUTH_NAMESPACE,
  endpoint as authEndpoint,
  reducer as authReducer,
} from "resources/auth/index.js";
import {
  NAMESPACE as PUBLICATIONS_NAMESPACE,
  endpoint as publicationsEndpoint,
  reducer as publicationsReducer,
} from "resources/publications/index.js";
import {
  NAMESPACE as BREEDS_NAMESPACE,
  endpoint as breedsEndpoint,
  reducer as breedsReducer,
} from "resources/breeds/index.js";
import {
  NAMESPACE as PUBLICATION_NAMESPACE,
  endpoint as publicationEndpoint,
  reducer as publicationReducer,
} from "resources/publication/index.js";

const reducer = combineReducers({
  [AUTH_NAMESPACE]: authReducer,
  [BREEDS_NAMESPACE]: breedsReducer,
  [PUBLICATIONS_NAMESPACE]: publicationsReducer,
  [PUBLICATION_NAMESPACE]: publicationReducer,
  routing: routingReducer,
});

const store = createStore(
  reducer,
  {},
  applyMiddleware(thunk)
);

const endpoints = {
  "auth": authEndpoint,
  "breeds": breedsEndpoint,
  "publications": publicationsEndpoint,
  "publication": publicationEndpoint,
};

const api = createApi(endpoints, {
  headers: {
    "X-Csrf-Token": document.getElementsByName("csrf-token")[0].content,
  },
  json: true,
});

const COMPONENTS_MAP = {
  "app": App,
  "adminMap": AdminMap,
};

export default () => {
  _.forEach(COMPONENTS_MAP, (Component, name) => {
    _.forEach(document.getElementsByClassName(`js-${name}`), (el) => {
      ReactDOM.render(
        React.createElement(Component, {
          api,
          store,
          translations: global._TRANSLATIONS,
          data: getAll(el),
        }),
        el
      );
    });
  });
};
