import React, { Component } from "react";
import "./monthView.css";
import { getShiftsForMonth } from "../../actions/shifts";
import { connect } from "react-redux";

//helper function for querying for shift for a month
const shiftQuery = getShifts => {
  let selectedDate = "2019-11-01^2019-11-30";
  getShifts(selectedDate);
};

export class MonthView extends Component {
  constructor() {
    super();
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    this.state = {
      isActive: false,
      day: day,
      month: month,
      year: year,
      daysInMonth: daysInMonth
    };
  }

  componentDidMount() {
    shiftQuery(this.props.getShiftsForMonth);
  }

  render() {
    this.props.shifts ? console.log(this.props.shifts) : null;
    const { isActive, day, month, year, daysInMonth } = this.state;
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

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      let dayOfMonth;
      if (i < 10) {
        dayOfMonth = "0" + i;
      } else {
        dayOfMonth = i.toString();
      }

      let result = this.props.shifts.filter(
        shift => shift.date_of_shift.slice(-2) == dayOfMonth
      );

      result.length > 0
        ? days.push(
            <li className="day" key={i}>
              {i +
                " " +
                result.map(
                  r =>
                    r.room.room +
                    " " +
                    r.exam_type.exam_type +
                    " " +
                    r.shift_time.start_time.slice(0, -3) +
                    "-" +
                    r.shift_time.end_time.slice(0, -3) +
                    " " +
                    r.tech.initials
                )}
            </li>
          )
        : days.push(
            <li className="day" key={i}>
              {i}
            </li>
          );
    }

    /*
 result[0].room.room +
                " " +
                result[0].exam_type.exam_type +
                " " +
                result[0].shift_time.start_time.slice(0, -3) +
                "-" +
                result[0].shift_time.end_time.slice(0, -3) +
                " " +
                result[0].tech.initials}
    */

    return (
      <div className="container d-flex align-items-center flex-column justify-content-center h-100">
        <div className="btn-group btn-group-vertical">
          <button type="button" className="btn btn-sm btn-outline-primary">
            +
          </button>
          <button type="button" className="btn btn-sm btn-outline-primary">
            -
          </button>
        </div>
        <h1>{year}</h1>
        <div className="btn-group" role="group" aria-label="months">
          {months.map(month => (
            <button type="button" key={month} className="btn btn-secondary">
              {month}
            </button>
          ))}
        </div>
        <div className="calendar">
          <header>
            <h1>November 2019</h1>
          </header>

          <ul className="weekdays">
            <li>
              <abbr title="S">Sunday</abbr>
            </li>
            <li>
              <abbr title="M">Monday</abbr>
            </li>
            <li>
              <abbr title="T">Tuesday</abbr>
            </li>
            <li>
              <abbr title="W">Wednesday</abbr>
            </li>
            <li>
              <abbr title="T">Thursday</abbr>
            </li>
            <li>
              <abbr title="F">Friday</abbr>
            </li>
            <li>
              <abbr title="S">Saturday</abbr>
            </li>
          </ul>

          <ul className="day-grid">
            <li className="month=prev">29</li>
            <li className="month=prev">30</li>
            <li className="month=prev">31</li>
            {days}
            <li className="month-next">1</li>
            <li className="month-next">2</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shifts: state.shifts.shifts
});

export default connect(mapStateToProps, { getShiftsForMonth })(MonthView);
