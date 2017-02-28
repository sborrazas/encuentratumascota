import {
  PUBLICATIONS_FETCH,
  PUBLICATIONS_FETCH_SUCCESS,
  PUBLICATIONS_FETCH_FAILURE,
  PUBLICATIONS_CREATE,
  PUBLICATIONS_CREATE_SUCCESS,
  PUBLICATIONS_CREATE_FAILURE,
} from "./actionTypes.js";

export const fetch = (params) => {
  return {
    params,
    types: [PUBLICATIONS_FETCH, PUBLICATIONS_FETCH_SUCCESS, PUBLICATIONS_FETCH_FAILURE],
  };
};

export const create = (params) => {
  return {
    path: "/new",
    method: "POST",
    multipart: true,
    params,
    types: [PUBLICATIONS_CREATE, PUBLICATIONS_CREATE_SUCCESS, PUBLICATIONS_CREATE_FAILURE],
  };
};
