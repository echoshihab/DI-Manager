import { GET_TECHS } from "../actions/types.js";

const initialState = {
  techs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload
      };
    default:
      return state;
  }
}
