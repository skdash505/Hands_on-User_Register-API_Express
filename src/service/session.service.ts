
import path from "path";
import { setDevLog, level } from "../utils/log";
const filename = path.basename(__filename);

import config from "config";
import { FilterQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import { signJwt } from "../utils/auth/jwt.utils";

// Create a UserSession
export async function createSession(userId: string, userAgent: string) {
  try {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
    throw new Error(error);
  }
}

// find a UserSession
export async function getAllSessions(query: FilterQuery<SessionDocument>) {
  try {
    return SessionModel.find(query).lean();
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
    throw new Error(error);
  }
}
