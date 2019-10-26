import axios from "axios";
import { returnErrors } from "./messages";
import {
  GET_EXAMTYPES,
  GET_SHIFTTIMES,
  SHIFT_ADDED,
  SHIFT_RETRIEVE
} from "./types";
import { combineReducers } from "../../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/redux";

//GET EXAM TYPES
export const getExamTypes = () => dispatch => {
  axios
    .get("/api/exam-types/")
    .then(res => {
      dispatch({
        type: GET_EXAMTYPES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//GET SHIFT TIMES

export const getShiftTimes = () => dispatch => {
  axios
    .get("/api/shift-times/")
    .then(res => {
      dispatch({
        type: GET_SHIFTTIMES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//ASSIGN SHIFT
export const assignShift = (dateOfShift, examType, shiftTime, room, tech) => (
  dispatch,
  getState
) => {
  const currentShifts = getState().shifts.shifts;
  if (currentShifts.some(shift => shift.tech.id == tech)) {
    console.log("You have a duplicate");
  }

  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({
    date_of_shift: dateOfShift,
    exam_type: examType,
    shift_time: shiftTime,
    room: room,
    tech: tech
  });
  axios
    .post("api/shifts/", body, config)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: SHIFT_ADDED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getShiftsForDay = dateOfShift => dispatch => {
  axios
    .get(`api/shifts/?date=${dateOfShift}`)
    .then(res => {
      dispatch({
        type: SHIFT_RETRIEVE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
