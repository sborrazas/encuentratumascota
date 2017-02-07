import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import { Link as RouterLink, browserHistory } from "react-router";
import { connect as reduxConnect } from "react-redux";
import { routes } from "components/routes/AppRouter.jsx";

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
    let linkPathname = pathname;

    if (to.name) {
      linkPathname = routes[to.name].replace(/:(\w+)/g, (_, paramName) => {
        return to.p[paramName];
      });
    }

    return (
      <RouterLink
        className={className}
        to={{ pathname: linkPathname, query: to.q }}>

        {children}
      </RouterLink>
    );
  }
}

Link.propTypes = {
  to: React.PropTypes.shape({
    name: React.PropTypes.string,
    p: React.PropTypes.object,
    q: React.PropTypes.object,
  }).isRequired,
};

Link = connect(Link);

export { connect, reducer, Link };
