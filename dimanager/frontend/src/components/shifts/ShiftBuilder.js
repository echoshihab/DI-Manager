import React, { Fragment, Component } from "react";
import ShiftTimeList from "./ShiftTimesList";
import ExamTypesList from "./ExamTypesList";
import LocationBuild from "../resources/LocationBuild";
import RoomBuild from "../resources/RoomBuild";
import BuilderDashboard from "../layout/BuilderDashboard";

export class ShiftBuilder extends Component {
  state = {
    locationBuilder: false,
    roomBuilder: false,
    shiftTimeBuilder: false,
    examTypeBuilder: false
  };

  handleComponentChange = e => {
    const {
      target: { name }
    } = e;
    Object.keys(this.state)
      .filter(key => key !== name)
      .map(key => this.setState({ [key]: false })); //set all other builder state to false
    this.setState({ [name]: !this.state[name] });
  };

  render() {
    const {
      locationBuilder,
      roomBuilder,
      shiftTimeBuilder,
      examTypeBuilder
    } = this.state;

    const shiftTimeComponent = shiftTimeBuilder ? <ShiftTimeList /> : null;
    const examTypeComponent = examTypeBuilder ? <ExamTypesList /> : null;
    const locationComponent = locationBuilder ? <LocationBuild /> : null;
    const roomComponent = roomBuilder ? <RoomBuild /> : null;

    return (
      <Fragment>
        <BuilderDashboard
          toggleComponent={this.handleComponentChange.bind(this)}
        />

        <div className="d-flex align-items-center flex-column justify-content-center h-100 mt-5">
          {shiftTimeComponent}
          {examTypeComponent}
          {locationComponent}
          {roomComponent}
        </div>
      </Fragment>
    );
  }
}

export default ShiftBuilder;
