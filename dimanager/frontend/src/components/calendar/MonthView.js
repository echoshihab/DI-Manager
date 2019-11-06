import React, { Component } from "react";

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
    return (
      <div className="container d-flex align-items-center flex-row justify-content-center h-100">
        <div clasName="btn-group btn-group-vertical">
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
      </div>
    );
  }
}

export default MonthView;
