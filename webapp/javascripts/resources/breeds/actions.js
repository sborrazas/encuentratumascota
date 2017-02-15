import {
  BREEDS_FETCH,
  BREEDS_FETCH_SUCCESS,
  BREEDS_FETCH_FAILURE,
} from "./actionTypes.js";

export default (variables) => {
  return "/breeds";
};

export const fetch = (uri) => {
  return {
    url: uri,
    types: [BREEDS_FETCH, BREEDS_FETCH_SUCCESS, BREEDS_FETCH_FAILURE],
  };
};
