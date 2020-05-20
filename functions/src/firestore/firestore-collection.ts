import * as admin from "firebase-admin";
admin.initializeApp();

// Implements the functionality required of a Firestore collections:
export default class FirestoreCollection<T> {
  private firestore: any;
  private pathToCollection: string;

  constructor(pathToCollection: string = "") {
    this.firestore = admin.firestore();
    this.pathToCollection = pathToCollection;
  }

  // Obtains all the documents within the collection:
  async getAllDocuments() {
    const query = await this.firestore.collection(this.pathToCollection).get();
    const documents = await query.docs;
    const data: Array<T> = documents.map((document: any) => {
      const documentData = document.data();
      return { ...documentData, id: document.id };
    });
    return data;
  }

  // Adds the specified document to the collection:
  async addDocument(document: T): Promise<T> {
    // create a new document within the collection,
    const docRef: any = await this.firestore
      .collection(this.pathToCollection)
      .add(document);

    // obtain the ID of the new document.
    //@ts-ignore
    document["id"] = docRef.id;
    return document;
  }

  // Updates the specified document within the collection:
  updateDocument(document: T): Promise<T> {
    // obtain the ID of the new document,
    //@ts-ignore
    const documentID: string = document["id"];

    // update the document within the collection.
    return this.firestore
      .collection(this.pathToCollection)
      .doc(documentID)
      .update(document);
  }

  // Deletes the specified document from the collection:
  deleteDocument(documentID: string): Promise<T> {
    return this.firestore
      .collection(this.pathToCollection)
      .doc(documentID)
      .delete();
  }
}
//
