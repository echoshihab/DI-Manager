import { GET_EXAMTYPES, ADD_EXAMTYPE } from "../actions/types.js";

const initialState = {
  examTypes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXAMTYPES:
      return {
        ...state,
        examTypes: action.payload
      };
    case ADD_EXAMTYPE:
      return {
        ...state,
        examTypes: [...state.examTypes, action.payload]
      };

    default:
      return state;
  }
}
