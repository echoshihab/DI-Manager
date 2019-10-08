import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";
import { GET_TECHS, DELETE_TECH, ADD_TECH } from "./types";

//GET TECHNOLOGISTS
export const getTechs = () => (dispatch, getState) => {
  axios
    .get("/api/techs/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TECHS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//ADD TECHNOLOGISTS
export const addTech = tech => (dispatch, getState) => {
  axios
    .post("/api/techs/", tech, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ techAdded: "Technologist Added" }));
      dispatch({
        type: ADD_TECH,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//DELETE TECHNOLOGISTS
export const deleteTech = id => (dispatch, getState) => {
  axios
    .delete(`/api/techs/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ techDeleted: "Technologist Deleted" }));
      dispatch({
        type: DELETE_TECH,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
