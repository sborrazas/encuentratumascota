import _ from "lodash";

const BREEDS_FETCH = "BREEDS_FETCH";
const BREEDS_FETCH_SUCCESS = "BREEDS_FETCH_SUCCESS";
const BREEDS_FETCH_FAILURE = "BREEDS_FETCH_FAILURE";

const breeds = (variables) => {
  return "/breeds";
};

const fetch = (uri) => {
  return {
    url: uri,
    types: [BREEDS_FETCH, BREEDS_FETCH_SUCCESS, BREEDS_FETCH_FAILURE],
  };
};

const reducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
  case BREEDS_FETCH:
    console.log("BREEDS FETCH", action);
    return _.assign({}, state, {
      [payload.uri]: {
        state: "fetching",
      },
    });
  case BREEDS_FETCH_SUCCESS:
    console.log("BREEDS FETCH SUCCESS", action);
    return _.assign({}, state, {
      [payload.uri]: {
        data: payload.data,
        state: "fetched",
      },
    });
  case BREEDS_FETCH_FAILURE:
    return state;
  default:
    return state;
  }
};

export default breeds;
export { fetch, reducer };
