import { PureComponent as ReactComponent } from "react";

class Component extends ReactComponent {
  constructor(props) {
    super(props);

    const proto = Object.getPrototypeOf(this);

    Object.getOwnPropertyNames(proto).forEach((methodName) => {
      if (methodName.startsWith("_")) {
        this[methodName] = this[methodName].bind(this);
      }
    });
  }
}

export { Component };
