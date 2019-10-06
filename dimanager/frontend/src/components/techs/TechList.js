import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTechs } from "../../actions/techs";

export class TechList extends Component {
  static propTypes = {
    techs: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getTechs();
  }
  render() {
    return (
      <Fragment>
        <h1>Techologist List</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Initials</th>
              <th>Certs</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {this.props.techs.map(tech => (
              <tr key={tech.id}>
                <td>{tech.id}</td>
                <td>{tech.name}</td>
                <td>{tech.initials}</td>
                <td>{tech.certs}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  techs: state.techsReducer.techs
});

export default connect(
  mapStateToProps,
  { getTechs }
)(TechList);
