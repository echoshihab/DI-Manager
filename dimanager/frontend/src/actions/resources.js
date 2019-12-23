import axios from "axios";
import { returnErrors } from "./messages";
import {
  GET_LOCATIONS,
  GET_ROOMS,
  ADD_ROOM,
  DELETE_ROOM,
  ADD_LOCATION,
  DELETE_LOCATION
} from "./types";
import { tokenConfig } from "./auth";

//GET locations
export const getLocations = () => (dispatch, getState) => {
  axios
    .get("/api/location/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_LOCATIONS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Add locations

export const addLocation = (locName, owner) => (dispatch, getState) => {
  let location = locName.toUpperCase();
  //request body
  const body = JSON.stringify({
    location,
    owner
  });

  axios
    .post("/api/location/", body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_LOCATION,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//DELETE locations
export const deleteLocation = id => (dispatch, getState) => {
  axios
    .delete(`/api/location/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_LOCATION,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//GET rooms

export const getRooms = location => (dispatch, getState) => {
  axios
    .get(`/api/rooms/?location=${location}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ROOMS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//ADD ROOMS

export const addRoom = (roomName, locationID) => (dispatch, getState) => {
  let room = roomName.toUpperCase();

  //request body
  const body = JSON.stringify({
    room,
    location: locationID
  });

  axios
    .post("/api/rooms/", body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_ROOM,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//DELETE ROOMS
export const deleteRoom = id => (dispatch, getState) => {
  axios
    .delete(`/api/rooms/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_ROOM,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
