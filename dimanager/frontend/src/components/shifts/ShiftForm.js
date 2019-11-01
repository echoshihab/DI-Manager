import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ShiftForm.css";

export class ShiftForm extends Component {
  state = {
    hour: 0,
    min: 0
  };

  handleSetTime() {}

  handleHourUp = () => {
    const copyState = { ...this.state };
    copyState.hour++;
    if (copyState.hour > 23) {
      copyState.hour = 0;
    }
    this.setState({ copyState });
  };

  handleHourDown = () => {
    hour--;
    if (hour < 0) {
      hour = 23;
    }
    this.handleSetTime();
  };

  handleMinuteUp = () => {
    minute++;
    if (minute > 59) {
      minute = 0;
      this.handleHourUp();
    }
    this.handleSetTime();
  };

  handleMinuteDown = () => {
    minute--;
    if (minute < 0) {
      minute = 59;
      this.handleHourDown();
    }
    this.handleSetTime();
  };

  handleHourChange = e => {
    this.setState({ hour: e.target.value });
  };

  handleMinChange = e => {
    this.setState({ min: e.target.value });
  };

  render() {
    const { hour, min } = this.state;
    return (
      <div className="time-picker" date-time="00:00">
        <div className="hour">
          <div className="hr-up" onClick={this.handleHourUp}></div>
          <input
            type="number"
            className="hr"
            value={hour}
            onChange={this.handleHourChange}
          />
          <div className="hr-down" onClick={this.handleHourDown}></div>
        </div>
        <div className="separator">:</div>
        <div className="minute">
          <div className="min-up" onClick={this.handleMinUp}></div>
          <input
            type="number"
            className="min"
            value={min}
            onChange={this.handleMinChange}
          />
          <div className="min-down" onClick={this.handleMinDown}></div>
        </div>
      </div>
    );
  }
}

export default ShiftForm;
