import axios from "axios";
import { returnErrors } from "./messages";
import {
  GET_LOCATIONS,
  GET_ROOMS,
  ADD_LOCATION,
  DELETE_LOCATION
} from "./types";
import { tokenConfig } from "./auth";

//GET locations
export const getLocations = () => dispatch => {
  axios
    .get("/api/location/")
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

export const addLocation = location => dispatch => {
  //config
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //request body
  const body = JSON.stringify({
    location
  });

  axios
    .post("/api/location/", body, config)
    .then(res => {
      dispatch({
        type: ADD_LOCATION,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
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

export const getRooms = location => dispatch => {
  axios
    .get(`/api/rooms/?location=${location}`)
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
