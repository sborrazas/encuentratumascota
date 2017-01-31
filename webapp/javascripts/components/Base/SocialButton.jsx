import React from "react";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/SocialButton.less";

class SocialButton extends Component {
  render() {
    const { children, classes, external, to, type, } = this.props;
    const className = classes.socialButton({
      external,
      internal: ! external,
      [type]: true,
    });

    if (external) {
      if (type === "facebook") {
        return (
          <div
            className={className}
            data-href={to}
            data-send="false"
            data-layout="button_count"
            data-width="450"
            data-show-faces="false" />
        );
      }
      else { // twitter
        return (
          <a
            href={to}
            className={className}
            data-show-count="false"
            data-lang="es"
            data-show-screen-name="false">

            {children}
          </a>
        );
      }
    }
    else {
      return (
        <a href={to} className={className}>
          <span className={classes.label()}>
            {children}
          </span>
        </a>
      );
    }
  }
}

SocialButton.propTypes = {
  external: React.PropTypes.bool,
  to: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(["twitter", "facebook"]).isRequired,
};

SocialButton = connectStyles(SocialButton, styles);

export default SocialButton;
