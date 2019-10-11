import React, { Component } from "react";
import "./Calendar.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export class CalendarForm extends Component {
  constructor() {
    super();
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let selectedDate = date;
    let selectedDay = day;
    let selectedMonth = month;
    let selectedYear = year;

    this.state = {
      isActive: false,
      month: month,
      year: year
    };

    this.toggleDatePicker = e => {
      if (e.target.className == "selected-date") {
        this.setState(prevState => ({ isActive: !prevState.isActive }));
      }
    };

    this.viewNextMonth = () => {
      let next_month = this.state.month + 1;
      if (next_month > 11) {
        this.setState(prevState => ({ month: 0, year: this.state.year + 1 }));
      } else {
        this.setState({ month: next_month });
      }
    };
  }

  render() {
    const { isActive, month, year } = this.state;
    return (
      <div className="date-picker" onClick={this.toggleDatePicker}>
        <div className="selected-date"></div>

        <div className={`dates ${isActive ? "active" : ""}`}>
          <div className="month">
            <div className="arrows prev-mth">Prev</div>
            <div className="mth">{months[month] + " " + year}</div>
            <div className="arrows next-mth" onClick={this.viewNextMonth}>
              Next
            </div>
          </div>
          <div className="days">
            <div className="day">1</div>
            <div className="day">2</div>
            <div className="day">3</div>
            <div className="day">4</div>
            <div className="day">5</div>
            <div className="day">6</div>
            <div className="day">7</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CalendarForm;
