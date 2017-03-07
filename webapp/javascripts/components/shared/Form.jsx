import React from "react";
import { Component } from "utils/react-extras.js";
import BaseForm from "components/Base/Form.jsx";

class Form extends Component {
  render() {
    const { children } = this.props;

    return (
      <BaseForm onSubmit={this._handleSubmit}>
        {children}
      </BaseForm>
    );
  }
  _handleSubmit() {
    const { form, action, onSubmit, onSuccess, onFailure } = this.props;

    if (!form.isSubmitting) {
      form.submit(onSubmit).then(onSuccess).catch(onFailure);
    }
  }
}

Form.propTypes = {
  form: React.PropTypes.shape({
    data: React.PropTypes.object.isRequired,
    isSubmitting: React.PropTypes.bool.isRequired,
    submit: React.PropTypes.func.isRequired,
  }),
  onSubmit: React.PropTypes.func.isRequired,
  onSuccess: React.PropTypes.func,
  onFailure: React.PropTypes.func,
};

export default Form;
export * from "components/Base/Form.jsx";
