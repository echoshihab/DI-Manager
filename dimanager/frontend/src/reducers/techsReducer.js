import { GET_TECHS, DELETE_TECH, ADD_TECH } from "../actions/types.js";

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
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload]
      };

    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter(tech => tech.id !== action.payload)
      };
    default:
      return state;
  }
}
