import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getExamTypes } from "../../actions/shifts";

export class ExamTypes extends Component {
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
        <select className="form-control" name="examType">
          {this.props.examTypes.map(examType => (
            <option key={examType.id} value={examType.id}>
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
)(ExamTypes);
