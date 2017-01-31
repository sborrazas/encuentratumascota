import React from "react";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import Button from "./Button.jsx";
import styles from "styles/ButtonGroup.less";

class ButtonGroup extends Component {
  render() {
    const { classes, children } = this.props;

    return (
      <nav className={classes.buttonGroup()}>
        {children}
      </nav>
    );
  }
}

ButtonGroup = connectStyles(ButtonGroup, styles);

class Item extends Component {
  render() {
    const {
      active,
      children,
      classes,
      to,
    } = this.props;

    return (
      <Button
        active={active}
        className={classes.item()}
        to={to}>

        {children}
      </Button>
    );
  }
}

Item = connectStyles(Item, styles);

export default ButtonGroup;
export { Item };
