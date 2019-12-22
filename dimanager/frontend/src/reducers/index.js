import { combineReducers } from "redux";
import techs from "./techsReducer";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import examTypes from "./examTypes";
import shiftTimes from "./shiftTimes";
import locations from "./locations";
import rooms from "./rooms";
import shifts from "./shifts";
import modalities from "./modalities";
import modal from "./modal";

export default combineReducers({
  techsReducer: techs,
  examTypes,
  shiftTimes,
  errors,
  messages,
  auth,
  locations,
  rooms,
  shifts,
  modalities,
  modal
});
