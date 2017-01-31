import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";

const translatedT = (translations) => {
  return (...args) => {
    // const lastArg = args[args.length - 1];
    const options = {};
    // typeof lastArg === "object" && lastArg !== null ? args.pop() : {};
    const keys = args.join(".").split(".");
    const trans = translations[keys[0]];

    let result;

    // options = options || {};

    if (options.hasOwnProperty("count")) {
      if (options.count === 0) {
        keys.push("zero");
      }
      else if (options.count === 1) {
        keys.push("one");
      }
      else {
        keys.push("other");
      }
    }

    result = _.reduce(keys.slice(1), function (trans, k) {
      if (!trans) {
        throw new Error(`Translation \`${keys.join(".")}\` not found.`);
      }
      return trans[k];
    }, trans);

    if (!result) {
      throw new ReferenceError("Could not find i18n string: " + keys.join("."));
    }

    if (typeof result !== "string") {
      throw new TypeError(
        `i18n key \"${keys.join(".")}\" is not a string,` +
          `but of type \"${typeof result}\"`
      );
    }

    return result.replace(/%\{(\w+)\}/g, function (_, option) {
      return options[option];
    });
  };
};

const connect = (ChildComponent) => {
  class TranslationsWrapper extends Component {
    render() {
      return (
        <ChildComponent
          t={translatedT(this.context.translations)}
          {...this.props} />
      );
    }
  }

  TranslationsWrapper.contextTypes = {
    translations: React.PropTypes.object.isRequired,
  };

  return TranslationsWrapper;
};

export { connect };
