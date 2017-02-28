import _ from "lodash";
import fetch, { FormData } from "./fetch.js";
import json from "./json.js";
import { generateURL } from "./serializer.js";

const fillMultipartForm = (namespace, params, form = new FormData()) => {
  const namespaceStr = _.reduce(_.tail(namespace), (nsStr, nsSlice) => {
    return `${nsStr}[${nsSlice}]`;
  }, _.head(namespace));

  _.forOwn(params, (value, key) => {
    if (_.isArray(value) || _.isPlainObject(value)) {
      fillMultipartForm(
        _.concat(namespace, [key]),
        value,
        form
      );
    }
    else {
      form.append(`${namespaceStr}[${key}]`, value);
    }
  });

  return form;
};

export default (method, path, params, options = {}) => {
  const fetchHeaders = {
    "Accept": "application/json",
    ...options.headers,
  };
  const fetchOptions = {
    method: method,
    credentials: "same-origin",
    headers: fetchHeaders,
  };

  if (method === "GET") {
    if (!_.isEmpty(params)) {
      path = generateURL(path, params);
    }
  }
  else if (options.multipart) {
    _.extend(fetchOptions, {
      body: fillMultipartForm(["payload"], params),
    });
  }
  else {
    _.extend(fetchOptions, {
      body: json.stringify({ payload: params }),
      multipart: options.multipart,
    });
    _.extend(fetchHeaders, {
      "Content-Type": "application/json",
    });
  }

  return fetch(path, fetchOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw response;
      }
    })
    .catch((response) => {
      if (response.status === 422) {
        return response.json().then((content) => {
          throw content;
        });
      }
      else {
        throw new Error(
          `Invalid response status received: \`${response.status}\`.`
        );
      }
    });
};
