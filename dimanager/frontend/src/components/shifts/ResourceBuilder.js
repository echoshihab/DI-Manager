import React, { Fragment, Component } from "react";
import ShiftTimeList from "./ShiftTimesList";
import ExamTypesList from "./ExamTypesList";
import LocationBuild from "../resources/LocationBuild";
import RoomBuild from "../resources/RoomBuild";
import TechBuild from "../resources/TechBuild";
import BuilderDashboard from "../layout/BuilderDashboard";
import "./ResourceBuilder.css";

export class ResourceBuilder extends Component {
  state = {
    locationBuilder: false,
    roomBuilder: false,
    shiftTimeBuilder: false,
    examTypeBuilder: false,
    techBuilder: false
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
      examTypeBuilder,
      techBuilder
    } = this.state;

    const shiftTimeComponent = shiftTimeBuilder ? <ShiftTimeList /> : null;
    const examTypeComponent = examTypeBuilder ? <ExamTypesList /> : null;
    const locationComponent = locationBuilder ? <LocationBuild /> : null;
    const roomComponent = roomBuilder ? <RoomBuild /> : null;
    const techComponent = techBuilder ? <TechBuild /> : null;

    return (
      <Fragment>
        <div className="container mt-2 ">
          <div className="row d-flex justify-content-center">
            <h3>Resource Builder</h3>
          </div>
          <div className="row rb-main">
            <div className="col">
              <BuilderDashboard
                toggleComponent={this.handleComponentChange.bind(this)}
              />
            </div>
            <div className="col rb-components">
              {shiftTimeComponent}
              {examTypeComponent}
              {locationComponent}
              {roomComponent}
              {techComponent}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ResourceBuilder;
