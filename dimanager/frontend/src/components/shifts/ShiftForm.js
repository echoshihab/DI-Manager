import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import ShiftTimeList from "../shifts/ShiftTimesList";
import { buildShift } from "../../actions/shifts";
import "./ShiftForm.css";

export class ShiftForm extends Component {
  state = {
    startHour: "00",
    startMin: "00",
    endHour: "00",
    endMin: "00"
  };

  handleChange = e => {
    const {
      target: { name, value }
    } = event;
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
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="time-picker">
              <label htmlFor="start-time">Start Time:</label>
              <div className="hour">
                <input
                  type="text"
                  className="hr"
                  name="startHour"
                  value={startHour}
                  onChange={this.handleChange}
                  maxLength="2"
                />
              </div>
              <div className="separator">:</div>
              <div className="minute">
                <input
                  type="text"
                  className="min"
                  name="startMin"
                  value={startMin}
                  onChange={this.handleChange}
                  maxLength="2"
                />
              </div>
            </div>
            <button className="btn btn-outline-dark add">+</button>
            <div className="time-picker">
              <div>
                <label className="col-sm-2 col-form-label" htmlFor="start-time">
                  End Time:
                </label>
              </div>
              <div className="hour">
                <input
                  type="text"
                  className="hr"
                  name="endHour"
                  value={endHour}
                  onChange={this.handleChange}
                  maxLength="2"
                />
              </div>
              <div className="separator">:</div>
              <div className="minute">
                <input
                  type="text"
                  className="min"
                  name="endMin"
                  value={endMin}
                  onChange={this.handleChange}
                  maxLength="2"
                />
              </div>
            </div>
          </div>
        </form>
        <ShiftTimeList />
      </Fragment>
    );
  }
}

export default connect(
  null,
  { buildShift }
)(ShiftForm);
