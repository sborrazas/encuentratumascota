import { createEndpoint } from "utils/api.js";
import * as actions from "./actions.js";
import { DEFAULT_RESOURCE } from "../constants.js";

export reducer from "./reducer.js";

export const NAMESPACE = "auth";

export const selectAuth = (state) => {
  return state[NAMESPACE] || DEFAULT_RESOURCE;
};

export const endpoint = createEndpoint({
  url: "/auth",
  actions,
});
