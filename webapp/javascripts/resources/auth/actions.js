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

export const fetch = {
  types: [AUTH_FETCH, AUTH_FETCH_SUCCESS, AUTH_FETCH_FAILURE],
};

export const login = {
  path: "/login",
  method: "POST",
  types: [AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE],
};

export const create = {
  method: "POST",
  types: [AUTH_CREATE, AUTH_CREATE_SUCCESS, AUTH_CREATE_FAILURE],
};

export const signout = {
  path: "/signout",
  method: "POST",
  types: [AUTH_SIGNOUT, AUTH_SIGNOUT_SUCCESS, AUTH_SIGNOUT_FAILURE],
};

export const country = {
  path: "/country",
  method: "POST",
  types: [AUTH_COUNTRY, AUTH_COUNTRY_SUCCESS, AUTH_COUNTRY_FAILURE],
};
