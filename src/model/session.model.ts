// src/model/session.model.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
import config from "config";

// Custom Functions from Lib ??

// Import Essential Librarys
import mongoose from "mongoose";
import { string } from "zod";

// Import Essential Services ??

// Import Essential Dto Classes ??

// Import Required Schemas ??

// Import Required Model ??
import { UserDocument } from "./user.model";


export interface SessionInputs {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  rememberDevice: boolean;
}
export interface SessionDocument extends SessionInputs, mongoose.Document {  
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String},
    rememberDevice: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Session = mongoose.model<SessionDocument>("Session", SessionSchema);

export default Session;