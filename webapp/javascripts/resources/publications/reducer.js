import _ from "lodash";
import {
  PUBLICATIONS_FETCH,
  PUBLICATIONS_FETCH_SUCCESS,
  PUBLICATIONS_FETCH_FAILURE,
  PUBLICATIONS_CREATE,
  PUBLICATIONS_CREATE_SUCCESS,
  PUBLICATIONS_CREATE_FAILURE,
} from "./actionTypes.js";

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
  case PUBLICATIONS_FETCH:
    return _.assign({}, state, {
      [payload.uri]: {
        state: "fetching",
      },
    });
  case PUBLICATIONS_FETCH_SUCCESS:
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  case PUBLICATIONS_FETCH_FAILURE:
    return state;
  case PUBLICATIONS_CREATE:
    return state;
  case PUBLICATIONS_CREATE_SUCCESS:
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  case PUBLICATIONS_CREATE_FAILURE:
    return state;
  default:
    return state;
  }
};
