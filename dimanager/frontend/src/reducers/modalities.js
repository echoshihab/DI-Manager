import { GET_MODALITY } from "../actions/types.js";

const initialState = {
  modalities: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MODALITY:
      return {
        ...state,
        modalities: action.payload
      };

    default:
      return state;
  }
}
