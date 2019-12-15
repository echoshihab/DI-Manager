import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.initials)
        alert.error(`Initials: ${error.msg.initials.join()}`);
      if (error.msg.certs)
        alert.error(`Certifications: ${error.msg.certs.join()}`);
      if (error.msg.exam_type) alert.error(error.msg.exam_type.join());
      if (error.msg.location) alert.error(error.msg.location.join());
      if (error.msg.room) alert.error(error.msg.room.join());
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.username) alert.error(error.msg.username.join());
      if (error.msg.detail) alert.error(error.msg.detail);
    }

    if (message !== prevProps.message) {
      if (message.techDeleted) alert.success(message.techDeleted);
      if (message.techAdded) alert.success(message.techAdded);
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
