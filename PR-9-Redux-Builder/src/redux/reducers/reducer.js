import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE, RESTORE_NOTE, PERM_DELETE_NOTE } from "../actions/actions";

const initialState = {
  notes: [],
  trash: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      };
    case EDIT_NOTE:
      return {
        ...state,
        notes: state.notes.map((note, index) =>
          index === action.payload.index ? action.payload.text : note
        )
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((_, index) => index !== action.payload),
        trash: [...state.trash, state.notes[action.payload]]
      };
    case RESTORE_NOTE:
      return {
        ...state,
        notes: [...state.notes, state.trash[action.payload]],
        trash: state.trash.filter((_, index) => index !== action.payload)
      };
    case PERM_DELETE_NOTE:
      return {
        ...state,
        trash: state.trash.filter((_, index) => index !== action.payload)
      };
    default:
      return state;
  }
};

export default reducer;

