import React from "react";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import global from "utils/global.js";
import styles from "styles/Loader.less";
import Icon from "./Icon.jsx";

const ELLIPSIS = "...";
const ELLIPSIS_INTERVAL = 300;

class Loader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }
  render() {
    const { classes, message } = this.props;
    const { count } = this.state;

    return (
      <div className={classes.loader()}>
        <Icon className={classes.icon()} name="paw" />
        {message}
        {ELLIPSIS.substr(0, count)}
      </div>
    );
  }
  componentDidMount() {
    this._interval = global.setInterval(() => {
      this.setState((state) => {
        return {
          count: (state.count + 1) % ELLIPSIS.length,
        };
      });
    }, ELLIPSIS_INTERVAL);
  }
  componentWillUnmount() {
    global.clearInterval(this._interval);
  }
}

Loader.propTypes = {
  message: React.PropTypes.string.isRequired,
};

Loader = connectStyles(Loader, styles);

export default Loader;
