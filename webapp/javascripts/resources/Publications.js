import _ from "lodash";

const PUBLICATIONS_FETCH = "PUBLICATIONS_FETCH";
const PUBLICATIONS_FETCH_SUCCESS = "PUBLICATIONS_FETCH_SUCCESS";
const PUBLICATIONS_FETCH_FAILURE = "PUBLICATIONS_FETCH_FAILURE";
const PUBLICATIONS_CREATE = "PUBLICATIONS_CREATE";
const PUBLICATIONS_CREATE_SUCCESS = "PUBLICATIONS_CREATE_SUCCESS";
const PUBLICATIONS_CREATE_FAILURE = "PUBLICATIONS_CREATE_FAILURE";

const publications = (variables) => {
  return variables.type ? `/p?type=${variables.type}` : "/p";
};

const fetch = (uri) => {
  return {
    url: uri,
    types: [PUBLICATIONS_FETCH, PUBLICATIONS_FETCH_SUCCESS, PUBLICATIONS_FETCH_FAILURE],
  };
};

const create = (uri) => {
  const url = `${uri}/new`;

  return {
    url,
    method: "POST",
    multipart: true,
    types: [PUBLICATIONS_CREATE, PUBLICATIONS_CREATE_SUCCESS, PUBLICATIONS_CREATE_FAILURE],
  };
};

const reducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
  case PUBLICATIONS_FETCH:
    console.log("PUBLICATIONS FETCH", action);
    return _.assign({}, state, {
      [payload.uri]: {
        state: "fetching",
      },
    });
  case PUBLICATIONS_FETCH_SUCCESS:
    console.log("PUBLICATIONS FETCH SUCCESS", action);
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  case PUBLICATIONS_FETCH_FAILURE:
    return state;
  case PUBLICATIONS_CREATE:
    console.log("PUBLICATIONS CREATE", action);
    return state;
  case PUBLICATIONS_CREATE_SUCCESS:
    console.log("PUBLICATIONS CREATE SUCCESS", action);
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  case PUBLICATIONS_CREATE_FAILURE:
    return state;
  default:
    return state;
  }
};

export default publications;
export { fetch, reducer, create };
