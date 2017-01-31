import React from "react";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Modal.less";

class Modal extends Component {
  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.modal()}>
        {children}
      </div>
    );
  }
}

Modal = connectStyles(Modal, styles);

class Body extends Component {
  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.body()}>
        {children}
      </div>
    );
  }
}

Body = connectStyles(Body, styles);

class Footer extends Component {
  render() {
    const { classes, children, separator } = this.props;

    return (
      <div className={classes.footer()}>
        {
          separator &&
            (
              <div className={classes.footerSeparator()}>
                {separator}
              </div>
            )
        }
        {children}
      </div>
    );
  }
}

Footer.propTypes = {
  separator: React.PropTypes.string,
};

Footer = connectStyles(Footer, styles);

export default Modal;
export { Body, Footer };
