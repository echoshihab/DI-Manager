import React, { Component } from "react";
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
      <ul className="list-group">
        <li className="list-group-item">
          <form className="form-inline my-2 my-lg-0">
            Exam Types:
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="..add exam type"
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              +
            </button>
          </form>
        </li>
        {this.props.examTypes.map(examType => (
          <li className="list-group-item" key={examType.id}>
            {examType.exam_type}
            <button className="btn btn-outline-danger btn-sm">Delete</button>
          </li>
        ))}
      </ul>
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
