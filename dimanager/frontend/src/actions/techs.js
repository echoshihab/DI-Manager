import axios from "axios";

import { GET_TECHS, DELETE_TECH, ADD_TECH } from "./types";

//GET TECHNOLOGISTS
export const getTechs = () => dispatch => {
  axios
    .get("/api/techs/")
    .then(res => {
      dispatch({
        type: GET_TECHS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const addTech = tech => dispatch => {
  axios
    .post("/api/techs/", tech)
    .then(res => {
      dispatch({
        type: ADD_TECH,
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
