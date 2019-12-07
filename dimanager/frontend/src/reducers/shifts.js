import {
  SHIFT_ADDED,
  SHIFT_RETRIEVE,
  SHIFT_DELETED,
  CLEAR_SHIFT
} from "../actions/types.js";

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
    case SHIFT_DELETED:
      return {
        ...state,
        shifts: state.shifts.filter(shift => shift.id !== action.payload)
      };
    case CLEAR_SHIFT:
      return initialState;
    default:
      return state;
  }
}
