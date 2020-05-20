import React, { useEffect, useReducer } from "react";
import { Grid, Typography } from "@material-ui/core";
import { CloseOutlined, ThreeDRotation } from "@material-ui/icons";
import { Note } from "../model";
import NotesService from "../services/notes.service";

type State = {
  notes?: Array<Note>;
  isLoading?: boolean;
  error?: Error;
};

enum Actions {
  SET_LOADING,
  GET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
}

type ActionType = {
  type:
    | Actions.SET_LOADING
    | Actions.GET_NOTES
    | Actions.ADD_NOTE
    | Actions.UPDATE_NOTE
    | Actions.DELETE_NOTE;
};

const notesReducer = (state: State, action: ActionType): State => {
  let newState: State = {};

  switch (action.type) {
    case Actions.SET_LOADING:
      newState = { ...state, isLoading: true };
      break;
    case Actions.GET_NOTES:
      console.log("getNotes-----------");
      NotesService.getNotes()
        .then((notes) => {
          console.log(notes);
          console.log("-----------");
          newState = { ...state, isLoading: false, notes };
        })
        .catch((error) => {
          newState = { ...state, error };
        });
      break;
    default:
      newState = state;
  }
  return newState;
};

export const NotesView: React.FC<{}> = () => {
  //
  const initialState = {
    notes: new Array<Note>(),
    isLoading: false,
  };
  const [state, dispatch] = useReducer(notesReducer, initialState);

  // Inititally, obtain all the currently existing notes:
  useEffect(() => {
    dispatch({ type: Actions.SET_LOADING });
    dispatch({ type: Actions.GET_NOTES });
  }, []);

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={4}>
          <div>
            <ThreeDRotation />
          </div>
          <Typography>Filled</Typography>
          <CloseOutlined />
        </Grid>
      </Grid>
      {state.isLoading ? <Typography>Loading...</Typography> : null}
    </React.Fragment>
  );
};

// console.log("add note");
// const newNote = new Note("I have created this new message.");
// NotesService.addNote(newNote).then((addedNote) => {
//   console.log(addedNote);
//   console.log("-----------");
// });

// console.log("delete note");
// NotesService.deleteNote("zII1wRPnrHOUIq8ZKSye").then((deletedNoteId) => {
//   console.log(deletedNoteId);
//   console.log("-----------");
// });

// console.log("update note");
// const updatedNote: Note = {
//   content: "I have created this new message. UPDATED NOTE!",
//   createdWhen: new Date("2020-05-19T16:47:06.643Z"),
//   id: "0eUxOul0TX2uzQCxVTut",
// };

// NotesService.updateNote(updatedNote).then((updatedNote) => {
//   console.log(updatedNote);
//   console.log("-----------");
// });
