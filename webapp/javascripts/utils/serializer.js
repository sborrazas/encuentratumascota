import global from "./global.js";
import _ from "lodash";

export const encodeURI = (value) => {
  return global.encodeURIComponent(value);
};
const reduceParams = function (params, namespace, acc, callback) {
  _.forEach(params, (val, key) => {
    var queryKey = encodeURI(key);

    if (namespace) {
      queryKey = namespace + "[" + queryKey + "]";
    }

    if (val && (val.constructor === Object || val.constructor === Array)) {
      acc = reduceParams(val, queryKey, acc, callback);
    }
    else {
      acc = callback(queryKey, val, acc);
    }
  });

  return acc;
};
const generateQuery = (params) => {
  return reduceParams(params, "", [], function (key, val, acc) {
    if (typeof val !== "undefined") {
      acc.push(key + "=" + val);
    }

    return acc;
  }).sort().join("&");
};
export const generateURL = (url, params) => {
  const query = generateQuery(params);

  if (query.length > 0) {
    return url + "?" + query;
  }
  else {
    return url;
  }
};
