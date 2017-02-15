import _ from "lodash";
import {
  BREEDS_FETCH,
  BREEDS_FETCH_SUCCESS,
  BREEDS_FETCH_FAILURE,
} from "./actionTypes.js";

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
  case BREEDS_FETCH:
    return _.assign({}, state, {
      [payload.uri]: {
        state: "fetching",
      },
    });
  case BREEDS_FETCH_SUCCESS:
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  case BREEDS_FETCH_FAILURE:
    return state;
  default:
    return state;
  }
};
