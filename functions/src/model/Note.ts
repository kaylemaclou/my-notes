export class Note {
  id: string;
  createdWhen: Date;
  content: string;

  constructor(
    content: string = "Please add note here!",
    createdWhen: Date = new Date(),
    id: string = ""
  ) {
    this.createdWhen = createdWhen;
    this.content = content;
    this.id = id;
  }
} //
