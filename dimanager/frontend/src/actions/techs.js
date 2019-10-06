import axios from "axios";

import { GET_TECHS } from "./types";

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
