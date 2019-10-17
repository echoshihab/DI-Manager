import axios from "axios";
import { returnErrors } from "./messages";
import { GET_EXAMTYPES, GET_SHIFTTIMES, SHIFT_ADDED } from "./types";

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
export const assignShift = (
  dateOfShift,
  examType,
  shiftTime,
  room
) => dispatch => {
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
    room: room
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
