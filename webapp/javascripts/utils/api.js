import React from "react";
import shallowEqual from "fbjs/lib/shallowEqual";
import { Component } from "utils/react-extras.js";
import { connect as reduxConnect } from "react-redux";
import _ from "lodash";
import client from "./client.js";
import document from "./dom/document.js";

const RESOURCES_SPEC_PROP_NAME = "_resources";
const DEFAULT_RESOURCE_STATE = {
  state: "uninitialized",
  data: {},
};

const CSRF_TOKEN = document.getElementsByName("csrf-token")[0].content;
const DEFAULT_HEADERS = {
  "X-Csrf-Token": CSRF_TOKEN,
};

const mapStateToProps = (state, ownProps) => {
  const props = {};

  _.forEach(ownProps[RESOURCES_SPEC_PROP_NAME], (resourceConfig, propName) => {
    const uri = resourceConfig.uri;

    props[propName] = state.api[uri] || DEFAULT_RESOURCE_STATE;
  });

  return props;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const props = {};

  _.forEach(ownProps[RESOURCES_SPEC_PROP_NAME], (resourceConfig, propName) => {
    const uri = resourceConfig.uri;

    props[propName] = _.mapValues(resourceConfig.actions, (action) => {
      const {
        types: [REQUEST_TYPE, SUCCESS_TYPE, FAIL_TYPE],
        url,
        method,
        multipart,
      } = action;
      const methodLowerCase = method ? method.toLowerCase() : "get";

      return {
        uri,
        url,
        method,
        submit: (params) => {
          dispatch((dispatch, getState) => {
            const resource = getState().api[uri];

            if (resource && resource.state === "fetching") {
              return;
            }

            const promise = client[methodLowerCase](url, params, {
              headers: DEFAULT_HEADERS,
              multipart,
            })
            .then((data) => {
              dispatch({
                type: SUCCESS_TYPE,
                payload: {
                  data,
                  uri,
                },
              });
              return data;
            })
            .catch((data) => {
              const errors = data.errors;

              dispatch({
                type: FAIL_TYPE,
                payload: {
                  uri,
                  errors,
                },
              });

              throw errors;
            });
            dispatch({
              type: REQUEST_TYPE,
              payload: {
                uri,
                params,
              },
            });

            return promise;
          });
        },
      };
    });
  });

  return props;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const props = _.omit(ownProps, RESOURCES_SPEC_PROP_NAME);

  _.forEach(ownProps[RESOURCES_SPEC_PROP_NAME], (actionConfig, propName) => {
    props[propName] = _.assign(
      {},
      stateProps[propName],
      dispatchProps[propName]
    );
  });

  return props;
};

const connect = (WrappedComponent, config) => {
  class ApiInnerWrapper extends Component {
    componentDidMount() {
      this._checkFetched();
    }
    componentDidUpdate() {
      this._checkFetched();
    }
    render() {
      return (<WrappedComponent {...this.props} />);
    }
    _checkFetched() {
      _.forEach(config, (resourceConfig, propName) => {
        const resource = this.props[propName];

        if (resourceConfig.autoFetch && resource.state === "uninitialized") {
          resource.fetch.submit({});
        }
      });
    }
  }

  const Container = reduxConnect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(ApiInnerWrapper);

  class ApiOuterWrapper extends Component {
    constructor(props) {
      super(props);
      this.state = {};

      _.forEach(config, (resourceConfig, propName) => {
        let variables = {};

        if (_.isFunction(resourceConfig.variables)) {
          variables = resourceConfig.variables(this.props);
        }

        const uri = resourceConfig.uri(variables);
        const actions = _.mapValues(resourceConfig.actions, (actionFn) => {
          return actionFn(uri);
        });

        this.state[propName] = {
          actions,
          uri,
          variables,
        };
      });
    }
    componentWillReceiveProps(nextProps) {
      const stateUpdate = {};

      _.forEach(config, (resourceConfig, propName) => {
        let newVariables = {};

        if (_.isFunction(resourceConfig.variables)) {
          newVariables = resourceConfig.variables(nextProps);
        }

        if (!shallowEqual(this.state[propName].variables, newVariables)) {
          const uri = resourceConfig.uri(newVariables);
          const actions = _.mapValues(resourceConfig.actions, (actionFn) => {
            return actionFn(uri);
          });

          stateUpdate[propName] = {
            uri: uri,
            actions: actions,
            variables: newVariables,
          };
        }
      });

      this.setState(stateUpdate);
    }
    render() {
      const containerProps = {
        [RESOURCES_SPEC_PROP_NAME]: this.state,
      };

      return (
        <Container
          {...this.props}
          {...containerProps}
          setVariables={this._setVariables} />
      );
    }
    _setVariables(propName, variables) {
      this.setState({
        [propName]: variables,
      });
    }
  }

  return ApiOuterWrapper;
};

export { connect };
