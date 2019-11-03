import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getExamTypes, addExamType } from "../../actions/shifts";

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
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="..add exam type"
            />
            <button
              className="btn btn-secondary btn-sm"
              onClick={this.props.addExamType}
            >
              <span style={style}>+</span>
            </button>
          </form>
        </li>
        {this.props.examTypes.map(examType => (
          <li className="list-group-item" key={examType.id}>
            {examType.exam_type}
            <a href="#" className="badge badge-danger ml-2">
              Delete
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  examTypes: state.examTypes.examTypes
});

const style = {
  fontSize: "30px"
};

export default connect(
  mapStateToProps,
  { getExamTypes, addExamType }
)(ExamTypes);
