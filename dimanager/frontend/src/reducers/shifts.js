import { SHIFT_ADDED } from "../actions/types.js";

const initialState = {
  shifts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHIFT_ADDED:
      return {
        ...state,
        shifts: action.payload
      };

    default:
      return state;
  }
}
