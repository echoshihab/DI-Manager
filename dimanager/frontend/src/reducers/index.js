import { combineReducers } from "redux";
import techs from "./techsReducer";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import examTypes from "./examTypes";

export default combineReducers({
  techsReducer: techs,
  examTypes,
  errors,
  messages,
  auth
});
