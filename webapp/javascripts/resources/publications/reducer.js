import _ from "lodash";
import {
  PUBLICATIONS_FETCH,
  PUBLICATIONS_FETCH_SUCCESS,
  PUBLICATIONS_FETCH_FAILURE,
  PUBLICATIONS_CREATE,
  PUBLICATIONS_CREATE_SUCCESS,
  PUBLICATIONS_CREATE_FAILURE,
} from "./actionTypes.js";
import { fetchReducer, fetchSuccessReducer } from "../reducers.js";

const ALL_TYPE = "all";

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
  case PUBLICATIONS_FETCH:
    return fetchReducer(state, payload.params.type || ALL_TYPE);
  case PUBLICATIONS_FETCH_SUCCESS:
    return fetchSuccessReducer(state, payload, payload.params.type || ALL_TYPE);
  default:
    return state;
  }
};
