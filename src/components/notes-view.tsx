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
  SET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
}

type ActionType = {
  type:
    | Actions.SET_LOADING
    | Actions.SET_NOTES
    | Actions.ADD_NOTE
    | Actions.UPDATE_NOTE
    | Actions.DELETE_NOTE;
  payload: {
    notes?: Array<Note>;
    note?: Note;
    isLoading?: boolean;
    error?: Error;
  };
};

const notesReducer = (state: State, action: ActionType): State => {
  console.log("ACTION: " + action.type, state);

  switch (action.type) {
    case Actions.SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading };
    case Actions.SET_NOTES:
      console.log("getNotes-----------");
      return { ...state, notes: action.payload.notes };

      break;
    default:
      throw new Error(`Invalid action sent to reducer`);
  }

  return state;
};

//
const initialState = {
  notes: new Array<Note>(),
  isLoading: true,
};

export const NotesView: React.FC<{}> = () => {
  console.log("START: NotesView");
  const [state, dispatch] = useReducer(notesReducer, initialState);

  //Inititally, obtain all the currently existing notes:
  useEffect(() => {
    console.log("USE EFFECT RAN!");
    dispatch({ type: Actions.SET_LOADING, payload: { isLoading: true } });
    NotesService.getNotes()
      .then((notes) => {
        console.log(notes);
        console.log("-----------");
        dispatch({
          type: Actions.SET_NOTES,
          payload: { notes: notes, isLoading: false },
        });
        dispatch({ type: Actions.SET_LOADING, payload: { isLoading: false } });
      })
      .catch((error) => {
        return { ...state, error: error };
      });
  }, []);

  console.log("state:", state);
  return (
    <React.Fragment>
      <div>
        {/*<Grid container>
          <Grid item xs={4}>
            <div>
              <ThreeDRotation />
            </div>
            <Typography>Filled</Typography>
            <CloseOutlined />
          </Grid>
        </Grid>*/}
        <div>
          {state.isLoading === true ? (
            <Typography>{state.isLoading + ""}</Typography>
          ) : (
            <Typography>done</Typography>
          )}
        </div>
      </div>
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
