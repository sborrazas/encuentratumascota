import _ from "lodash";

const AUTH_FETCH = "AUTH_FETCH";
const AUTH_FETCH_SUCCESS = "AUTH_FETCH_SUCCESS";
const AUTH_FETCH_FAILURE = "AUTH_FETCH_FAILURE";
const AUTH_LOGIN = "AUTH_LOGIN";
const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";
const AUTH_CREATE = "AUTH_CREATE";
const AUTH_CREATE_SUCCESS = "AUTH_CREATE_SUCCESS";
const AUTH_CREATE_FAILURE = "AUTH_CREATE_FAILURE";
const AUTH_COUNTRY = "AUTH_COUNTRY";
const AUTH_COUNTRY_SUCCESS = "AUTH_COUNTRY_SUCCESS";
const AUTH_COUNTRY_FAILURE = "AUTH_COUNTRY_FAILURE";
const AUTH_SIGNOUT = "AUTH_SIGNOUT";
const AUTH_SIGNOUT_SUCCESS = "AUTH_SIGNOUT_SUCCESS";
const AUTH_SIGNOUT_FAILURE = "AUTH_SIGNOUT_FAILURE";

const auth = (variables) => {
  return "/auth";
};

const fetch = (uri) => {
  return {
    url: uri,
    types: [AUTH_FETCH, AUTH_FETCH_SUCCESS, AUTH_FETCH_FAILURE],
  };
};

const login = (uri) => {
  const url = `${uri}/login`;

  return {
    url: url,
    method: "POST",
    types: [AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE],
  };
};

const create = (uri) => {
  return {
    url: uri,
    method: "POST",
    types: [AUTH_CREATE, AUTH_CREATE_SUCCESS, AUTH_CREATE_FAILURE],
  };
};

const signout = (uri) => {
  const url = `${uri}/signout`;

  return {
    url,
    method: "POST",
    types: [AUTH_SIGNOUT, AUTH_SIGNOUT_SUCCESS, AUTH_SIGNOUT_FAILURE],
  };
};

const country = (uri) => {
  const url = `${uri}/country`;

  return {
    url,
    method: "POST",
    types: [AUTH_COUNTRY, AUTH_COUNTRY_SUCCESS, AUTH_COUNTRY_FAILURE],
  };
};

const reducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
  case AUTH_FETCH:
    console.log("AUTH FETCH", action);
    return _.assign({}, state, {
      [payload.uri]: {
        state: "fetching",
      },
    });
  case AUTH_FETCH_FAILURE:
    console.log("AUTH FETCH FAILURE", action);
    return state;
  case AUTH_FETCH_SUCCESS:
    console.log("AUTH FETCH SUCCESS", action);
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  case AUTH_LOGIN_SUCCESS:
    console.log("AUTH LOGIN SUCCESS", action);
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  case AUTH_COUNTRY_FAILURE:
    console.log("AUTH COUNTRY FAILURE", action);
    return state;
  case AUTH_COUNTRY_SUCCESS:
    console.log("AUTH COUNTRY SUCCESS", action);
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
    console.log("AUTH SIGNOUT FAILURE", action);
    return state;
  case AUTH_SIGNOUT_SUCCESS:
    console.log("AUTH SIGNOUT SUCCESS", action);
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

export default auth;
export { create, country, signout, fetch, login, reducer };
