import { combineReducers } from "redux";
import techs from "./techsReducer";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  techsReducer: techs,
  errors,
  messages
});
