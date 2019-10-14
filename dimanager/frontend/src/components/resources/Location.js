import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLocations } from "../../actions/resources";

export class Location extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    getLocations: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getLocations();
  }
  render() {
    return (
      <Fragment>
        <select>
          {this.props.locations.map(location => (
            <option key={location.id} value={location.location}>
              {location.location}
            </option>
          ))}
        </select>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations.locations
});

export default connect(
  mapStateToProps,
  { getLocations }
)(Location);
