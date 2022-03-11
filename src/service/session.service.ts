// src/service/session.service.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
import config from "config";

// Custom Functions from Lib ??

// Import Essential Librarys
import { Request, Response } from "express";
import { isEmpty, get, omit } from "lodash";
import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose";

// Import Essential Services
import SessionModel, { SessionDocument, SessionInputs } from "../model/session.model";
import { signJwt, verifyJwt } from "../utils/auth/jwt.utils";
import { findUser } from "./user.service";

// Import Essential Dto Classes ??

// Import Required Schemas ??
// import { CreateSessionInput } from "../schema/session.schema";

// Import Other ??


// Create a UserSession
export async function createSession(userId: string, req: Request) {
  // export async function createSession(userId: string, req: CreateSessionInput, userAgent: string) {
  try {
    const session = await SessionModel.create(
      {
        user: userId,
        userAgent: req.get("user-agent") || "",
        // userAgent,
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

// Update a UserSession
export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  try {
    return SessionModel.updateOne(query, update).lean();
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at updateSession is: ${error.message}`);
    throw new Error(error);
  }
}

// find UserSessions with given Query
export async function getSessions(query: FilterQuery<SessionDocument>) {
  try {
    return SessionModel.find(query).lean();
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
    throw new Error(error);
  }
}

// // find all UserSessions
// export async function getAllSessions(query: FilterQuery<SessionDocument>) {
//   try {
//     return SessionModel.find(query).lean();
//   } catch (error: any) {
//     setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
//     throw new Error(error);
//   }
// }

// // find a UserSession detail by Id
// export async function getSessionsbyId(query: FilterQuery<SessionDocument>) {
//   try {
//     return SessionModel.find(query).lean();
//   } catch (error: any) {
//     setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
//     throw new Error(error);
//   }
// }


// ReIssue of accessToken
export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
  try {
    // Get decoded Dta from Token and check for valid "ID"
    const { decoded } = await verifyJwt(refreshToken);
    if (!decoded || !get(decoded, 'session')) {
    // if (!decoded || !get(decoded, '_id')) {
      setDevLog(filename, level.WARN, `Token Doesn't Contains Valid Data and Id`);
      return false;
    }
    console.log(get(decoded, 'session'));
    // console.log(get(decoded, '_id'));

    // find session with decoded "ID" and check for valid as "true"
    const query: FilterQuery<SessionDocument> = { _id: get(decoded, 'session')};
    // const query: FilterQuery<SessionDocument> = { _id: get(decoded, '_id')};
    const session = await SessionModel.findOne(query);
    // const session = await SessionModel.findById(get(decoded, 'session'));
    // const session = await SessionModel.findById(get(decoded, '_id'));
    if (!session || !session.valid) {
      setDevLog(filename, level.WARN, `Token Doesn't Contains Valid Session.`);
      return false;
    }

    // find userDetails from session and check for valid as "User"
    const user = await findUser({ _id: session.user })
    if (!user) {
      setDevLog(filename, level.WARN, `Token Doesn't Contains Valid User.`);
      return false;
    }

    // Create A new AccessToken
    const accessToken = await signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenExp") } // in minutes
    );
    return accessToken;

  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createSession is: ${error.message}`);
    throw new Error(error);
  }
}
