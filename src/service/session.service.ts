
import path from "path";
import { setDevLog, level } from "../utils/log";
const filename = path.basename(__filename);

// import { CreateSessionInput } from "../schema/session.schema";
import { Request } from "express"

import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import SessionModel, { SessionDocument, SessionInputs } from "../model/session.model";
import { signJwt, verifyJwt } from "../utils/auth/jwt.utils";


// Create a UserSession
export async function createSession(userId: string, req: Request) {
// export async function createSession(userId: string, req: CreateSessionInput, userAgent: string) {
  try {
    const session = await SessionModel.create(
      { user: userId,
        userAgent: req.get("user-agent") || "",
        // userAgent,
        valid: req.body.valid,
        rememberDevice: req.body.rememberDevice
      });
    return session.toJSON();
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
    throw new Error(error);
  }
}

// Validate a UserSession
export async function patchSession(query: FilterQuery<SessionDocument>) {
  try {
    return SessionModel.find(query).lean();
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
    throw new Error(error);
  }
}

// Delete a UserSession
export async function deleteSession(query: FilterQuery<SessionDocument>) {
  try {
    return SessionModel.find(query).lean();
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
    throw new Error(error);
  }
}

// find a UserSession detail by Id
export async function getSessionsbyId(query: FilterQuery<SessionDocument>) {
  try {
    return SessionModel.find(query).lean();
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
    throw new Error(error);
  }
}

// find all UserSessions
export async function getAllSessions(query: FilterQuery<SessionDocument>) {
  try {
    return SessionModel.find(query).lean();
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
    throw new Error(error);
  }
}


// ReIssue of accessToken
export async function reIssueAccessToken({refreshToken}: {refreshToken: string}) {
  try {
    return "";
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
    throw new Error(error);
  }
}
