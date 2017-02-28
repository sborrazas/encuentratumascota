import React, { Children } from "react";
import { Component } from "utils/react-extras.js";
import { connect as reduxConnect } from "react-redux";
import _ from "lodash";
import client from "./client.js";

const createEndpoint = (endpoint) => {
  return endpoint;
};

const getActionInfo = (endpoint, actionName, params, defaultOptions) => {
  const action = endpoint.actions[actionName];
  // TODO: Check if defined
  const {
    path,
    params: _params,
    types,
    ...actionOptions,
  } = action(params);
  const { method, ...options } = { ...defaultOptions, ...actionOptions };
  const requestParams = _.clone(_params);
  let { url } = endpoint;

  if (path) {
    url = `${url}${path}`;
  }

  if (options.baseUrl) {
    url = `${options.baseUrl}${url}`;
  }

  url = url.replace(/:(\w+)/, (__, key) => {
    const val = requestParams[key];

    _.unset(requestParams, [key]);

    return val;
  });

  return { url, method, types, requestParams, options };
};

const createApi = (endpoints, options = {}) => {
  const defaultOptions = {
    method: "GET",
    multipart: false,
    ...options,
  };

  class Api {
    constructor(dispatch) {
      _.forEach(endpoints, (_, name) => {
        this[name].dispatch = dispatch;
      });
    }
  }

  _.forEach(endpoints, (endpoint, name) => {
    Api.prototype[name] = _.reduce(endpoint.actions, (actions, _, name) => {
      actions[name] = function (params) {
        const {
          url,
          method,
          options,
          requestParams,
          types,
        } = getActionInfo(endpoint, name, params, defaultOptions);
        const [REQUEST_TYPE, SUCCESS_TYPE, FAIL_TYPE] = types;
        const dispatch = this.dispatch;

        const promise = client(method, url, requestParams, options)
          .then((data) => {
            dispatch({
              type: SUCCESS_TYPE,
              payload: {
                data,
                params,
              },
            });

            return data;
          })
          .catch((data) => {
            dispatch({
              type: FAIL_TYPE,
              payload: {
                data,
                params,
              },
            });

            throw data;
          });

        dispatch({
          type: REQUEST_TYPE,
          payload: {
            params,
          },
        });

        return promise;
      };
      actions[name].info = (params) => {
        return getActionInfo(endpoint, name, params, defaultOptions);
      };

      return actions;
    }, {});
  });

  return Api;
}

const mapSelectorsToProps = (selectors) => (state, params) => {
  return _.reduce(selectors, (result, selector, name) => {
    result[name] = selector(state, params);

    return result;
  }, {});
};

const connect = (WrappedComponent, selectors) => {
  const Container = reduxConnect(
    mapSelectorsToProps(selectors),
  )(WrappedComponent);

  class ApiWrapped extends Component {
    constructor(props, context) {
      super(props, context);

      const { api, store: { dispatch } } = context;

      this.api = new api(dispatch);
     }
    render() {
      return (
        <Container
          api={this.api}
          {...this.props} />
      );
    }
  };

  ApiWrapped.contextTypes = {
    api: React.PropTypes.func.isRequired,
    store: React.PropTypes.shape({
      dispatch: React.PropTypes.func.isRequired,
    }).isRequired,
  };

  ApiWrapped.displayName = `ConnectApi(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ApiWrapped;
};

class Provider extends Component {
  getChildContext() {
    const { api } = this.props;

    return { api };
  }
  render() {
    return Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  api: React.PropTypes.func.isRequired,
};

Provider.propTypes = {
  api: React.PropTypes.func.isRequired,
};

export { connect, createApi, createEndpoint, Provider };
