import _ from "lodash";
import {
  PUBLICATION_FETCH,
  PUBLICATION_FETCH_SUCCESS,
  PUBLICATION_FETCH_FAILURE,
  PUBLICATION_INQUIRY,
  PUBLICATION_INQUIRY_SUCCESS,
  PUBLICATION_INQUIRY_FAILURE,
} from "./actionTypes.js";
import { fetchReducer, fetchSuccessReducer } from "../reducers.js";

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
  case PUBLICATION_FETCH:
    return fetchReducer(state, payload.params.slug);
  case PUBLICATION_FETCH_SUCCESS:
    return fetchSuccessReducer(state, payload, payload.params.slug);
  default:
    return state;
  }
};
