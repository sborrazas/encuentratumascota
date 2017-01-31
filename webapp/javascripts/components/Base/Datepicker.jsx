import React from "react";
import _ from "lodash";
import { Component } from "utils/react-extras.js";
import { connect as connectStyles } from "utils/styles.js";
import date from "utils/date.js";
import styles from "styles/Datepicker.less";
import Select from "./Select.jsx";

const YEAR_RANGE_DOWN = 20;
const TODAY_YEAR = date.year(date.now());

const DAYS = _.range(1, 32).map((day) => {
  if (day < 10) {
    day = "0" + day;
  }

  return { value: day.toString() };
});
DAYS.unshift({ label: "DD", value: "" });

const MONTHS = _.range(1, 13).map((month) => {
  if (month < 10) {
    month = "0" + month;
  }

  return { value: month.toString() };
});
MONTHS.unshift({ label: "MM", value: "" });

const YEARS = _.range(TODAY_YEAR, TODAY_YEAR - YEAR_RANGE_DOWN).map((year) => {
  return { value: year.toString() };
});
YEARS.unshift({ label: "YYYY", value: "" });

class Datepicker extends Component {
  render() {
    const { classes, id, value, invalid } = this.props;
    const [year="", month="", day=""] = value.split("-");

    // TODO: add hidden input with full value for compatibility

    return (
      <div className={classes.datepicker()}>
        <Select
          options={DAYS}
          value={day}
          onChange={this._changeDay}
          className={classes.input()}
          invalid={invalid} />
        <Select
          options={MONTHS}
          value={month}
          onChange={this._changeMonth}
          className={classes.input()}
          invalid={invalid} />
        <Select
          options={YEARS}
          value={year}
          onChange={this._changeYear}
          className={classes.input()}
          invalid={invalid} />
      </div>
    );
  }
  _changeYear(year) {
    this._changeSlice(0, year);
  }
  _changeMonth(month) {
    this._changeSlice(1, month);
  }
  _changeDay(day) {
    this._changeSlice(2, day);
  }
  _changeSlice(index, sliceValue) {
    const { onChange, value } = this.props;
    const slices = value.split("-");

    slices[index] = sliceValue;

    onChange(slices.join("-"));
  }
}

Datepicker.propTypes = {
  className: React.PropTypes.string,
  invalid: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  value: React.PropTypes.string.isRequired,
};

Datepicker = connectStyles(Datepicker, styles);

export default Datepicker;
