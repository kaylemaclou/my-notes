import { Note } from "../../functions/src/model";

export default new (class NotesService {
  notesUri: string = `https://us-central1-my-notes-manager.cloudfunctions.net/notes`;
  //TODO: Move these URIs to a dev/test/prod environment constants file.

  // Obtains all the notes:
  async getNotes(): Promise<Array<Note>> {
    try {
      const response = await fetch(this.notesUri);
      const notesPromise = await response.json();
      return notesPromise;
    } catch (error) {
      const errorMessage = `Unable to obtain notes. ${error.message}`;
      throw new Error(errorMessage);
    }
  }

  // Adds a new note:
  async addNote(newNote: Note): Promise<Note> {
    try {
      const requestOptions = {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newNote),
      };
      const response = await fetch(this.notesUri, requestOptions);
      const addedNotePromise = await response.json();
      return addedNotePromise;
    } catch (error) {
      const errorMessage = `Unable to add new note.`;
      throw new Error(errorMessage);
    }
  }

  // Deletes a note:
  async deleteNote(noteId: string): Promise<string> {
    try {
      const requestOptions = {
        method: "delete",
      };
      const response = await fetch(
        `${this.notesUri}?id=${noteId}`,
        requestOptions
      );
      const deletedNoteIdPromise = await response.text();
      return deletedNoteIdPromise;
    } catch (error) {
      const errorMessage = `Unable to delete note.`;
      throw new Error(errorMessage);
    }
  }

  // Updates an existing note:
  async updateNote(updatedNote: Note): Promise<Note> {
    try {
      const requestOptions = {
        method: "put",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      };
      const response = await fetch(this.notesUri, requestOptions);
      const updatedNotePromise = await response.json();
      return updatedNotePromise;
    } catch (error) {
      const errorMessage = `Unable to update note.`;
      throw new Error(errorMessage);
    }
  }
})();
