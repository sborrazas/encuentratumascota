import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Icon.less";

const FLAG_ICONS = [
  "ar",
  "cl",
  "pe",
  "uy",
];

const BIG_ICONS = [
  "paw",
];

class Icon extends Component {
  render() {
    const { className, classes, name } = this.props;
    const iconClassName = classes.icon({
      [name]: true,
      big: _.includes(BIG_ICONS, name),
      flag: _.includes(FLAG_ICONS, name),
    }, className);

    return (
      <i className={iconClassName} onClick={this._click} />
    );
  }
  _click(event) {
    const { onClick } = this.props;

    if (onClick) {
      event.preventDefault();
      onClick();
    }
  }
}

Icon.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.oneOf(_.concat([
    "arrowRight",
    "arrowLeft",
    "caret",
    "minus",
    "paw",
    "plus",
    "tag",
    "time",
  ], FLAG_ICONS)).isRequired,
  onClick: React.PropTypes.func,
};

Icon = connectStyles(Icon, styles);

export default Icon;
