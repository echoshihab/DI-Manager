import React, { Component } from "react";
import { connect } from "react-redux";
import { buildShift } from "../../actions/shifts";

export class ShiftFormAdd extends Component {
  state = {
    startHour: "00",
    startMin: "00",
    endHour: "00",
    endMin: "00"
  };

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { startHour, startMin, endHour, endMin } = e.target;
    const startTime = startHour.value + ":" + startMin.value;
    const endTime = endHour.value + ":" + endMin.value;

    this.props.buildShift(startTime, endTime);
  };

  render() {
    const { startHour, startMin, endHour, endMin } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <label htmlFor="start-time">Start Time:</label>
          <input
            type="text"
            className="hr"
            name="startHour"
            value={startHour}
            onChange={this.handleChange}
            maxLength="2"
          />
          <div className="separator">:</div>
          <input
            type="text"
            className="min"
            name="startMin"
            value={startMin}
            onChange={this.handleChange}
            maxLength="2"
          />
        </div>

        <button className="btn btn-outline-dark add">+</button>
        <label className="col-sm-2 col-form-label" htmlFor="end-time">
          End Time:
        </label>
        <div className="form-row">
          <input
            type="text"
            className="hr"
            name="endHour"
            value={endHour}
            onChange={this.handleChange}
            maxLength="2"
          />

          <div className="separator">:</div>

          <input
            type="text"
            className="min"
            name="endMin"
            value={endMin}
            onChange={this.handleChange}
            maxLength="2"
          />
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  { buildShift }
)(ShiftFormAdd);
