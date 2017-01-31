import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import { Link as RouterLink, browserHistory } from "react-router";
import { connect as reduxConnect } from "react-redux";

const mapStateToProps = (state) => {
  return state.routing;
};

const mapDispatchToProps = (dispatch) => {
  return {
    goTo: (path) => {
      browserHistory.push(path);
    },
  };
};

const connect = (ContainerComponent) => {
  return reduxConnect(mapStateToProps, mapDispatchToProps)(ContainerComponent);
};

const reducer = (state = { pathname: "", params: {}, query: {} }, action) => {
  switch (action.type) {
  case "ROUTER_THINGY":
    return action.data;
  default:
    return state;
  }
};

class Link extends Component {
  render() {
    const { children, className, pathname, to } = this.props;
    let routerTo;

    if (_.isString(to)) {
      routerTo = to;
    }
    else {
      routerTo = {
        pathname: to.pathname || pathname,
        params: to.p,
        query: to.q,
      };
    }

    return (
      <RouterLink to={routerTo} className={className}>{children}</RouterLink>
    );
  }
}

Link.propTypes = {
  to: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.shape({
      pathname: React.PropTypes.string,
      p: React.PropTypes.object,
      q: React.PropTypes.object,
    }),
  ]).isRequired,
};

Link = connect(Link);

export { connect, reducer, Link };
