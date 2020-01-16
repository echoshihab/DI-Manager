import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
  getExamTypes,
  addExamType,
  deleteExamType,
  getModalities
} from "../../actions/shifts";

export class ExamTypes extends Component {
  state = {
    typeFlag: false,
    modalityID: "",
    examType: ""
  };

  handleTypes = e => {
    this.props.getExamTypes(e.target.value);

    this.setState({ typeFlag: true, modalityID: e.target.value });
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
    const { examType, modalityID } = this.state;
    this.props.addExamType(examType, modalityID);
    this.setState({
      examType: ""
    });
  };

  componentDidMount() {
    this.props.getModalities();
  }

  render() {
    const { user } = this.props.auth;

    return (
      <form
        className="form-inline my-2 my-lg-0"
        onSubmit={this.onSubmit}
        autoComplete="off"
      >
        <ul className="list-group">
          <li className="list-group-item">
            <select
              className="form-control"
              defaultValue={"default"}
              onChange={this.handleTypes}
              name="location"
            >
              <option hidden disabled value="default">
                Select Modality
              </option>
              {this.props.modalities
                .filter(modality =>
                  user.modalities.some(mod => mod.id == modality.id)
                )
                .map(modality => (
                  <option key={modality.id} value={modality.id}>
                    {modality.modality}
                  </option>
                ))}
            </select>
          </li>

          {this.state.typeFlag ? (
            <Fragment>
              <li className="list-group-item">
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
            </Fragment>
          ) : null}
        </ul>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  modalities: state.modalities.modalities,
  examTypes: state.examTypes.examTypes,
  auth: state.auth
});

const style = {
  fontSize: "30px"
};

export default connect(mapStateToProps, {
  getExamTypes,
  addExamType,
  deleteExamType,
  getModalities
})(ExamTypes);
