import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getShiftTimes } from "../../actions/shifts";

export class ShiftTimes extends Component {
  static propTypes = {
    shiftTimes: PropTypes.array.isRequired,
    getShiftTimes: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getShiftTimes();
  }
  render() {
    return (
      <Fragment>
        <select className="form-control" name="shiftTime">
          {this.props.shiftTimes.map(shiftTime => (
            <option key={shiftTime.id} value={shiftTime.id}>
              {shiftTime.start_time.slice(0, -3) +
                "-" +
                shiftTime.end_time.slice(0, -3)}
            </option>
          ))}
        </select>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  shiftTimes: state.shiftTimes.shiftTimes
});

export default connect(
  mapStateToProps,
  { getShiftTimes }
)(ShiftTimes);
