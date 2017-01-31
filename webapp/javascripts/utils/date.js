import _ from "lodash";

export default {
  now: () => {
    return new Date(_.now());
  },
  year: (date) => {
    return date.getFullYear();
  },
};
