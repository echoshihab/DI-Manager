import {
  GET_SHIFTTIMES,
  BUILD_SHIFTTIMES,
  DELETE_SHIFTTIME
} from "../actions/types.js";

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
      return {
        ...state,
        shiftTimes: [...state.shiftTimes, action.payload]
      };
    case DELETE_SHIFTTIME:
      return {
        ...state,
        shiftTimes: state.shiftTimes.filter(
          shiftTime => shiftTime.id !== action.payload
        )
      };

    default:
      return state;
  }
}
