import React, { Component } from "react";

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
    return (
      <div className="container mt-5">
        <h1>{year}</h1>
      </div>
    );
  }
}

export default MonthView;
