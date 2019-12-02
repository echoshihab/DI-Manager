import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLocations, getRooms } from "../../actions/resources";

export class Location extends Component {
  state = {
    room: false
  };

  static propTypes = {
    locations: PropTypes.array.isRequired,
    getLocations: PropTypes.func.isRequired
  };

  listRooms = e => {
    this.props.getRooms(e.target.value); //rooms are rendered calenderform
    this.setState({ room: true }, function() {
      this.props.onLocationSelect(this.state.room);
    });
  };

  componentDidMount() {
    this.props.getLocations();
  }
  render() {
    return (
      <Fragment>
        <select
          className="form-control"
          defaultValue={"default"}
          onChange={this.listRooms}
          name="location"
        >
          <option hidden disabled value="default">
            Select Location
          </option>
          {this.props.locations.map(location => (
            <option key={location.id} value={location.id}>
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

export default connect(mapStateToProps, { getLocations, getRooms })(Location);
