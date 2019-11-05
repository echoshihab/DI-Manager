import { GET_ROOMS, ADD_ROOM, DELETE_ROOM } from "../actions/types.js";

const initialState = {
  rooms: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload
      };
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload]
      };
    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter(room => room.id !== action.payload)
      };

    default:
      return state;
  }
}
