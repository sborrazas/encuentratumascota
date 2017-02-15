import {
  PUBLICATIONS_FETCH,
  PUBLICATIONS_FETCH_SUCCESS,
  PUBLICATIONS_FETCH_FAILURE,
  PUBLICATIONS_CREATE,
  PUBLICATIONS_CREATE_SUCCESS,
  PUBLICATIONS_CREATE_FAILURE,
} from "./actionTypes.js";

export default (variables) => {
  return variables.type ? `/p?type=${variables.type}` : "/p";
};

export const fetch = (uri) => {
  return {
    url: uri,
    types: [PUBLICATIONS_FETCH, PUBLICATIONS_FETCH_SUCCESS, PUBLICATIONS_FETCH_FAILURE],
  };
};

export const create = (uri) => {
  const url = `${uri}/new`;

  return {
    url,
    method: "POST",
    multipart: true,
    types: [PUBLICATIONS_CREATE, PUBLICATIONS_CREATE_SUCCESS, PUBLICATIONS_CREATE_FAILURE],
  };
};
