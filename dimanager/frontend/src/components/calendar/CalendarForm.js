import React, { Fragment, Component } from "react";
import ShiftList from "../shifts/ShiftList";
import ShiftTimes from "../shifts/ShiftTimes";
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
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    let selectedDate = date;
    let selectedDay = day;
    let selectedMonth = month;
    let selectedYear = year;

    this.state = {
      isActive: false,
      day: day,
      month: month,
      year: year,
      daysInMonth: daysInMonth
    };

    this.toggleDatePicker = e => {
      if (e.target.className == "selected-date") {
        this.setState(prevState => ({ isActive: !prevState.isActive }));
      }
    };

    this.viewNextMonth = () => {
      let nextMonth = this.state.month + 1; //this is zero indexed month value
      if (nextMonth > 11) {
        let newYear = this.state.year + 1;
        let newDaysInMonth = new Date(newYear, 0 + 1, 0).getDate();
        this.setState(prevState => ({
          month: 0,
          year: newYear,
          daysInMonth: newDaysInMonth
        }));
      } else {
        let newDaysInMonth = new Date(
          this.state.year,
          nextMonth + 1,
          0
        ).getDate();
        this.setState({ month: nextMonth, daysInMonth: newDaysInMonth });
      }
    };

    this.viewPrevMonth = () => {
      let prevMonth = this.state.month - 1;
      if (prevMonth < 0) {
        let newYear = this.state.year - 1;
        let newDaysInMonth = new Date(newYear, 11 + 1, 0).getDate();
        this.setState({
          month: 11,
          year: newYear,
          daysInMonth: newDaysInMonth
        });
      } else {
        let newDaysInMonth = new Date(
          this.state.year,
          prevMonth + 1,
          0
        ).getDate();
        this.setState({ month: prevMonth, daysInMonth: newDaysInMonth });
      }
    };

    this.setDay = e => {
      this.setState({ day: e.target.textContent });
    };
  }

  render() {
    const { isActive, day, month, year, daysInMonth } = this.state;

    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div className="day" onClick={this.setDay} key={i}>
          {i}
        </div>
      );
    }

    return (
      <Fragment>
        <div className="date-picker" onClick={this.toggleDatePicker}>
          <div className="selected-date">
            {(day < 10 ? "0" + day : day) +
              "/" +
              (1 + month < 10 ? "0" + (1 + month) : 1 + month) +
              "/" +
              year}
          </div>

          <div className={`dates ${isActive ? "active" : ""}`}>
            <div className="month">
              <div className="arrows prev-mth" onClick={this.viewPrevMonth}>
                Prev
              </div>
              <div className="mth">{months[month] + " " + year}</div>
              <div className="arrows next-mth" onClick={this.viewNextMonth}>
                Next
              </div>
            </div>
            <div className="days">{days}</div>
          </div>
        </div>
        <ShiftList />
        <ShiftTimes />
      </Fragment>
    );
  }
}

export default CalendarForm;
