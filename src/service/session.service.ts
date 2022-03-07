
import path from "path";
import { setDevLog, level } from "../utils/log";
const filename = path.basename(__filename);

import config from "config";
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

// get a UserSession
export async function getSession(userId: string, userAgent: string) {
  try {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
    throw new Error(error);
  }
}
