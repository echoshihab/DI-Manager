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

  deleteShiftTime = (e, id) => {
    e.preventDefault();
    this.props.deleteShiftTime(id);
  };

  componentDidMount() {
    this.props.getShiftTimes();
  }

  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <ShiftFormAdd />
        </li>
        {this.props.shiftTimes.map(shiftTime => (
          <li className="list-group-item" key={shiftTime.id}>
            {shiftTime.start_time.slice(0, -3) +
              " - " +
              shiftTime.end_time.slice(0, -3)}

            <a
              href="#"
              className="badge badge-danger ml-2"
              onClick={e => this.deleteShiftTime(e, shiftTime.id)}
            >
              Delete
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  shiftTimes: state.shiftTimes.shiftTimes
});

export default connect(mapStateToProps, { getShiftTimes, deleteShiftTime })(
  ShiftTimesList
);
