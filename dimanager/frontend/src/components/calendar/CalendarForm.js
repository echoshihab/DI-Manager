import React, { Component, Fragment } from "react";
import ShiftTimes from "../shifts/ShiftTimes";
import Location from "../resources/Location";
import Modality from "./Modality";
import DayView from "../calendar/DayView";
import TechListView from "../techs/TechListView";
import ModalComponent from "./ModalComponent";
import "./CalendarForm.css";
import {
  assignShift,
  getShiftsForDay,
  closeModal,
  validAssignShift,
  getExamTypes,
  clearShifts
} from "../../actions/shifts";
import { connect } from "react-redux";

//helper function for querying for shifts
const shiftQuery = getShiftsFunction => {
  let selectedDate = document
    .getElementsByClassName("cf-selected-date")[0]
    .innerHTML.split("/")
    .reverse()
    .join("-");
  let modalityID = document.getElementsByName("modality")[0].value;
  getShiftsFunction(selectedDate, modalityID);
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
      error: false,
      roomFlag: false,
      manageFlag: false,
      modalityFlag: false,
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
    this.setState({ roomFlag: roomFlag, error: false });
  };

  onModalitySelect = (manageFlag, modalityID) => {
    const { isAuthenticated, user } = this.props.auth;
    //get shifts with edit permission for coordinators or shifts with view permission for others
    if (
      isAuthenticated &&
      user.modalities.some(modality => modality.id == modalityID)
    ) {
      this.setState({ manageFlag: manageFlag, modalityFlag: true }, function() {
        shiftQuery(this.props.getShiftsForDay);
        this.props.getExamTypes(modalityID);
      });
    } else
      this.setState({ manageFlag: false, modalityFlag: true }, function() {
        shiftQuery(this.props.getShiftsForDay);
      });
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
      this.setState(
        {
          month: 0,
          year: newYear,
          daysInMonth: newDaysInMonth,
          prevDaysInMonth: newPrevDaysInMonth,
          weekdayIndexOfFirst: newWeekdayIndexOfFirst,
          weekdayIndexOfLast: newWeekdayIndexOfLast
        },
        function() {
          this.state.modalityFlag
            ? shiftQuery(this.props.getShiftsForDay)
            : null;
        }
      );
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
          this.state.modalityFlag
            ? shiftQuery(this.props.getShiftsForDay)
            : null;
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

      this.setState(
        {
          day: 1,
          month: 11,
          year: newYear,
          daysInMonth: newDaysInMonth,
          prevDaysInMonth: newPrevDaysInMonth,
          weekdayIndexOfFirst: newWeekdayIndexOfFirst,
          weekdayIndexOfLast: newWeekdayIndexOfLast
        },
        function() {
          this.state.modalityFlag
            ? shiftQuery(this.props.getShiftsForDay)
            : null;
        }
      );
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
          this.state.modalityFlag
            ? shiftQuery(this.props.getShiftsForDay)
            : null;
        }
      );
    }
  };

  setDay = e => {
    this.setState({ day: e.target.textContent }, function() {
      this.state.modalityFlag ? shiftQuery(this.props.getShiftsForDay) : null;
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { location, room, shiftTime, examType, tech, modality } = e.target;
    if (location.value == "default") {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      let selectedDate = document
        .getElementsByClassName("cf-selected-date")[0]
        .innerHTML.split("/")
        .reverse()
        .join("-");

      this.props.assignShift(
        selectedDate,
        examType.value,
        shiftTime.value,
        room.value,
        tech.value,
        modality.value
      );
    }
  };

  componentDidMount() {
    //query for shift with user selected date coming from monthview
    if (this.props.location.param) {
      const { day, month, year, modalityID } = this.props.location.param;

      this.setState(
        {
          day: day,
          month: month,
          year: year,
          manageFlag: true,
          modalityFlag: true
        },
        function() {
          document.getElementsByName("modality")[0].value = modalityID;
          shiftQuery(this.props.getShiftsForDay);
          this.props.getExamTypes(modalityID);
        }
      );
    }
  }

  componentWillUnmount() {
    this.props.clearShifts();
  } //this ensures monthview render will not be affected by monthview shift query

  render() {
    const {
      isActive,
      error,
      roomFlag,
      manageFlag,
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
        <div className="cf-day day-main" onClick={this.setDay} key={i}>
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
          <div className="cf-day other-days" key={i + "prev"}>
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
          <div className="cf-day other-days" key={i + "next"}>
            {i}
          </div>
        );
      }
    }

    //this modal component displays conflicts and overriding option for duplicate tech & time
    const modal = this.props.modal ? (
      <ModalComponent>
        <div className="modal cf-modal">
          <div className="modal-content cf-modal-content">
            <span>
              Technologist:
              <strong>{" " + this.props.values.tech_init + " "}</strong>
            </span>
            <div>Time Conflict: {this.props.values.timeDetail} </div>
            <div>
              <button
                className="cf-modal-button"
                onClick={this.props.closeModal}
              >
                Cancel
              </button>
              <button
                className="cf-modal-button"
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
      <div className="container-fluid">
        <div className="cf-date-picker" onClick={this.toggleDatePicker}>
          <div className="cf-selected-date">
            {(day < 10 ? "0" + day : day) +
              "/" +
              (1 + month < 10 ? "0" + (1 + month) : 1 + month) +
              "/" +
              year}
          </div>

          <div className={`cf-dates ${isActive ? "active" : ""}`}>
            <div className="cf-month">
              <div className="arrows prev-mth" onClick={this.viewPrevMonth}>
                Prev
              </div>
              <div className="mth">{months[month] + " " + year}</div>
              <div className="arrows next-mth" onClick={this.viewNextMonth}>
                Next
              </div>
            </div>
            <div className="cf-days">
              {weekDays.map((weekDay, index) => (
                <div className="cf-day weekday" key={index}>
                  {weekDay}
                </div>
              ))}
              {days}
            </div>
          </div>
        </div>
        <form className="cf-form" onSubmit={this.handleSubmit}>
          <div className="cf-form-group">
            <label>Modality</label>
            <Modality
              parentClasses={"form-control"}
              onModalitySelect={this.onModalitySelect.bind(this)}
            />
          </div>
          {manageFlag ? (
            <Fragment>
              <div className="cf-form-group">
                <label>Types</label>
                <select className="form-control" name="examType">
                  {this.props.examTypes.map(examType => (
                    <option key={examType.id} value={examType.id}>
                      {examType.exam_type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="cf-form-group">
                <label>Time</label>
                <ShiftTimes />
              </div>
              <div className="cf-form-group">
                <label>Location</label>
                <Location onLocationSelect={this.onLocationSelect.bind(this)} />
              </div>

              {roomFlag ? (
                <div className="cf-form-group">
                  <label>Room</label>
                  <select className="form-control" name="room">
                    {this.props.rooms.map(room => (
                      <option key={room.id} value={room.id}>
                        {room.room}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div className="cf-form-group">
                <label>Technologist </label>
                <TechListView />
              </div>
              <div className="cf-form-btn">
                <button className="btn btn-primary btn-sm">Assign</button>
              </div>

              {error ? <div className="error">{errorMsg}</div> : null}
            </Fragment>
          ) : null}
        </form>
        <DayView manageFlag={manageFlag} />
        <div id="modal-root"></div>
        {modal}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal.modal,
  values: state.modal.values,
  rooms: state.rooms.rooms,
  examTypes: state.examTypes.examTypes,
  auth: state.auth
});

export default connect(mapStateToProps, {
  assignShift,
  getShiftsForDay,
  closeModal,
  validAssignShift,
  getExamTypes,
  clearShifts
})(CalendarForm);
