import _ from "lodash";
import {
  PUBLICATION_FETCH,
  PUBLICATION_FETCH_SUCCESS,
  PUBLICATION_FETCH_FAILURE,
  PUBLICATION_INQUIRY,
  PUBLICATION_INQUIRY_SUCCESS,
  PUBLICATION_INQUIRY_FAILURE,
} from "./actionTypes.js";

export const fetch = (params) => {
  return {
    params,
    types: [PUBLICATION_FETCH, PUBLICATION_FETCH_SUCCESS, PUBLICATION_FETCH_FAILURE],
  };
};

export const inquiry = (params) => {
  return {
    path: "/inquiry",
    method: "POST",
    params,
    types: [PUBLICATION_INQUIRY, PUBLICATION_INQUIRY_SUCCESS, PUBLICATION_INQUIRY_FAILURE],
  };
};
