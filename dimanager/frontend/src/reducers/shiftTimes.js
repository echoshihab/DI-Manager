import { GET_SHIFTTIMES, BUILD_SHIFTTIMES } from "../actions/types.js";

const initialState = {
  shiftTimes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SHIFTTIMES:
      return {
        ...state,
        shiftTimes: action.payload
      };
    case BUILD_SHIFTTIMES:
      console.log(action.payload);
      return {
        ...state,
        shifttIMES: [...state.shiftTimes, action.payload]
      };

    default:
      return state;
  }
}
