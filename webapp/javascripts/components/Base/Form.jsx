import React from "react";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Form.less";

class Form extends Component {
  render() {
    const {
      children,
      classes,
    } = this.props;
    let encType;

    return (
      <form
        className={classes.form()}
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
