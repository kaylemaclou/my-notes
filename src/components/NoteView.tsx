import React from "react";
import { Note } from "../model";

interface NoteProps extends Note {}

export const NoteView: React.FC<NoteProps> = ({ id, createdWhen, content }) => (
  <React.Fragment></React.Fragment>
);
