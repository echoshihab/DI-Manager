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
        {this.props.dayview.map(item => (
          <h1 key={item.id}>
            {item.date_of_shift +
              ":" +
              item.room +
              " " +
              item.exam_type +
              " " +
              item.shift_time.start_time +
              " - " +
              item.shift_time.end_time}
          </h1>
        ))}
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
