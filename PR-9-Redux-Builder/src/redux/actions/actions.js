export const ADD_NOTE = "ADD_NOTE";
export const EDIT_NOTE = "EDIT_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const RESTORE_NOTE = "RESTORE_NOTE";
export const PERM_DELETE_NOTE = "PERM_DELETE_NOTE";

export const addNote = (text) => ({
  type: ADD_NOTE,
  payload: text,
});

export const editNote = (index, text) => ({
  type: EDIT_NOTE,
  payload: { index, text },
});

export const deleteNote = (index) => ({
  type: DELETE_NOTE,
  payload: index,
});

export const restoreNote = (index) => ({
  type: RESTORE_NOTE,
  payload: index,
});

export const permDeleteNote = (index) => ({
  type: PERM_DELETE_NOTE,
  payload: index,
});