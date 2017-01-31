import React from "react";
import { Component } from "utils/react-extras.js";
import BaseForm from "components/Base/Form.jsx";

class Form extends Component {
  render() {
    const { action, children } = this.props;

    return (
      <BaseForm
        action={action.url}
        method={action.method}
        multipart={action.multipart}
        onSubmit={this._handleSubmit}>

        {children}
      </BaseForm>
    );
  }
  _handleSubmit() {
    const { form, action, onSubmit, onSuccess, onFailure } = this.props;

    if (!form.submitting) {
      if (onSubmit) {
        onSubmit();
      }
      else {
        const { data } = form;

        action.submit(data).then(onSuccess).catch((errors) => {
          form.setErrors(errors);
          if (onFailure) {
            onFailure(errors);
          }
        });
      }
    }
  }
}

Form.propTypes = {
  form: React.PropTypes.shape({
    onSubmit: React.PropTypes.func,
  }),
  action: React.PropTypes.shape({
    url: React.PropTypes.string.isRequired,
    method: React.PropTypes.string.isRequired,
    multipart: React.PropTypes.bool,
  }).isRequired,
  onSubmit: React.PropTypes.func,
  onSuccess: React.PropTypes.func,
  onFailure: React.PropTypes.func,
};

export default Form;
export * from "components/Base/Form.jsx";
