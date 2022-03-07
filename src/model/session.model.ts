// src/model/session.model.ts

import mongoose from "mongoose";
import { string } from "zod";
import { UserDocument } from "./user.model";

export interface SessionInputs {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
}
export interface SessionDocument extends SessionInputs, mongoose.Document {  
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String}
  },
  { timestamps: true }
);

const Session = mongoose.model<SessionDocument>("Session", SessionSchema);

export default Session;