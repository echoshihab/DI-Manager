import React, { Component } from "react";
import "./Calendar.css";

export class CalendarForm extends Component {
  state = {
    isActive: false
  };

  toggleDatePicker = e => {
    this.setState(prevState => ({ isActive: !prevState.isActive }));
  };

  render() {
    const { isActive } = this.state;
    return (
      <div className="date-picker" onClick={this.toggleDatePicker}>
        <div className="selected-date"> 30/07/2019 </div>

        <div className={`dates ${isActive ? "active" : ""}`}>
          <div className="month">
            <div className="arrows prev-mth">Prev</div>
            <div className="mth"></div>
            <div className="arrows next-mth">Next</div>
          </div>
          <div className="days"></div>
        </div>
      </div>
    );
  }
}

export default CalendarForm;
