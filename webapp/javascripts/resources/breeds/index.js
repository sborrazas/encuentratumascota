import { createEndpoint } from "utils/api.js";
import * as actions from "./actions.js";

export reducer from "./reducer.js";

export const NAMESPACE = "breeds";

export const selectBreeds = (state) => {
  return state[NAMESPACE];
};

export const endpoint = createEndpoint({
  url: "/breeds",
  actions,
});
