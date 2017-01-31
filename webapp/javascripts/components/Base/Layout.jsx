import React from "react";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Layout.less";
import Icon from "./Icon.jsx";

class Layout extends Component {
  render() {
    const { children, classes, modal, sidebarHidden } = this.props;
    const className = classes.layout({
      sidebarHidden,
    });
    const overlayClassName = classes.overlay({
      active: modal,
    });

    return (
      <div className={className}>
        <div className={overlayClassName} onClick={this._overlayClick} />
        {modal}
        {children}
      </div>
    );
  }
  _overlayClick(event) {
    const { modal, onOverlayClick } = this.props;

    if (modal && onOverlayClick) {
      event.preventDefault();

      onOverlayClick();
    }
  }
}

Layout.propTypes = {
  modal: React.PropTypes.element,
  onOverlayClick: React.PropTypes.func,
  sidebarHidden: React.PropTypes.bool,
};

Layout = connectStyles(Layout, styles);

class Body extends Component {
  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.body()}>
        {children}
      </div>
    );
  }
}

Body = connectStyles(Body, styles);

class Sidebar extends Component {
  render() {
    const { classes, children, onToggle } = this.props;

    return (
      <aside className={classes.sidebar()}>
        {
          onToggle &&
            (
              <Icon
                className={classes.sidebarToggleIcon()}
                name="arrowLeft"
                onClick={onToggle} />
            )
        }
        {children}
      </aside>
    );
  }
}

Sidebar = connectStyles(Sidebar, styles);

Sidebar.propTypes = {
  onToggle: React.PropTypes.func,
};

class Content extends Component {
  render() {
    const { children, classes, flash } = this.props;

    return (
      <div className={classes.content()}>
        {
          flash &&
            (
              <div className={classes.flash({ [flash.type]: true })}>
                <strong className={classes.flashTitle()}>{flash.title}</strong>
                {" "}{flash.message}
              </div>
            )
        }
        {children}
      </div>
    );
  }
};

Content.propTypes = {
  flash: React.PropTypes.shape({
    title: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(["info", "error", "success"]).isRequired,
  }),
};

Content = connectStyles(Content, styles);

export default Layout;
export { Body, Sidebar, Content };
