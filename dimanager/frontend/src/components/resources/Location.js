import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLocations, getRooms } from "../../actions/resources";

export class Location extends Component {
  state = {
    test: false
  };

  static propTypes = {
    locations: PropTypes.array.isRequired,
    getLocations: PropTypes.func.isRequired
  };

  listRooms = e => {
    this.props.getRooms(e.target.value);
    this.setState({ test: true });
  };

  componentDidMount() {
    this.props.getLocations();
  }
  render() {
    return (
      <Fragment>
        <select defaultValue={"default"} onChange={this.listRooms}>
          <option hidden disabled value="default">
            Select Location
          </option>
          {this.props.locations.map(location => (
            <option key={location.id} value={location.location}>
              {location.location}
            </option>
          ))}
        </select>
        {this.state.test ? (
          <select>
            {this.props.rooms.map(room => (
              <option key={room.id} value={room.room}>
                {room.room}
              </option>
            ))}
          </select>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations.locations,
  rooms: state.rooms.rooms
});

export default connect(
  mapStateToProps,
  { getLocations, getRooms }
)(Location);
