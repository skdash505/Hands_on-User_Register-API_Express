// src/model/session.model.ts

import mongoose from "mongoose";
import { string } from "zod";
import { UserDocument } from "./user.model";

export interface SchemaDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
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

const Session = mongoose.model<UserDocument>("Session", SessionSchema);

export default Session;