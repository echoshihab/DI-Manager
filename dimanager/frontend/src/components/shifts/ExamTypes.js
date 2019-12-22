import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { getExamTypes } from "../../actions/shifts";

export class ExamTypes extends Component {
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

export default connect(mapStateToProps, { getExamTypes })(ExamTypes);
