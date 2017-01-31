import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import styles from "styles/Uploader.less";
import Icon from "./Icon.jsx";

class UploaderItem extends Component {
  render() {
    const { addText, classes, id, name, value } = this.props;
    const inputEl = (
      <input
        type="file"
        className={classes.input()}
        id={id}
        name={name}
        ref="input"
        onChange={this._change} />
    );

    if (value) {
      return (
        <label className={classes.item()}>
          {inputEl}
          {value.name}
          <Icon
            className={classes.removeIcon()}
            name="minus"
            onClick={this._remove} />
        </label>
      );
    }
    else {
      return (
        <label className={classes.item({ add: true })}>
          {inputEl}

          <Icon name="plus" />

          {addText}
        </label>
      );
    }
  }
  _remove() {
    const { index, onRemove } = this.props;
    const { input } = this.refs;

    input.value = ""; // HACK: This removes the file from the input

    onRemove(index);
  }
  _change(event) {
    const { index, onChange } = this.props;
    const file = event.target.files[0];

    onChange(index, file);
  }
}

UploaderItem.propTypes = {
  addText: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  value: React.PropTypes.object,
};

UploaderItem = connectStyles(UploaderItem, styles);

class Uploader extends Component {
  render() {
    const {
      addText,
      classes,
      id,
      maxFiles,
      name,
      value,
    } = this.props;

    return (
      <div className={classes.uploader()}>
        {
          _.map(_.range(0, maxFiles), (index) => {
            return (
              <UploaderItem
                addText={addText}
                value={value[index]}
                index={index}
                id={`${id}_${index}`}
                name={`${name}[${index}]`}
                key={index}
                onRemove={this._remove}
                onChange={this._change} />
            );
          })
        }
      </div>
    );
  }
  _change(index, file) {
    const { value, onChange } = this.props;
    const newValue = _.slice(value);

    newValue[index] = file;

    onChange(newValue);
  }
  _remove(index) {
    const { value, onChange } = this.props;
    const newValue = _.slice(value);

    newValue[index] = null;

    onChange(newValue);
  }
}

Uploader.propTypes = {
  maxFiles: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
};

Uploader = connectStyles(Uploader, styles);

export default Uploader;
