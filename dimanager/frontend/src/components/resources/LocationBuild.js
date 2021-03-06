import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getLocations,
  addLocation,
  deleteLocation
} from "../../actions/resources";

export class LocationBuild extends Component {
  state = {
    location: ""
  };

  static propTypes = {
    locations: PropTypes.array.isRequired,
    getLocations: PropTypes.func.isRequired
  };

  deleteLocation = (e, id) => {
    e.preventDefault();
    this.props.deleteLocation(id);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { location } = this.state;
    let userID = this.props.auth.user.id;
    this.props.addLocation(location, userID);
    this.setState({
      location: ""
    });
  };

  componentDidMount() {
    this.props.getLocations();
  }
  render() {
    return (
      <Fragment>
        <ul className="list-group">
          <li className="list-group-item">
            <form
              className="form-inline my-2 my-lg-0"
              onSubmit={this.onSubmit}
              autoComplete="off"
            >
              <input
                name="location"
                className="form-control mr-sm-2"
                type="text"
                maxLength="15"
                placeholder="..add new location"
                onChange={this.onChange}
                value={this.state.location}
              />
              <button className="btn btn-secondary btn-sm">
                <span style={style}>+</span>
              </button>
            </form>
          </li>
          {this.props.locations.map(location => (
            <li className="list-group-item" key={location.id}>
              {location.location}
              <a
                href="#"
                name={location.id}
                className="badge badge-danger ml-2"
                onClick={e => this.deleteLocation(e, location.id)}
              >
                Delete
              </a>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const style = {
  fontSize: "30px"
};

const mapStateToProps = state => ({
  locations: state.locations.locations,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getLocations,
  addLocation,
  deleteLocation
})(LocationBuild);
