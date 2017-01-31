import React, { Component } from "react";
import _ from "lodash";
import console from "./console.js";

const classNameBuilder = (...args) => {
  return _.join(args, " ");
};

const connect = (DecoratedComponent, classesMap) => {
  const props = {};
  const componentsMap = {};
  const modifiersMap = {};
  let block;

  _.forOwn(classesMap, (destClassName, origClassName) => {
    const match = origClassName.match(/^(\w+)(?:-(\w+))?(?:--(\w+))?/);

    if (match) {
      let [, cBlock, cElement, cModifier] = match;

      if (block && block !== cBlock) {
        console.error(
          `Block name \`${block}\` doesn\'t match block name \`${cBlock}\`. ` +
            `You can only define a single block component per set of styles.`
        );
      }
      block = cBlock;

      if (!cElement) {
        cElement = cBlock;
      }
      if (!modifiersMap[cElement]) {
        modifiersMap[cElement] = {};
      }

      if (cModifier) {
        modifiersMap[cElement][cModifier] = destClassName;
      }
      else {
        componentsMap[cElement] = destClassName;
      }
    }
  });

  _.forOwn(componentsMap, (componentClassName, componentName) => {
    props[componentName] = (modifiersSelection, additionalClasses) => {
      let className = classNameBuilder(componentClassName, additionalClasses);

      if (modifiersSelection) {
        _.forOwn(modifiersSelection, (isActive, modifierName) => {
          const modifierClassName = modifiersMap[componentName][modifierName];

          if (!modifierClassName) {
            console.error(
              `Modifier \`${modifierName}\` of component \`${componentName}\`` +
                ` does not exist.`
            );
          }

          if (isActive) {
            className = classNameBuilder(className, modifierClassName);
          }
        });
      }

      return className;
    };
  });

  class StyleSheetWrapper extends React.Component {
    render() {
      return <DecoratedComponent {...this.props} classes={props} />
    }
  }

  const displayName = DecoratedComponent.displayName ||
    DecoratedComponent.name ||
    "Component";

  StyleSheetWrapper.displayName = `BEM(${displayName})`;

  return StyleSheetWrapper;
};

export { connect };
