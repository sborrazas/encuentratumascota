import _ from "lodash";

const PUBLICATION_FETCH = "PUBLICATION_FETCH";
const PUBLICATION_FETCH_SUCCESS = "PUBLICATION_FETCH_SUCCESS";
const PUBLICATION_FETCH_FAILURE = "PUBLICATION_FETCH_FAILURE";
const PUBLICATION_INQUIRY = "PUBLICATION_INQUIRY";
const PUBLICATION_INQUIRY_SUCCESS = "PUBLICATION_INQUIRY_SUCCESS";
const PUBLICATION_INQUIRY_FAILURE = "PUBLICATION_INQUIRY_FAILURE";

const publication = (variables) => {
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

const reducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
  case PUBLICATION_FETCH:
    console.log("PUBLICATION FETCH", action);
    return _.assign({}, state, {
      [payload.uri]: {
        state: "fetching",
      },
    });
  case PUBLICATION_FETCH_SUCCESS:
    console.log("PUBLICATION FETCH SUCCESS", action);
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  case PUBLICATION_FETCH_FAILURE:
    return state;
  default:
    return state;
  }
};

export default publication;
export { fetch, inquiry, reducer };
