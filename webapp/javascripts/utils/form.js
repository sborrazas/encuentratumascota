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
          isSubmitting: false,
          data: formSpec.initial || {},
          errors: {},
          update: this._update(formName),
          updateAll: this._updateAll(formName),
          submit: this._submit(formName),
        };
      });
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state} />
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
    _submit(formName) {
      return (onSubmit) => {
        const oldForm = this.state[formName];
        const newForm = _.assign({}, oldForm, {
          errors: {},
          isSubmitting: true,
        });

        return onSubmit(oldForm.data)
          .then((data) => {
            this._endSubmit(formName);

            return data;
          })
          .catch(({ errors }) => {
            this._setErrors(formName, errors);

            throw errors;
          });

        this.setState({ [formName]: newForm });
      };
    }
    _endSubmit(formName) {
      const newForm = _.assign({}, this.state[formName], {
        isSubmitting: false,
      });

      this.setState({ [formName]: newForm });
    }
    _setErrors(formName, errors) {
      const newForm = _.assign({}, this.state[formName], {
        errors,
        isSubmitting: false,
      });

      this.setState({ [formName]: newForm });
    }
  }

  return Wrapper;
};

export { connect };
