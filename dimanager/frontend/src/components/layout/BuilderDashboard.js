import React from "react";

const BuilderDashboard = props => {
  return (
    <div className="container d-flex flex-column h-100">
      <button
        className="btn btn-outline-primary"
        name="shiftTimeBuilder"
        onClick={props.toggleComponent}
      >
        Build Shifts
      </button>
      <button
        className="btn btn-outline-primary"
        name="examTypeBuilder"
        onClick={props.toggleComponent}
      >
        Build Exam Types
      </button>
      <button
        className="btn btn-outline-primary"
        name="locationBuilder"
        onClick={props.toggleComponent}
      >
        Build Locations
      </button>
      <button
        className="btn btn-outline-primary"
        name="roomBuilder"
        onClick={props.toggleComponent}
      >
        Build Rooms
      </button>
      <button
        className="btn btn-outline-primary"
        name="techBuilder"
        onClick={props.toggleComponent}
      >
        Add Technologist
      </button>
    </div>
  );
};

export default BuilderDashboard;
