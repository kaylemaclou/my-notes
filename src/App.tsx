import React from "react";
import logo from "./logo.svg";
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
