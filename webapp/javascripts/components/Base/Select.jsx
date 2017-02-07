import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import date from "utils/date.js";
import styles from "styles/Select.less";
import Icon from "./Icon.jsx";

class SelectOption extends Component {
  render() {
    const { classes, label, selected } = this.props;
    const className = classes.option({
      selected,
    });

    return (
      <div className={className} onClick={this._selected}>
        {label}
      </div>
    );
  }
  _selected(event) {
    const { onSelect, value } = this.props;
    event.preventDefault();

    onSelect(value);
  }
}

SelectOption = connectStyles(SelectOption, styles);

SelectOption.propTypes = {
  label: React.PropTypes.string.isRequired,
  selected: React.PropTypes.bool.isRequired,
  value: React.PropTypes.any.isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }
  render() {
    const {
      classes,
      className: inputClassName,
      id,
      invalid,
      name,
      options,
      value
    } = this.props;
    const { expanded } = this.state;
    const optionsEls = [];
    const rawOptionsEls = [];
    const className = classes.select({
      expanded,
    }, inputClassName);
    const togglerClassName = classes.toggler({
      invalid,
    });
    let selectedOption;

    if (options.length === 0) {
      return (
        <div className={className}>
          <div className={togglerClassName}>
            &nbsp;
          </div>
        </div>
      );
    }

    _.forEach(options, ({ label: opLabel, value: opValue }) => {
      const labelStr = opLabel || opValue;
      const selected = opValue === value;

      if (selected) {
        selectedOption = { label: labelStr, value: opValue };
      }

      optionsEls.push(
        <SelectOption
          value={opValue}
          label={labelStr}
          selected={selected}
          onSelect={this._selectOption}
          key={opValue} />
      );

      rawOptionsEls.push(
        <option key={opValue} value={opValue}>
          {labelStr}
        </option>
      );
    });

    return (
      <div className={className}>
        <div className={togglerClassName} onClick={this._toggleExpand}>
          {selectedOption.label}
          <Icon className={classes.caret()} name="caret" />
        </div>
        <div className={classes.options()}>{optionsEls}</div>
        <select
          id={id}
          name={name}
          onChange={this._selectRawOption}
          value={value}
          className={classes.raw()}>

          {rawOptionsEls}
        </select>
      </div>
    );
  }
  _toggleExpand(event) {
    this.setState({ expanded: !this.state.expanded });
  }
  _selectOption(value) {
    this.setState({ expanded: false });
    this.props.onChange(value);
  }
  _selectRawOption(event) {
    this._selectOption(event.target.value);
  }
}

Select.propTypes = {
  className: React.PropTypes.string,
  id: React.PropTypes.string,
  invalid: React.PropTypes.bool,
  name: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onChange: React.PropTypes.func,
  value: React.PropTypes.any.isRequired,
};

Select = connectStyles(Select, styles);

export default Select;
