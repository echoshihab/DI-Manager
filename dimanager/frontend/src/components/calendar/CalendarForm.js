import React, { Fragment, Component } from "react";
import ExamTypes from "../shifts/ExamTypes";
import ShiftTimes from "../shifts/ShiftTimes";
import Location from "../resources/Location";
import DayView from "../calendar/DayView";
import TechListView from "../techs/TechListView";
import ModalComponent from "./ModalComponent";
import "./Calendar.css";
import {
  assignShift,
  getShiftsForDay,
  closeModal,
  validAssignShift
} from "../../actions/shifts";
import { connect } from "react-redux";

//helper function for querying for shifts
const shiftQuery = getShifts => {
  let selectedDate = document
    .getElementsByClassName("selected-date")[0]
    .innerHTML.split("/")
    .reverse()
    .join("-");
  getShifts(selectedDate);
};

//months
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
    let prevDaysInMonth = new Date(year, month, 0).getDate();
    let weekdayIndexOfFirst = new Date(year, month, 1).getDay();
    let weekdayIndexOfLast = new Date(year, month, daysInMonth).getDay(); //get weekday index of last of month

    this.state = {
      isActive: false,
      day: day,
      month: month,
      year: year,
      daysInMonth: daysInMonth,
      prevDaysInMonth: prevDaysInMonth,
      weekdayIndexOfFirst: weekdayIndexOfFirst,
      weekdayIndexOfLast: weekdayIndexOfLast
    };
  }

  toggleDatePicker = e => {
    if (e.target.className == "selected-date") {
      this.setState(prevState => ({ isActive: !prevState.isActive }));
    }
  };

  viewNextMonth = () => {
    let newYear,
      newDaysInMonth,
      newPrevDaysInMonth,
      newWeekdayIndexOfFirst,
      newWeekdayIndexOfLast,
      nextMonth;
    nextMonth = this.state.month + 1;
    if (nextMonth > 11) {
      newYear = this.state.year + 1;
      newDaysInMonth = new Date(newYear, 0 + 1, 0).getDate(); //this accounts for 0 indexed month values
      newPrevDaysInMonth = this.state.daysInMonth;
      newWeekdayIndexOfFirst = new Date(newYear, 0, 1).getDay();
      newWeekdayIndexOfLast = new Date(newYear, 0, newDaysInMonth).getDay();
      this.setState({
        month: 0,
        year: newYear,
        daysInMonth: newDaysInMonth,
        prevDaysInMonth: newPrevDaysInMonth,
        weekdayIndexOfFirst: newWeekdayIndexOfFirst,
        weekdayIndexOfLast: newWeekdayIndexOfLast
      });
    } else {
      newDaysInMonth = new Date(this.state.year, nextMonth + 1, 0).getDate();
      newPrevDaysInMonth = this.state.daysInMonth;
      newWeekdayIndexOfFirst = new Date(this.state.year, nextMonth, 1).getDay();
      newWeekdayIndexOfLast = new Date(
        this.state.year,
        nextMonth,
        newDaysInMonth
      ).getDay();

      this.setState(
        {
          month: nextMonth,
          daysInMonth: newDaysInMonth,
          prevDaysInMonth: newPrevDaysInMonth,
          weekdayIndexOfFirst: newWeekdayIndexOfFirst,
          weekdayIndexOfLast: newWeekdayIndexOfLast
        },
        function() {
          shiftQuery(this.props.getShiftsForDay);
        }
      );
    }
  };

  viewPrevMonth = () => {
    let newYear,
      newDaysInMonth,
      newPrevDaysInMonth,
      newWeekdayIndexOfFirst,
      newWeekdayIndexOfLast,
      prevMonth;
    prevMonth = this.state.month - 1;
    if (prevMonth < 0) {
      let newYear = this.state.year - 1;
      let newDaysInMonth = new Date(newYear, 11 + 1, 0).getDate(); //this accounts for 0 indexed month values
      let newPrevDaysInMonth = this.setState({
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
      this.setState(
        { month: prevMonth, daysInMonth: newDaysInMonth },
        function() {
          shiftQuery(this.props.getShiftsForDay);
        }
      );
    }
  };

  setDay = e => {
    this.setState({ day: e.target.textContent }, function() {
      shiftQuery(this.props.getShiftsForDay);
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { room, shiftTime, examType, tech } = e.target;
    let selectedDate = document
      .getElementsByClassName("selected-date")[0]
      .innerHTML.split("/")
      .reverse()
      .join("-");

    this.props.assignShift(
      selectedDate,
      examType.value,
      shiftTime.value,
      room.value,
      tech.value
    );
  };

  componentDidMount() {
    //query for shift with user selected date coming from monthview
    if (this.props.location.param) {
      const { day, month, year } = this.props.location.param;
      this.setState({ day: day, month: month, year: year }, function() {
        shiftQuery(this.props.getShiftsForDay);
      });
      //if directly accessing dayview query for shift for current date set in constructor
    } else {
      shiftQuery(this.props.getShiftsForDay);
    }
  }

  render() {
    const {
      isActive,
      day,
      month,
      year,
      prevDaysInMonth,
      daysInMonth,
      weekdayIndexOfFirst,
      weekdayIndexOfLast
    } = this.state;
    const days = [];
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    //populate days in a month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div className="day" onClick={this.setDay} key={i}>
          {i}
        </div>
      );
    }

    //days from previous month
    let daysBefore = weekdayIndexOfFirst - 0;
    console.log(weekdayIndexOfFirst);
    if (daysBefore > 0) {
      let prevDays = prevDaysInMonth;
      for (let i = 1; i <= daysBefore; i++) {
        days.unshift(
          <div className="day other-days" key={i + "prev"}>
            {prevDays}
          </div>
        );
        {
          prevDays--;
        }
      }
    }

    //days from next month
    let daysAfter = 6 - weekdayIndexOfLast;
    if (daysAfter > 0) {
      for (let i = 1; i <= daysAfter; i++) {
        days.push(
          <div className="day other-days" key={i + "next"}>
            {i}
          </div>
        );
      }
    }

    const modal = this.props.modal ? (
      <ModalComponent>
        <div className="modal">
          <div className="modal-content">
            <span>
              Technologist:
              <strong>{" " + this.props.values.tech_init + " "}</strong>
            </span>
            <div>Time Conflict: {this.props.values.timeDetail} </div>
            <button
              className="btn btn-primary btn-sm btn-block"
              onClick={this.props.closeModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-secondary btn-sm btn-block"
              onClick={() => {
                this.props.validAssignShift(this.props.values);
              }}
            >
              Assign Anyway
            </button>
          </div>
        </div>
      </ModalComponent>
    ) : null;
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
            <div className="days">
              {weekDays.map((weekDay, index) => (
                <div className="day" key={index}>
                  {weekDay}
                </div>
              ))}
              {days}
            </div>
          </div>
        </div>
        <form className="form-inline test" onSubmit={this.handleSubmit}>
          <ExamTypes />
          <ShiftTimes />
          <Location />
          <TechListView />
          <button className="btn btn-primary btn-sm">Assign</button>
        </form>

        <DayView />
        <div id="modal-root"></div>
        {modal}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal.modal,
  values: state.modal.values
});

export default connect(mapStateToProps, {
  assignShift,
  getShiftsForDay,
  closeModal,
  validAssignShift
})(CalendarForm);
