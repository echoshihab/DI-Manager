import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTech } from "../../actions/techs";

export class TechForm extends Component {
  state = {
    name: "",
    initials: "",
    certs: ""
  };
  static propTypes = {
    addTech: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name, initials, certs } = this.state;
    const tech = { name, initials, certs };
    this.props.addTech(tech);
  };

  render() {
    const { name, initials, certs } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Technologist</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Initials </label>
            <input
              className="form-control"
              type="text"
              name="initials"
              onChange={this.onChange}
              value={initials}
            />
          </div>
          <div className="form-group">
            <label>Certifications</label>
            <textarea
              className="form-control"
              type="text"
              name="certs"
              onChange={this.onChange}
              value={certs}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addTech }
)(TechForm);
