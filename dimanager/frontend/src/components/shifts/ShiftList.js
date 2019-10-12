import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getExamTypes } from "../../actions/shifts";

export class ShiftList extends Component {
  static propTypes = {
    examTypes: PropTypes.array.isRequired,
    getExamTypes: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getExamTypes();
  }
  render() {
    return (
      <Fragment>
        <select>
          {this.props.examTypes.map(examType => (
            <option key={examType.id} value={examType.exam_type}>
              {examType.exam_type}
            </option>
          ))}
        </select>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  examTypes: state.examTypes.examTypes
});

export default connect(
  mapStateToProps,
  { getExamTypes }
)(ShiftList);
