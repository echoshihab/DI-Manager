import { GET_LOCATIONS } from "../actions/types.js";

const initialState = {
  locations: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload
      };

    default:
      return state;
  }
}
