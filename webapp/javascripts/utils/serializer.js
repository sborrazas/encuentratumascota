import global from "./global.js";

var serializer = null
  , reduceParams = null;

reduceParams = function (params, namespace, acc, callback) {
  object.each(params, function (key, val) {
    var queryKey = serializer.encodeURI(key);

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

serializer = {
  reduceParams: function (params, initial, callback) {
    return reduceParams(params, "", initial, callback);
  },
  generateQuery: function (params) {
    return reduceParams(params, "", [], function (key, val, acc) {
      if (typeof val !== "undefined") {
        acc.push(key + "=" + val);
      }

      return acc;
    }).sort().join("&");
  },
  generateURL: function (url, params) {
    var query = this.generateQuery(params);

    if (query.length > 0) {
      return url + "?" + query;
    }
    else {
      return url;
    }
  },
  encodeURI: function (value) {
    return global.encodeURIComponent(value);
  },
  parseURI: function (url) {
    return (new global.URL(url));
  }
};

module.exports = serializer;
