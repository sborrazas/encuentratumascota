import { createEndpoint } from "utils/api.js";
import * as actions from "./actions.js";
import { DEFAULT_RESOURCE } from "../constants.js";

export reducer from "./reducer.js";

const ALL_TYPE = "all";
export const NAMESPACE = "publications";

const selectPublications = (state) => {
  return state[NAMESPACE] || {};
};

export const selectPublicationsByType = (state, type) => {
  return selectPublications(state)[type || ALL_TYPE] || DEFAULT_RESOURCE;
};

export const endpoint = createEndpoint({
  url: "/p",
  actions,
});
