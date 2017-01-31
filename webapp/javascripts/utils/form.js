import React from "react";
import { Component } from "utils/react-extras.js";
import _ from "lodash";

const connect = (WrappedComponent, specs) => {
  class Wrapper extends Component {
    constructor(props) {
      super(props);

      this.state = _.mapValues(specs, (formSpec, formName) => {
        return {
          name: formName,
          state: "initialized",
          data: formSpec.initial || {},
          errors: {},
        };
      });
    }
    render() {
      const formProps = _.mapValues(this.state, (formState, formName) => {
        return {
          update: this._update(formName),
          updateAll: this._updateAll(formName),
          setErrors: this._setErrors(formName),
          ...formState
        };
      });

      return (
        <WrappedComponent
          {...this.props}
          {...formProps}
          />
      );
    }
    _update(formName) {
      return (fieldName) => (fieldValue) => {
        const oldForm = this.state[formName];
        const newForm = _.assign({}, oldForm, {
          data: _.assign({}, oldForm.data, {
            [fieldName]: fieldValue,
          }),
          errors: _.omit(oldForm.errors, fieldName),
        });

        this.setState({ [formName]: newForm });
      };
    }
    _updateAll(formName) {
      return (values) => {
        const oldForm = this.state[formName];
        const newForm = _.assign({}, oldForm, {
          data: _.assign({}, oldForm.data, values),
          errors: _.omit(oldForm.errors, _.keys(values)),
        });

        this.setState({ [formName]: newForm });
      };
    }
    _setErrors(formName) {
      return (errors) => {
        const newForm = _.assign({}, this.state[formName], { errors });

        this.setState({ [formName]: newForm });
      };
    }
  }

  return Wrapper;
};

export { connect };
