import React from "react";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Dropdown.less";
import Icon from "./Icon.jsx";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }
  render() {
    const { classes, children, label, icon } = this.props;
    const { expanded } = this.state;

    return (
      <div
        className={classes.dropdown({ expanded })}
        onClick={this._toggleDropdown}>

        <span className={classes.option()}>
          <Icon className={classes.icon()} name={icon.toLowerCase()} />

          {label}
          <Icon className={classes.caret()} name="caret" />
        </span>
        <div className={classes.options()}>
          {children}
        </div>
      </div>
    );
  }
  _toggleDropdown(event) {
    event.preventDefault();

    this.setState((prevState) => {
      return { expanded: !prevState.expanded };
    });
  }
}

Dropdown.propTypes = {
  icon: React.PropTypes.oneOf([
    "UY",
    "PE",
    "AR",
    "CL",
  ]).isRequired,
  label: React.PropTypes.string.isRequired,
};

Dropdown = connectStyles(Dropdown, styles);

class Option extends Component {
  render() {
    const { classes, icon, label } = this.props;

    return (
      <div className={classes.option()} onClick={this._click}>
        <Icon className={classes.icon()} name={icon.toLowerCase()} />
        {label}
      </div>
    );
  }
  _click(event) {
    const { onClick, value } = this.props;

    event.preventDefault();

    onClick(value);
  }
}

Option.propTypes = {
  label: React.PropTypes.string.isRequired,
  icon: React.PropTypes.oneOf([
    "UY",
    "PE",
    "AR",
    "CL",
  ]).isRequired,
  onClick: React.PropTypes.func.isRequired,
  value: React.PropTypes.any.isRequired,
};

Option = connectStyles(Option, styles);

export default Dropdown;
export { Option };
