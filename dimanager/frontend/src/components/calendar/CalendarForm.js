import React, { Component } from "react";
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

//loader

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

const showLoader = () => loader.classList.remove("loader--hide");
const hideLoader = () => {
  let loader = document.querySelector(".loader");
  loader.classList.add("loader--hide");
};
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
      error: false,
      roomFlag: false,
      day: day,
      month: month,
      year: year,
      daysInMonth: daysInMonth,
      prevDaysInMonth: prevDaysInMonth,
      weekdayIndexOfFirst: weekdayIndexOfFirst,
      weekdayIndexOfLast: weekdayIndexOfLast
    };
  }

  onLocationSelect = roomFlag => {
    this.setState({ roomFlag: roomFlag });
  };

  toggleDatePicker = e => {
    if (!e.target.classList.contains("arrows")) {
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
          day: 1,
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
      newYear = this.state.year - 1;
      newDaysInMonth = new Date(this.state.year, 0 + 1, 0).getDate();
      //this accounts for 0 indexed month values
      newPrevDaysInMonth = new Date(newYear, 11, 0).getDate();
      newWeekdayIndexOfFirst = new Date(newYear, 11, 1).getDay();
      newWeekdayIndexOfLast = new Date(newYear, 11, newDaysInMonth).getDay();

      this.setState({
        day: 1,
        month: 11,
        year: newYear,
        daysInMonth: newDaysInMonth,
        prevDaysInMonth: newPrevDaysInMonth,
        weekdayIndexOfFirst: newWeekdayIndexOfFirst,
        weekdayIndexOfLast: newWeekdayIndexOfLast
      });
    } else {
      newDaysInMonth = new Date(this.state.year, prevMonth + 1, 0).getDate();
      newPrevDaysInMonth = new Date(this.state.year, prevMonth, 0).getDate();
      newWeekdayIndexOfFirst = new Date(this.state.year, prevMonth, 1).getDay();
      newWeekdayIndexOfLast = new Date(
        this.state.year,
        prevMonth,
        newDaysInMonth
      ).getDay();

      this.setState(
        {
          day: 1,
          month: prevMonth,
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

  setDay = e => {
    this.setState({ day: e.target.textContent }, function() {
      shiftQuery(this.props.getShiftsForDay);
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { location, room, shiftTime, examType, tech } = e.target;
    if (location.value == "default") {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
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
    }
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

    hideLoader();
  }

  render() {
    const {
      isActive,
      error,
      roomFlag,
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
    const errorMsg = "*Select a location";

    //toggle datepicker
    isActive
      ? document.addEventListener("click", this.toggleDatePicker)
      : document.removeEventListener("click", this.toggleDatePicker);

    //populate days in a month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div className="day" onClick={this.setDay} key={i}>
          {i}
        </div>
      );
    }

    //polulate days from previous month
    let daysBefore = weekdayIndexOfFirst - 0;
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

    //populate days from next month
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

    //this modal component displays conflicts and overriding option for duplicate tech & time
    const modal = this.props.modal ? (
      <ModalComponent>
        <div className="modal">
          <div className="modal-content">
            <span>
              Technologist:
              <strong>{" " + this.props.values.tech_init + " "}</strong>
            </span>
            <div>Time Conflict: {this.props.values.timeDetail} </div>
            <div>
              <button
                className="btn btn-primary btn-sm w-50 h-15 modal-button"
                onClick={this.props.closeModal}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger btn-sm w-50 h-15 modal-button"
                onClick={() => {
                  this.props.validAssignShift(this.props.values);
                }}
              >
                Override
              </button>
            </div>
          </div>
        </div>
      </ModalComponent>
    ) : null;
    return (
      <div className="container">
        <div className="loader"></div>
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
                <div className="day weekday" key={index}>
                  {weekDay}
                </div>
              ))}
              {days}
            </div>
          </div>
        </div>
        <form className="form-inline test" onSubmit={this.handleSubmit}>
          <table>
            <thead>
              <tr>
                <td>Type</td>
                <td>Time </td>
                <td>Location </td>
                {this.state.roomFlag ? <td>Room</td> : null}
                <td>Technologist </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ExamTypes />
                </td>
                <td>
                  <ShiftTimes />
                </td>
                <td>
                  <Location
                    onLocationSelect={this.onLocationSelect.bind(this)}
                  />
                </td>
                {roomFlag ? (
                  <td>
                    <select className="form-control" name="room">
                      {this.props.rooms.map(room => (
                        <option key={room.id} value={room.id}>
                          {room.room}
                        </option>
                      ))}
                    </select>
                  </td>
                ) : null}
                <td>
                  <TechListView />
                </td>
                <td>
                  <button className="btn btn-primary btn-sm">Assign</button>
                </td>
              </tr>
            </tbody>
          </table>

          {error ? <div className="error">{errorMsg}</div> : null}
        </form>

        <DayView />
        <div id="modal-root"></div>
        {modal}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal.modal,
  values: state.modal.values,
  rooms: state.rooms.rooms
});

export default connect(mapStateToProps, {
  assignShift,
  getShiftsForDay,
  closeModal,
  validAssignShift
})(CalendarForm);
