import { combineReducers } from "redux";
import techs from "./techsReducer";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  techsReducer: techs,
  errors,
  messages,
  auth
});
