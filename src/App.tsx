import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { CloseOutlined, ThreeDRotation } from "@material-ui/icons";
import "./App.css";
import { Note } from "./model";
import NotesService from "./services/notes.service";

function App() {
  console.log("get notes");
  NotesService.getNotes().then((notes) => {
    console.log(notes);
    console.log("-----------");
  });

  console.log("add note");
  const newNote = new Note("I have created this new message.");
  NotesService.addNote(newNote).then((addedNote) => {
    console.log(addedNote);
    console.log("-----------");
  });

  console.log("delete note");
  NotesService.deleteNote("zII1wRPnrHOUIq8ZKSye").then((deletedNoteId) => {
    console.log(deletedNoteId);
    console.log("-----------");
  });

  console.log("update note");
  const updatedNote: Note = {
    content: "I have created this new message. UPDATED NOTE!",
    createdWhen: new Date("2020-05-19T16:47:06.643Z"),
    id: "0eUxOul0TX2uzQCxVTut",
  };

  NotesService.updateNote(updatedNote).then((updatedNote) => {
    console.log(updatedNote);
    console.log("-----------");
  });

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={4}>
          <div>
            <ThreeDRotation />
          </div>
          <Typography>Filled</Typography>
          <CloseOutlined />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
