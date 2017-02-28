import _ from "lodash";
import { LOADING, LOADED } from "./constants.js";

const updateAt = (state, namespaceSlices, newState) => {
  if (namespaceSlices.length > 0) {
    const [slice, ...rest] = namespaceSlices;

    return _.assign({}, state, {
      [slice]: updateAt(state[slice] || {}, rest, newState),
    });
  }
  else {
    return newState;
  }
};

export const fetchReducer = (state, ...namespaceSlices) => {
  return updateAt(state, namespaceSlices, {
    status: LOADING,
    loading: true,
    loaded: false,
  });
};

export const fetchSuccessReducer = (state, { data }, ...namespaceSlices) => {
  return updateAt(state, namespaceSlices, {
    status: LOADED,
    data,
    loading: false,
    loaded: true,
  });
};
