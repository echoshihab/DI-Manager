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
        <label htmlFor="start-time">Start Time</label>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control mr-sm-2"
              name="startHour"
              value={startHour}
              onChange={this.handleChange}
              maxLength="2"
            />
          </div>
          <strong>:</strong>
          <div className="col">
            <input
              type="text"
              className="form-control mr-sm-2"
              name="startMin"
              value={startMin}
              onChange={this.handleChange}
              maxLength="2"
            />
          </div>
        </div>

        <label htmlFor="end-time" className="mt-1">
          End Time
        </label>
        <div className="form-row ">
          <div className="col">
            <input
              type="text"
              className="form-control mr-sm-2"
              name="endHour"
              value={endHour}
              onChange={this.handleChange}
              maxLength="2"
            />
          </div>

          <strong className="separator">:</strong>
          <div className="col">
            <input
              type="text"
              className="form-control mr-sm-2"
              name="endMin"
              value={endMin}
              onChange={this.handleChange}
              maxLength="2"
            />
          </div>
        </div>
        <div className="form-row">
          <button className="btn btn-secondary btn-sm btn-block mt-1">
            <span style={style}>+</span>
          </button>
        </div>
      </form>
    );
  }
}

const style = {
  fontSize: "30px"
};

export default connect(null, { buildShift })(ShiftFormAdd);
