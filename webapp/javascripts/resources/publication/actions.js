import _ from "lodash";
import {
  PUBLICATION_FETCH,
  PUBLICATION_FETCH_SUCCESS,
  PUBLICATION_FETCH_FAILURE,
  PUBLICATION_INQUIRY,
  PUBLICATION_INQUIRY_SUCCESS,
  PUBLICATION_INQUIRY_FAILURE,
} from "./actionTypes.js";

export default (variables) => {
  return `/p/${variables.slug}`;
};

const fetch = (uri) => {
  return {
    url: uri,
    types: [PUBLICATION_FETCH, PUBLICATION_FETCH_SUCCESS, PUBLICATION_FETCH_FAILURE],
  };
};

const inquiry = (uri) => {
  const url = `${uri}/inquiry`;

  return {
    url,
    method: "POST",
    types: [PUBLICATION_INQUIRY, PUBLICATION_INQUIRY_SUCCESS, PUBLICATION_INQUIRY_FAILURE],
  };
};
