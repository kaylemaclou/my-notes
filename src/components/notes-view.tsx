import React, { useEffect, useReducer } from "react";
import { Grid, Typography } from "@material-ui/core";
import { CloseOutlined, ThreeDRotation } from "@material-ui/icons";
import { Note } from "../model";
import NotesService from "../services/notes.service";
//import { notesReducer, NotesActions, NotesState } from "./notes-reducer";
import Storihoox from "../store/redoox";

const initialState = {
  notes: new Array<Note>(),
  isLoading: true,
};

export const NotesView: React.FC<{}> = () => {
  console.log("START: NotesView");
  //const [state, dispatch] = useReducer(notesReducer, initialState);

  const [store] = Storihoox.useData("isLoading", false);

  //const [store, storeProvider] = Storihoox.useStoreProvider();

  // //Inititally, obtain all the currently existing notes:
  // useEffect(() => {
  //   dispatch({ type: NotesActions.SET_LOADING, payload: { isLoading: true } });
  //   NotesService.getNotes()
  //     .then((notes) => {
  //       dispatch({
  //         type: NotesActions.SET_NOTES,
  //         payload: { notes: notes, isLoading: false },
  //       });
  //       dispatch({
  //         type: NotesActions.SET_LOADING,
  //         payload: { isLoading: false },
  //       });
  //     })
  //     .catch((error) => {
  //       return { ...store, error: error };
  //     });
  // }, []);

  console.log("store:", store);
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
          {store.isLoading === true ? (
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
