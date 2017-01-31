import React from "react";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Form.less";

class Form extends Component {
  render() {
    const {
      action,
      children,
      classes,
      method,
      multipart,
    } = this.props;
    let encType;

    if (multipart) {
      encType = "multipart/form-data";
    }

    return (
      <form
        action={action}
        className={classes.form()}
        encType={encType}
        method={method}
        onSubmit={this._submit}>

        {children}
      </form>
    );
  }
  _submit(event) {
    const { onSubmit } = this.props;

    if (onSubmit) {
      event.preventDefault();
      onSubmit();
    }
  }
}

Form.propTypes = {
  action: React.PropTypes.string.isRequired,
  method: React.PropTypes.string.isRequired,
  multipart: React.PropTypes.bool,
  onSubmit: React.PropTypes.func,
};

Form = connectStyles(Form, styles);

class Fieldset extends Component {
  render() {
    const { classes, children, duo } = this.props;

    return (
      <div className={classes.fieldset({ duo: duo })}>
        {children}
      </div>
    );
  }
}

Fieldset.propTypes = {
  duo: React.PropTypes.bool,
};

Fieldset = connectStyles(Fieldset, styles);

class Note extends Component {
  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.note()}>
        {children}
      </div>
    );
  }
}

Note = connectStyles(Note, styles);

export { Fieldset, Note };
export default Form;
