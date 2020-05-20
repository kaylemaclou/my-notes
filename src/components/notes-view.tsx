import React, { useEffect, useReducer } from "react";
import { Grid, Typography } from "@material-ui/core";
import { CloseOutlined, ThreeDRotation } from "@material-ui/icons";
import { Note } from "../model";
import NotesService from "../services/notes.service";
import { notesReducer, NotesActions } from "./notes-reducer";

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
    dispatch({ type: NotesActions.SET_LOADING, payload: { isLoading: true } });
    NotesService.getNotes()
      .then((notes) => {
        console.log(notes);
        console.log("-----------");
        dispatch({
          type: NotesActions.SET_NOTES,
          payload: { notes: notes, isLoading: false },
        });
        dispatch({
          type: NotesActions.SET_LOADING,
          payload: { isLoading: false },
        });
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
            <Typography>Loading...</Typography>
          ) : (
            <Typography></Typography>
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
