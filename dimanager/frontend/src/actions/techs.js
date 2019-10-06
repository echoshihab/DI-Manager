import axios from "axios";
import { createMessage } from "./messages";

import { GET_TECHS, DELETE_TECH, ADD_TECH, GET_ERRORS } from "./types";

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

//ADD TECHNOLOGISTS
export const addTech = tech => dispatch => {
  axios
    .post("/api/techs/", tech)
    .then(res => {
      dispatch(createMessage({ techAdded: "Technologist Added" }));
      dispatch({
        type: ADD_TECH,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

//DELETE TECHNOLOGISTS
export const deleteTech = id => dispatch => {
  axios
    .delete(`/api/techs/${id}/`)
    .then(res => {
      dispatch(createMessage({ techDeleted: "Technologist Deleted" }));
      dispatch({
        type: DELETE_TECH,
        payload: id
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};
