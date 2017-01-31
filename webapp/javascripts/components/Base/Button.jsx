import React from "react";
import { Link } from "utils/react-router-extras.js";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Button.less";

class Button extends Component {
  render() {
    const {
      active,
      children,
      classes,
      className,
      primary,
      secondary,
      important,
      to,
    } = this.props;
    const buttonClassName = classes.button({
      active,
      primary,
      secondary,
      important,
    }, className);

    if (to) {
      return (
        <Link to={to} className={buttonClassName}>
          {children}
        </Link>
      );
    }
    else {
      return (
        <button className={buttonClassName} onClick={this._click}>
          {children}
        </button>
      );
    }
  }
  _click(event) {
    const { onClick } = this.props;

    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  }
}

Button.propTypes = {
  active: React.PropTypes.bool,
  secondary: React.PropTypes.bool,
  cta: React.PropTypes.bool,
  large: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

Button = connectStyles(Button, styles);

export default Button;
