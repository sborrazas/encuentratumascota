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

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
  case AUTH_FETCH:
    return _.assign({}, state, {
      [payload.uri]: {
        state: "fetching",
      },
    });
  case AUTH_FETCH_FAILURE:
    return state;
  case AUTH_FETCH_SUCCESS:
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  case AUTH_LOGIN_SUCCESS:
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  case AUTH_COUNTRY_FAILURE:
    return state;
  case AUTH_COUNTRY_SUCCESS:
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
      "/p": { // TODO
        state: "uninitialized",
      },
    });
  case AUTH_SIGNOUT_FAILURE:
    return state;
  case AUTH_SIGNOUT_SUCCESS:
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  default:
    return state;
  }
};
