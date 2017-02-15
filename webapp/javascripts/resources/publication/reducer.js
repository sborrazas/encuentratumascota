import _ from "lodash";
import {
  PUBLICATION_FETCH,
  PUBLICATION_FETCH_SUCCESS,
  PUBLICATION_FETCH_FAILURE,
  PUBLICATION_INQUIRY,
  PUBLICATION_INQUIRY_SUCCESS,
  PUBLICATION_INQUIRY_FAILURE,
} from "./actionTypes.js";

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
  case PUBLICATION_FETCH:
    return _.assign({}, state, {
      [payload.uri]: {
        state: "fetching",
      },
    });
  case PUBLICATION_FETCH_SUCCESS:
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  case PUBLICATION_FETCH_FAILURE:
    return state;
  default:
    return state;
  }
};
