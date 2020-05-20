import * as functions from "firebase-functions";
import * as url from "url";
import { Note } from "./model";
import FirestoreCollection from "./firestore/firestore-collection";

// CORS middleware.
const cors = require("cors")({
  origin: true,
});

// "/notes" REST endpoint:
export const notes = functions.https.onRequest(async (request, response) => {
  // Enable CORS using the `cors` express middleware.
  return cors(request, response, async () => {
    const queryParameters: object = url.parse(request.url, true).query;

    switch (request.method) {
      case "GET":
        try {
          // obtain all the notes from the Firestore database,
          const notesCollection = new FirestoreCollection<Note>("notes");
          const notesData: Array<Note> = await notesCollection.getAllDocuments();

          response.status(200).json(notesData);
        } catch (error) {
          //TODO: Concatenate a more meaningful error message.
          response.status(500).send(error);
          console.log(error);
        }
        break;

      case "POST":
        try {
          // obtain the new note from the request's body,
          let newNote: Note = request.body;
          if (!newNote)
            throw new Error(
              `Expected new note not found in HTTP request's body!`
            );

          // add the new note to the Firestore database,
          const notesCollection = new FirestoreCollection<Note>("notes");
          newNote = await notesCollection.addDocument(newNote);

          response.status(200).json(newNote);
        } catch (error) {
          //TODO: Concatenate a more meaningful error message.
          response.status(500).send(error);
          console.log(error);
        }
        break;

      case "PUT":
        try {
          // obtain the updated note from the request's body,
          let updatedNote: Note = request.body;
          if (!updatedNote)
            throw new Error(
              `Expected updated note not found in HTTP request's body!`
            );

          // update the note within the Firestore database,
          const notesCollection = new FirestoreCollection<Note>("notes");
          await notesCollection.updateDocument(updatedNote);

          response.status(200).json(updatedNote);
        } catch (error) {
          //TODO: Concatenate a more meaningful error message.
          response.status(500).send(error);
          console.log(error);
        }
        break;

      case "DELETE":
        try {
          // obtain the new note's content from the query-string parameter,
          //@ts-ignore
          const id: string = queryParameters["id"];
          if (!id)
            throw new Error(`Expected ID parameter not found in query-string!`);

          // delete the note corresponding to the ID, from the Firestore database,
          const notesCollection = new FirestoreCollection<Note>("notes");
          await notesCollection.deleteDocument(id);
          response.status(200).send(id);
        } catch (error) {
          //TODO: Concatenate a more meaningful error message.
          response.status(500).send(error);
          console.log(error);
        }
        break;
    }
  });
});
//
