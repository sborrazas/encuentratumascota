import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import {
  Link as RouterLink,
  Router,
  browserHistory,
  createRoutes,
} from "react-router";
import { connect as reduxConnect } from "react-redux";
import matchRoutes from "react-router/lib/matchRoutes";

const UPDATE_ACTION = "ROUTE_UPDATE";

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
  case UPDATE_ACTION:
    return action.data;
  default:
    return state;
  }
};

class Link extends Component {
  render() {
    const { children, className, pathname, to } = this.props;
    const { routesMap } = this.context;
    let linkPathname = pathname;

    if (to.name) {
      linkPathname = routesMap[to.name].replace(/:(\w+)/g, (_, paramName) => {
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

Link.contextTypes = {
  routesMap: React.PropTypes.object.isRequired,
};

Link = connect(Link);

const dispatchUpdate = (routes, store) => (location) => {
  matchRoutes(routes, location, (error, state) => {
    store.dispatch({
      type: UPDATE_ACTION,
      data: {
        pathname: location.pathname,
        params: state.params || {},
        query: location.query,
      },
    });
  });
};

class Provider extends Component {
  getChildContext() {
    const { routesMap } = this.props;

    return {
      routesMap,
    };
  }
  render() {
    const { routes } = this.props;

    return (
      <Router history={browserHistory} routes={routes} />
    );
  }
  componentWillMount() {
    const { routes, store } = this.props;
    const dispatchLocationChange = dispatchUpdate(
      createRoutes(routes),
      store
    );

    browserHistory.listen(dispatchLocationChange);
    dispatchLocationChange(browserHistory.getCurrentLocation());
  }
}

Provider.childContextTypes = {
  routesMap: React.PropTypes.object,
};

Provider.propTypes = {
  routes: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired,
};

export { connect, reducer, Link, Provider };
