import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav mr-auto mt-2 ml-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/dayview" className="nav-link">
            Day View
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/monthview" className="nav-link">
            Month View
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/resource-builder" className="nav-link">
            Resource Builder
          </Link>
        </li>
        <span className="nav-bar-text mr-sm-2 ">
          <em style={{ fontSize: 10 }}>
            {user ? `Welcome ${user.username}` : ""}
          </em>
          <sup>
            <a
              href="#"
              className="badge badge-pill badge-dark"
              onClick={this.props.logout}
            >
              Logout
            </a>
          </sup>
        </span>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/dayview" className="nav-link">
            Day View
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/monthview" className="nav-link">
            Month View
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Manager
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/dayview">
              DI Manager
            </Link>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Header);
