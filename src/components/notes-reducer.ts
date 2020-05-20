import { Note } from "../model";

export type NotesState = {
  notes?: Array<Note>;
  isLoading?: boolean;
  error?: Error;
};

export enum NotesActions {
  SET_LOADING,
  SET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
}

export type NotesActionType = {
  type:
    | NotesActions.SET_LOADING
    | NotesActions.SET_NOTES
    | NotesActions.ADD_NOTE
    | NotesActions.UPDATE_NOTE
    | NotesActions.DELETE_NOTE;
  payload: {
    notes?: Array<Note>;
    note?: Note;
    isLoading?: boolean;
    error?: Error;
  };
};

export const notesReducer = (
  state: NotesState,
  action: NotesActionType
): NotesState => {
  console.log("ACTION: " + action.type, state);
  switch (action.type) {
    case NotesActions.SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading };
    case NotesActions.SET_NOTES:
      console.log("getNotes-----------");
      return { ...state, notes: action.payload.notes };

      break;
    default:
      throw new Error(`Invalid action sent to reducer`);
  }

  return state;
};
