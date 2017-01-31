import React from "react";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/NavBar.less";

class NavBar extends Component {
  render() {
    const { center, classes, importance, children } = this.props;

    return (
      <nav className={classes.navBar({ center, importance })}>
        {children}
      </nav>
    );
  }
}

NavBar.propTypes = {
  importance: React.PropTypes.bool,
};

NavBar = connectStyles(NavBar, styles);

class Item extends Component {
  render() {
    const { classes, children, importance } = this.props;
    const className = classes.item();
    const style = importance && {
      flex: importance,
    };

    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
}

Item.propTypes = {
  single: React.PropTypes.bool,
};

Item = connectStyles(Item, styles);

export { Item };
export default NavBar;
