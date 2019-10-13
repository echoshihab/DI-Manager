import { combineReducers } from "redux";
import techs from "./techsReducer";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import examTypes from "./examTypes";
import shiftTimes from "./shiftTimes";

export default combineReducers({
  techsReducer: techs,
  examTypes,
  shiftTimes,
  errors,
  messages,
  auth
});
