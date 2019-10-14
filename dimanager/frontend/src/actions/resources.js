import axios from "axios";
import { returnErrors } from "./messages";
import { GET_LOCATIONS, GET_ROOMS } from "./types";

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
