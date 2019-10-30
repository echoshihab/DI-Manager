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

    this.state = {
      isActive: false,
      day: day,
      month: month,
      year: year,
      daysInMonth: daysInMonth
    };
  }

  toggleDatePicker = e => {
    if (e.target.className == "selected-date") {
      this.setState(prevState => ({ isActive: !prevState.isActive }));
    }
  };

  viewNextMonth = () => {
    let nextMonth = this.state.month + 1;
    if (nextMonth > 11) {
      let newYear = this.state.year + 1;
      let newDaysInMonth = new Date(newYear, 0 + 1, 0).getDate(); //this accounts for 0 indexed month values
      this.setState({
        month: 0,
        year: newYear,
        daysInMonth: newDaysInMonth
      });
    } else {
      let newDaysInMonth = new Date(
        this.state.year,
        nextMonth + 1,
        0
      ).getDate();
      this.setState(
        { month: nextMonth, daysInMonth: newDaysInMonth },
        function() {
          shiftQuery(this.props.getShiftsForDay);
        }
      );
    }
  };

  viewPrevMonth = () => {
    let prevMonth = this.state.month - 1;
    if (prevMonth < 0) {
      let newYear = this.state.year - 1;
      let newDaysInMonth = new Date(newYear, 11 + 1, 0).getDate(); //this accounts for 0 indexed month values
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
    shiftQuery(this.props.getShiftsForDay);
  }

  render() {
    const { isActive, day, month, year, daysInMonth } = this.state;

    const days = [];

    //populate days in a month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div className="day" onClick={this.setDay} key={i}>
          {i}
        </div>
      );
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
            <div className="days">{days}</div>
          </div>
        </div>
        <form className="form-inline" onSubmit={this.handleSubmit}>
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

export default connect(
  mapStateToProps,
  { assignShift, getShiftsForDay, closeModal, validAssignShift }
)(CalendarForm);
