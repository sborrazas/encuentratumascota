import _ from "lodash";
import {
  AUTH_FETCH,
  AUTH_FETCH_SUCCESS,
  AUTH_FETCH_FAILURE,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_CREATE,
  AUTH_CREATE_SUCCESS,
  AUTH_CREATE_FAILURE,
  AUTH_COUNTRY,
  AUTH_COUNTRY_SUCCESS,
  AUTH_COUNTRY_FAILURE,
  AUTH_SIGNOUT,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_SIGNOUT_FAILURE,
} from "./actionTypes.js";
import { fetchReducer, fetchSuccessReducer } from "../reducers.js";

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
  case AUTH_FETCH:
    return fetchReducer(state);
  case AUTH_FETCH_SUCCESS:
    return fetchSuccessReducer(state, payload);
  case AUTH_LOGIN_SUCCESS:
    return fetchSuccessReducer(state, payload);
  case AUTH_CREATE_SUCCESS:
    return fetchSuccessReducer(state, payload);
  case AUTH_COUNTRY_SUCCESS:
    return fetchSuccessReducer(state, payload);
  case AUTH_SIGNOUT_SUCCESS:
    return fetchSuccessReducer(state, payload);
  default:
    return state;
  }
};
