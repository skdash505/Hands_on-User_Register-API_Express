// src/model/user.model.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
import config from "config";

// Custom Functions from Lib ??

// Import Essential Librarys
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { string } from "zod";

// Import Essential Services ??

// Import Essential Dto Classes ??

// Import Required Schemas ??

// Import Required Model ??

// Import Other ??


export interface UserInputs {
  email: string;
  userName: string;
  name: string;
  password: string;
}
export interface UserDocument extends UserInputs, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true, },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    const user = this as UserDocument;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // Random additional data
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password, salt);

    // Replace the password with the hash
    user.password = hash;

    return next();
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at preSave is: ${error.message}`);
    throw new Error(error);
  }
});

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at comparePassword is: ${error.message}`);
    throw new Error(error);
  }
};

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;