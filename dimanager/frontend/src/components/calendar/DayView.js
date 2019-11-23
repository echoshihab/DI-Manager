import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteShift } from "../../actions/shifts";

export class DayView extends Component {
  static propTypes = {
    shifts: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Room</th>
              <th scope="col">Shift</th>
              <th scope="col">Technologist</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.shifts.map(item => (
              <tr key={item.id}>
                <td>{item.room.room}</td>
                <td>
                  <strong>{item.exam_type.exam_type}</strong>
                  {" " +
                    item.shift_time.start_time +
                    " - " +
                    item.shift_time.end_time}
                </td>
                <td>{item.tech.initials}</td>
                <td>
                  <button
                    href="#"
                    className="btn btn-primary btn-sm btn-danger"
                    onClick={() => this.props.deleteShift(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shifts: state.shifts.shifts
});

export default connect(mapStateToProps, { deleteShift })(DayView);
