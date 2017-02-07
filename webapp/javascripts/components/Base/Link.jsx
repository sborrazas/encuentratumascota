import React from "react";
import { Component } from "utils/react-extras.js";
import { Link as RouterLink } from "utils/react-router-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Link.less";

class Link extends Component {
  render() {
    const {
      classes,
      children,
      className,
      onClick,
      tabIndex,
      to,
    } = this.props;
    const linkClassName = classes.link({}, className);

    if (onClick) {
      return (
        <span
          className={linkClassName}
          onClick={this._handleClick}
          tabIndex={tabIndex}>

          {children}
        </span>
      );
    }
    else {
      return (
        <RouterLink
          className={linkClassName}
          tabIndex={tabIndex}
          to={to}>

          {children}
        </RouterLink>
      );
    }
  }
  _handleClick(event) {
    const { onClick } = this.props;

    event.preventDefault();

    onClick();
  }
}

Link.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  tabIndex: React.PropTypes.number,
};

Link = connectStyles(Link, styles);

export default Link;
