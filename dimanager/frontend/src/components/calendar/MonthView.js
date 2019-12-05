import React, { Fragment, Component } from "react";
import "./monthView.css";
import { getShiftsForMonth } from "../../actions/shifts";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//helper function for querying for shift for a month
const shiftQuery = (getShifts, year, month, daysInMonth) => {
  let selectedDate = `${year}-${month + 1}-01^${year}-${month +
    1}-${daysInMonth}`;
  getShifts(selectedDate);
};

export class MonthView extends Component {
  constructor() {
    super();
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let weekdayIndexOfFirst = new Date(year, month, 1).getDay(); //get weekday index of first of month
    let weekdayIndexOfLast = new Date(year, month, daysInMonth).getDay(); //get weekday index of last of month

    this.state = {
      month: month,
      year: year,
      daysInMonth: daysInMonth,
      weekdayIndexOfFirst: weekdayIndexOfFirst,
      weekdayIndexOfLast: weekdayIndexOfLast
    };
  }

  handleMonthQuery = (index, e) => {
    const { year } = this.state;
    let newMonth = index;
    let newDaysInMonth = new Date(year, newMonth + 1, 0).getDate();
    let newWeekdayIndexOfFirst = new Date(year, newMonth, 1).getDay();
    let newWeekdayIndexOfLast = new Date(
      year,
      newMonth,
      newDaysInMonth
    ).getDay();

    this.setState(
      {
        month: newMonth,
        daysInMonth: newDaysInMonth,
        weekdayIndexOfFirst: newWeekdayIndexOfFirst,
        weekdayIndexOfLast: newWeekdayIndexOfLast
      },
      function() {
        shiftQuery(
          this.props.getShiftsForMonth,
          this.state.year,
          this.state.month,
          this.state.daysInMonth
        );
      }
    );
  };

  handleYearQuery = mod => {
    let modification;
    mod == "plus" ? (modification = 1) : (modification = -1);
    let newYear = this.state.year + modification;
    let newDaysInMonth = new Date(newYear, this.state.month + 1, 0).getDate();
    let newWeekdayIndexOfFirst = new Date(
      newYear,
      this.state.month,
      1
    ).getDay();
    let newWeekdayIndexOfLast = new Date(
      newYear,
      this.state.month,
      newDaysInMonth
    ).getDay();
    this.setState(
      {
        year: newYear,
        daysInMonth: newDaysInMonth,
        weekdayIndexOfFirst: newWeekdayIndexOfFirst,
        weekdayIndexOfLast: newWeekdayIndexOfLast
      },
      function() {
        shiftQuery(
          this.props.getShiftsForMonth,
          this.state.year,
          this.state.month,
          this.state.daysInMonth
        );
      }
    );
  };

  componentDidMount() {
    const { year, month, daysInMonth } = this.state;
    shiftQuery(this.props.getShiftsForMonth, year, month, daysInMonth);
  }

  render() {
    const {
      month,
      year,
      daysInMonth,
      weekdayIndexOfFirst,
      weekdayIndexOfLast
    } = this.state;
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

    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      let dayOfMonth;
      if (i < 10) {
        dayOfMonth = "0" + i;
      } else {
        dayOfMonth = i.toString();
      }
      //filter for shifts that match the current day of month
      let result = this.props.shifts.filter(
        shift => shift.date_of_shift.slice(-2) == dayOfMonth
      );

      //if there are any matching shifts, associate  day push
      //to days array in order to map out calender view later
      result.length > 0
        ? days.push(
            <li className="mv-li mv-day" key={i}>
              <span className="mv-daysOfMonth">{i}</span>

              <div className="mv-shift-container">
                {result.map(r => (
                  <div className="mv-shift" key={r.id}>
                    {r.room.room +
                      " " +
                      r.exam_type.exam_type +
                      " " +
                      r.shift_time.start_time.slice(0, -3) +
                      "-" +
                      r.shift_time.end_time.slice(0, -3) +
                      " " +
                      r.tech.initials}
                  </div>
                ))}
              </div>
              <Link
                to={{
                  pathname: "/calendar",
                  param: {
                    day: i,
                    month: month,
                    year: year
                  }
                }}
              >
                <i className="material-icons md-18 mv-pen">edit</i>
              </Link>
            </li>
          )
        : //if no matches, just push the day of month to days array
          days.push(
            <li className="mv-li mv-day" key={i}>
              <strong className="mv-daysOfMonth">{i}</strong>
              <div className="mv-shift-container" />
              <Link
                to={{
                  pathname: "/calendar",
                  param: {
                    day: i,
                    month: month,
                    year: year
                  }
                }}
              >
                <i className="material-icons md-18 mv-pen">edit</i>
              </Link>
            </li>
          );
    }

    //days from previous month represented as gray boxes in monthview
    let daysBefore = weekdayIndexOfFirst - 0;
    if (daysBefore > 0) {
      for (let i = 1; i <= daysBefore; i++) {
        days.unshift(
          <li className="mv-li mv-month-prev" key={i + "prev"}></li>
        );
      }
    }

    //days from next month represented as gray boxes in monthview
    let daysAfter = 6 - weekdayIndexOfLast;
    if (daysAfter > 0) {
      for (let i = 1; i <= daysAfter; i++) {
        days.push(<li className="mv-li mv-month-next" key={i + "next"}></li>);
      }
    }

    return (
      <div className="container-fluid">
        <div className="btn-group btn-group-horizontal">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            id="plus"
            onClick={() => this.handleYearQuery("plus")}
          >
            <strong className="mv-year-mod">+</strong>
          </button>
          <h1 className="mv-year">{year}</h1>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            id="minus"
            onClick={() => this.handleYearQuery("minus")}
          >
            <strong className="mv-year-mod">-</strong>
          </button>
        </div>

        <div className="btn-group mv-months" role="group">
          {months.map((month, index) => {
            return (
              <button
                type="button"
                key={month}
                className={
                  "btn btn-secondary " +
                  (this.state.month == index ? "mv-selected-month" : "")
                }
                onClick={e => this.handleMonthQuery(index, e)}
              >
                {month}
              </button>
            );
          })}
        </div>

        <div className="mv-wrapper">
          <ul className="mv-wkdays">
            {weekDays.map(weekDay => {
              return (
                <li className="mv-li mv-wkday" key={weekDay}>
                  {weekDay}
                </li>
              );
            })}
          </ul>

          <ul className="mv-day-grid">{days}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shifts: state.shifts.shifts
});

export default connect(mapStateToProps, { getShiftsForMonth })(MonthView);
