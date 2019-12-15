import axios from "axios";
import { returnErrors } from "./messages";
import {
  GET_EXAMTYPES,
  GET_SHIFTTIMES,
  SHIFT_ADDED,
  SHIFT_DELETED,
  SHIFT_RETRIEVE,
  DUPLICATE_ITEMS,
  OVERRIDE_ITEMS,
  BUILD_SHIFTTIMES,
  DELETE_SHIFTTIME,
  ADD_EXAMTYPE,
  DELETE_EXAMTYPE,
  CLEAR_SHIFT
} from "./types";
import { tokenConfig } from "./auth";

//seconds converter function
const secondsConverter = timeString => {
  let timeArray = timeString.split(":");
  let secondsCount = timeArray[0] * 3600 + timeArray[1] * 60;
  return secondsCount;
};

//shift compare function 10 - 4
const shiftCompare = (
  currentShiftStart,
  currentShiftEnd,
  newShiftStart,
  newShiftEnd
) => {
  if (currentShiftStart <= newShiftStart && currentShiftEnd >= newShiftEnd)
    return true;
  if (currentShiftStart > newShiftStart && currentShiftEnd <= newShiftEnd)
    return true;
  if (currentShiftStart > newShiftStart && currentShiftStart < newShiftEnd)
    return true;
  if (currentShiftEnd > newShiftStart && currentShiftEnd < newShiftEnd)
    return true;

  return false;
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

//ASSIGN SHIFT  - prior to modal override option
export const assignShift = (dateOfShift, examType, shiftTime, room, tech) => (
  dispatch,
  getState
) => {
  const currentShifts = getState().shifts.shifts;
  //Show error if duplicate technologist on same day
  if (
    currentShifts.some(shift => shift.tech.id == tech) ||
    currentShifts.some(shift => shift.room.id == room)
  ) {
    let tech_init;
    let duplicateTechShift = currentShifts.find(shift => shift.tech.id == tech);
    if (duplicateTechShift) {
      tech_init = `${duplicateTechShift.tech.initials} has already been assigned`;
    } else {
      tech_init = "No Conflict";
    }

    let duplicateRoomShift = currentShifts.find(shift => shift.room.id == room);

    let timeDetail;
    if (duplicateRoomShift) {
      const stateShiftTimes = getState().shiftTimes.shiftTimes;

      let newShiftTime = stateShiftTimes.find(
        stateShiftTime => stateShiftTime.id == shiftTime
      );

      let currentStartTime = secondsConverter(
        duplicateRoomShift.shift_time.start_time
      );
      let currentEndTime = secondsConverter(
        duplicateRoomShift.shift_time.end_time
      );
      let newStartTime = secondsConverter(newShiftTime.start_time);
      let newEndTime = secondsConverter(newShiftTime.end_time);
      shiftCompare(currentStartTime, currentEndTime, newStartTime, newEndTime)
        ? (timeDetail = `Overlap of time in room ${duplicateRoomShift.room.room}, please review`)
        : (timeDetail = "No Time Conflict");
    }

    dispatch({
      type: DUPLICATE_ITEMS,
      payload: {
        dateOfShift,
        examType,
        shiftTime,
        room,
        tech,
        tech_init,
        timeDetail
      }
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

//delete Shift
export const deleteShift = id => dispatch => {
  axios
    .delete(`/api/shifts/${id}/`)
    .then(res => {
      dispatch({
        type: SHIFT_DELETED,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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

//get month's shifts
export const getShiftsForMonth = dateRange => dispatch => {
  axios
    .get(`http://localhost:8000/api/shifts/?date_range=${dateRange}`)
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

//build new shift
export const buildShift = (startShift, endShift) => dispatch => {
  //config
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({
    start_time: startShift,
    end_time: endShift
  });

  axios
    .post("api/shift-times/", body, config)
    .then(res => {
      dispatch({
        type: BUILD_SHIFTTIMES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//DELETE shift time
export const deleteShiftTime = id => (dispatch, getState) => {
  axios
    .delete(`/api/shift-times/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_SHIFTTIME,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//GET EXAM TYPES
export const getExamTypes = () => (dispatch, getState) => {
  axios
    .get("/api/exam-types/", tokenConfig(getState))
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

//BUILD EXAM TYPES

export const addExamType = examType => (dispatch, getState) => {
  //request body
  let exam_type = examType.toUpperCase();
  const body = JSON.stringify({
    exam_type
  });

  axios
    .post("/api/exam-types/", body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_EXAMTYPE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data, err.response.status);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//DELETE exam type
export const deleteExamType = id => (dispatch, getState) => {
  axios
    .delete(`/api/exam-types/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_EXAMTYPE,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const clearShifts = () => dispatch => {
  dispatch({
    type: CLEAR_SHIFT
  });
};
