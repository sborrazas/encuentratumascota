import _ from "lodash";
import {
  BREEDS_FETCH,
  BREEDS_FETCH_SUCCESS,
  BREEDS_FETCH_FAILURE,
} from "./actionTypes.js";
import { fetchReducer, fetchSuccessReducer } from "../reducers.js";

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
  case BREEDS_FETCH:
    return fetchReducer(state);
  case BREEDS_FETCH_SUCCESS:
    return fetchSuccessReducer(state, payload);
  default:
    return state;
  }
};
