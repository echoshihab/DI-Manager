import { SHIFT_ADDED, SHIFT_RETRIEVE } from "../actions/types.js";

const initialState = {
  shifts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHIFT_RETRIEVE:
      return {
        ...state,
        shifts: action.payload
      };
    case SHIFT_ADDED:
      return {
        ...state,
        shifts: [...state.shifts, action.payload]
      };

    default:
      return state;
  }
}
