import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class DayView extends Component {
  static propTypes = {
    dayview: PropTypes.array.isRequired
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
            </tr>
          </thead>
          <tbody>
            {this.props.dayview.map(item => (
              <tr key={item.id}>
                <td>{item.room}</td>
                <td>
                  <strong>{item.exam_type}</strong>
                  {" " +
                    item.shift_time.start_time +
                    " - " +
                    item.shift_time.end_time}
                </td>
                <td>{item.tech}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dayview: state.dayview.dayview
});

export default connect(
  mapStateToProps,
  null
)(DayView);
