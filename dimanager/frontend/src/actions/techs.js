import axios from "axios";
import { createMessage, returnErrors } from "./messages";

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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
