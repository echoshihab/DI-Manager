import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getLocations,
  getRooms,
  deleteRoom,
  addRoom
} from "../../actions/resources";

export class RoomBuild extends Component {
  state = {
    room: false,
    locationID: "",
    roomName: ""
  };

  static propTypes = {
    locations: PropTypes.array.isRequired,
    getLocations: PropTypes.func.isRequired
  };

  deleteRoom = (e, id) => {
    e.preventDefault();
    this.props.deleteRoom(id);
  };

  handleRooms = e => {
    this.props.getRooms(e.target.value);
    this.setState({ room: true, locationID: e.target.value });
  };

  onRoomChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { roomName, locationID } = this.state;
    console.log(roomName, locationID);
    this.props.addRoom(roomName, locationID);
    this.setState({
      roomName: ""
    });
  };

  componentDidMount() {
    this.props.getLocations();
  }
  render() {
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
              onChange={this.handleRooms}
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
          </li>

          {this.state.room ? (
            <Fragment>
              <li className="list-group-item">
                <input
                  name="roomName"
                  className="form-control mr-sm-2"
                  maxLength="15"
                  type="text"
                  placeholder="..add new room"
                  onChange={this.onRoomChange}
                  value={this.state.roomName}
                />
                <button className="btn btn-secondary btn-sm">
                  <span style={style}>+</span>
                </button>
              </li>
              {this.props.rooms.map(room => (
                <li className="list-group-item" key={room.id}>
                  {room.room}
                  <a
                    href="#"
                    name={room.id}
                    className="badge badge-danger ml-2"
                    onClick={e => this.deleteRoom(e, room.id)}
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

const style = {
  fontSize: "30px"
};

const mapStateToProps = state => ({
  locations: state.locations.locations,
  rooms: state.rooms.rooms
});

export default connect(mapStateToProps, {
  getLocations,
  getRooms,
  deleteRoom,
  addRoom
})(RoomBuild);
