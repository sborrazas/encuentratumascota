import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Field.less";
import Select from "./Select.jsx";
import Datepicker from "./Datepicker.jsx";
import Uploader from "./Uploader.jsx";

class Field extends Component {
  render() {
    const {
      classes,
      errors,
      id,
      label,
      name,
      required,
      type,
      value,
      ...rest,
    } = this.props;
    const invalid = errors.length > 0;
    const className = classes.field({
      invalid,
    });
    let inputEl;

    switch (type) {
    case "select":
      inputEl = (
        <Select
          id={id}
          invalid={invalid}
          name={name}
          onChange={this._changeValue}
          value={value}
          {...rest} />
      );
      break;
    case "uploader":
      inputEl = (
        <Uploader
          id={id}
          invalid={invalid}
          name={name}
          onChange={this._changeValue}
          value={value}
          {...rest} />
      );
      break;
    case "date":
      inputEl = (
        <Datepicker
          id={id}
          invalid={invalid}
          name={name}
          onChange={this._changeValue}
          value={value}
          {...rest} />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          type={type}
          name={this.props.name}
          id={this.props.id}
          value={this.props.value}
          className={classes.input()}
          onChange={this._change}
          autoFocus={this.props.autoFocus}
          placeholder={this.props.placeholder} />
      );
      break;
    default:
      inputEl = (
        <input type={type} name={this.props.name} id={this.props.id}
               value={this.props.value} className={classes.input()}
               onChange={this._change} autoFocus={this.props.autoFocus}
               placeholder={this.props.placeholder} />
      );
      break;
    }

    return (
      <div className={className}>
        <label htmlFor={id} className={classes.label()}>
          {label}
          {
            required &&
              (<span>*</span>)
          }
        </label>
        {inputEl}
        {
          invalid &&
            (
              <ul className={classes.errors()}>
                {
                  _.map(errors, (error) => {
                    return (
                      <li className={classes.error()} key={error}>
                        {error}
                      </li>
                    );
                  })
                }
              </ul>
            )
        }
      </div>
    );
  }
  _change(event) {
    this._changeValue(event.target.value);
  }
  _changeValue(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
}

Field.propTypes = {
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf([
    "date",
    "select",
    "password",
    "text",
    "textarea",
    "uploader",
  ]).isRequired,
  autoFocus: React.PropTypes.bool,
  errors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  required: React.PropTypes.bool,
  value: React.PropTypes.any.isRequired,
};

Field = connectStyles(Field, styles);

class Side extends Component {
  render() {
    return (
      <div className="field-side">{this.props.children}</div>
    );
  }
}

export default Field;
export { Side };
