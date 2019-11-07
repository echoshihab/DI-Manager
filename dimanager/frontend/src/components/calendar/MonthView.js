import React, { Component } from "react";
import "./monthView.css";

//months

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
      days.push(
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

export default MonthView;
