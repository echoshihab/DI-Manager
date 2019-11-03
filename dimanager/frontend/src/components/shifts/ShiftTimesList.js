import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getShiftTimes, deleteShiftTime } from "../../actions/shifts";
import ShiftFormAdd from "./ShiftFormAdd";

export class ShiftTimesList extends Component {
  static propTypes = {
    shiftTimes: PropTypes.array.isRequired,
    getShiftTimes: PropTypes.func.isRequired,
    deleteShiftTime: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getShiftTimes();
  }

  render() {
    return (
      <ul className="list-group">
        <ShiftFormAdd />
        {this.props.shiftTimes.map(shiftTime => (
          <li className="list-group-item" key={shiftTime.id}>
            {shiftTime.start_time.slice(0, -3) +
              " - " +
              shiftTime.end_time.slice(0, -3)}
            <button
              onClick={this.props.deleteShiftTime.bind(this, shiftTime.id)}
              className="btn btn-outline-danger btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  shiftTimes: state.shiftTimes.shiftTimes
});

export default connect(
  mapStateToProps,
  { getShiftTimes, deleteShiftTime }
)(ShiftTimesList);
