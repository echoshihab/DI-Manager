import { VIEW_DAY } from "../actions/types";

const initialState = {
  dayview: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VIEW_DAY:
      return {
        ...state,
        dayview: action.payload
      };
    default:
      return state;
  }
}
