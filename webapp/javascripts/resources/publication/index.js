import * as actions from "./actions.js";
import { DEFAULT_RESOURCE } from "../constants.js";

export reducer from "./reducer.js";

export const NAMESPACE = "publication";

export const selectPublication = (state, slug) => {
  return state[NAMESPACE][slug] || DEFAULT_RESOURCE;
};

export const endpoint = {
  path: "/p/:slug",
  actions,
};
