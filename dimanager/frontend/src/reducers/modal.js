import { DUPLICATE_ITEMS, OVERRIDE_ITEMS } from "../actions/types.js";

const initialState = {
  modal: false,
  values: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DUPLICATE_ITEMS:
      return {
        ...state,
        values: action.payload,
        modal: !state.modal
      };
    case OVERRIDE_ITEMS: {
      return {
        ...state,
        values: [],
        modal: !state.modal
      };
    }

    default:
      return state;
  }
}
