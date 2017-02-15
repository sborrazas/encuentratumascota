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

export default (variables) => {
  return "/auth";
};

export const fetch = (uri) => {
  return {
    url: uri,
    types: [AUTH_FETCH, AUTH_FETCH_SUCCESS, AUTH_FETCH_FAILURE],
  };
};

export const login = (uri) => {
  const url = `${uri}/login`;

  return {
    url: url,
    method: "POST",
    types: [AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE],
  };
};

export const create = (uri) => {
  return {
    url: uri,
    method: "POST",
    types: [AUTH_CREATE, AUTH_CREATE_SUCCESS, AUTH_CREATE_FAILURE],
  };
};

export const signout = (uri) => {
  const url = `${uri}/signout`;

  return {
    url,
    method: "POST",
    types: [AUTH_SIGNOUT, AUTH_SIGNOUT_SUCCESS, AUTH_SIGNOUT_FAILURE],
  };
};

export const country = (uri) => {
  const url = `${uri}/country`;

  return {
    url,
    method: "POST",
    types: [AUTH_COUNTRY, AUTH_COUNTRY_SUCCESS, AUTH_COUNTRY_FAILURE],
  };
};
