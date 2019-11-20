import React, { Component } from "react";
import "./monthView.css";
import { getShiftsForMonth } from "../../actions/shifts";
import { connect } from "react-redux";

//helper function for querying for shift for a month
const shiftQuery = (getShifts, year, month, daysInMonth) => {
  let selectedDate = `${year}-${month + 1}-01^${year}-${month +
    1}-${daysInMonth}`;
  console.log(selectedDate);
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

  handleMonthQuery = (index, e) => {
    let newMonth = index;
    let newDaysInMonth = new Date(this.state.year, newMonth + 1, 0).getDate();
    this.setState({ month: newMonth, daysInMonth: newDaysInMonth }, function() {
      shiftQuery(
        this.props.getShiftsForMonth,
        this.state.year,
        this.state.month,
        this.state.daysInMonth
      );
    });
  };

  componentDidMount() {
    const { year, month, daysInMonth } = this.state;
    shiftQuery(this.props.getShiftsForMonth, year, month, daysInMonth);
  }

  render() {
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
      //result below are shifts that match the current day of month
      let result = this.props.shifts.filter(
        shift => shift.date_of_shift.slice(-2) == dayOfMonth
      );
      //if there are any shifts, associate them with the day below and push
      //to days array to map out to calender view later
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
          {months.map((month, index) => {
            return (
              <button
                type="button"
                key={month}
                className="btn btn-secondary"
                onClick={e => this.handleMonthQuery(index, e)}
              >
                {month}
              </button>
            );
          })}
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
