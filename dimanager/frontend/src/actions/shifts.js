import axios from "axios";
import { returnErrors } from "./messages";
import {
  GET_EXAMTYPES,
  GET_SHIFTTIMES,
  SHIFT_ADDED,
  SHIFT_RETRIEVE,
  DUPLICATE_ITEMS,
  OVERRIDE_ITEMS
} from "./types";

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

//Modal Assign SHIFT -after overriding at modal or with no duplicates
export const validAssignShift = values => dispatch => {
  const { dateOfShift, examType, shiftTime, room, tech } = values;
  console.log(dateOfShift, examType, shiftTime, room, tech);
  //headers
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
      dispatch({ type: OVERRIDE_ITEMS });
      dispatch({
        type: SHIFT_ADDED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//ASSIGN SHIFT  - prior to modal
export const assignShift = (dateOfShift, examType, shiftTime, room, tech) => (
  dispatch,
  getState
) => {
  const currentShifts = getState().shifts.shifts;

  //Show error if duplicate technologist on same day
  if (currentShifts.some(shift => shift.tech.id == tech)) {
    let tech_init = currentShifts.find(shift => shift.tech.id == tech).tech
      .initials;
    dispatch({
      type: DUPLICATE_ITEMS,
      payload: { dateOfShift, examType, shiftTime, room, tech, tech_init }
    });
  } else {
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
        dispatch({
          type: SHIFT_ADDED,
          payload: res.data
        });
      })
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  }
};

//get today's shifts
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

//close modal
export const closeModal = () => dispatch => {
  {
    dispatch({ type: OVERRIDE_ITEMS });
  }
};
