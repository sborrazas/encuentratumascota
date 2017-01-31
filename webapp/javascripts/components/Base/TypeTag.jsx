import React from "react";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/TypeTag.less";

class TypeTag extends Component {
  render() {
    const { children, classes, type } = this.props;

    return (
      <span className={classes.typeTag({ [type]: true })}>
        {children}
      </span>
    );
  }
}

TypeTag.propTypes = {
  type: React.PropTypes.oneOf([
    "adoption",
    "found",
    "lost",
  ]).isRequired,
};

TypeTag = connectStyles(TypeTag, styles);

export default TypeTag;
