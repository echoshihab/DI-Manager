import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getExamTypes,
  addExamType,
  deleteExamType
} from "../../actions/shifts";

export class ExamTypes extends Component {
  state = {
    examType: ""
  };

  static propTypes = {
    examTypes: PropTypes.array.isRequired,
    getExamTypes: PropTypes.func.isRequired
  };

  deleteExamType = (e, id) => {
    e.preventDefault();
    this.props.deleteExamType(id);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { examType } = this.state;
    this.props.addExamType(examType);
    this.setState({
      examType: ""
    });
  };

  componentDidMount() {
    this.props.getExamTypes();
  }
  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={this.onSubmit}
            autoComplete="off"
          >
            <input
              name="examType"
              className="form-control mr-sm-2"
              maxLength="15"
              type="text"
              placeholder="..add exam type"
              onChange={this.onChange}
              value={this.state.examType}
            />
            <button className="btn btn-secondary btn-sm">
              <span style={style}>+</span>
            </button>
          </form>
        </li>
        {this.props.examTypes.map(examType => (
          <li className="list-group-item" key={examType.id}>
            {examType.exam_type}
            <a
              href="#"
              name={examType.id}
              className="badge badge-danger ml-2"
              onClick={e => this.deleteExamType(e, examType.id)}
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
  examTypes: state.examTypes.examTypes
});

const style = {
  fontSize: "30px"
};

export default connect(mapStateToProps, {
  getExamTypes,
  addExamType,
  deleteExamType
})(ExamTypes);
