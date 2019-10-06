import axios from "axios";

import { GET_TECHS, DELETE_TECH } from "./types";

//GET TECHNOLOGISTS
export const getTechs = () => dispatch => {
  axios
    .get("/api/techs/")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_TECHS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//DELETE TECHNOLOGISTS
export const deleteTech = id => dispatch => {
  axios
    .delete(`/api/techs/${id}/`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: DELETE_TECH,
        payload: id
      });
    })
    .catch(err => console.log(err));
};
