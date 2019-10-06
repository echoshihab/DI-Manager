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
    }

    if (message !== prevProps.message) {
      if (message.techDeleted) alert.success(message.techDeleted);
      if (message.techAdded) alert.success(message.techAdded);
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