import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTechs } from "../../actions/techs";

export class TechListView extends Component {
  static propTypes = {
    techs: PropTypes.array.isRequired,
    getTechs: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getTechs();
  }
  render() {
    return (
      <Fragment>
        <select className="form-control" name="tech">
          {this.props.techs.map(tech => (
            <option key={tech.id} value={tech.id}>
              {tech.name}
            </option>
          ))}
        </select>
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
)(TechListView);
