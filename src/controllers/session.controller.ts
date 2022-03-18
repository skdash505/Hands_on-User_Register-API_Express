// src/controller/session.controller.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
import config from "config";

// Custom Functions from Lib
import setCookies from "../libs/functions/setCookies";

// Import Essential Librarys
import { Request, Response, NextFunction } from "express";
import { get } from "lodash";

// Import Essential Services
import { validateUser } from "../service/user.service";
import { signJwt } from "../utils/auth/jwt.utils";
import { createSession, getSessions, patchSession, updateSession } from "../service/session.service";

// Import Essential Dto Classes ??

// Import Required Schemas
import { CreateSessionInput, SessionIDInput, SessionValidInput } from "../schema/session.schema";
import { CookiesnInput } from "../schema/cookies.schema";

// Import Other ??


// Create a UserSession
export async function createUserSessionHandler(
  req: Request<any, any, CreateSessionInput["body"]>,
  // req: Request<any, any, CreateSessionInput["body"], CreateSessionInput["params"]>, 
  res: Response<any, CookiesnInput["cookies"]>, next: NextFunction) {
  try {
    // validate the email and password
    const user = await validateUser(req.body);
    if (!user) {
      setDevLog(filename, level.WARN, `Invalid username or password.`);
      return res.status(401).send(`Invalid username or password`);
    }

    // Create a session
    const session = await createSession(user._id, req);

    // create access token
    const accessToken = await signJwt(
      { ...user, session: session._id }, "accessTokenPrivateKey", config.get("accessTokenExp"));
    setCookies(filename, "accessToken", accessToken, res, next, {
      age: undefined,
      expaire: config.get<number>("accessSessionExp"),
      // age: config.get<number>("accessSessionExp"),
      // expaire: undefined,
      http: true,
      sescure: false,
      path: undefined,
    });

    // create refresh token
    var refreshToken: any
    if (req.body.rememberDevice) {
      refreshToken = await signJwt(
        { session: session._id }, "refreshTokenPrivateKey", config.get("refreshTokenExp"));
      setCookies(filename, "refreshToken", refreshToken, res, next, {
        age: undefined,
        expaire: config.get<number>("refreshSessionExp"),
        http: true,
        sescure: false,
        path: undefined,
      });
    }

    // send refresh & access token back
    setDevLog(filename, level.DEBUG, `Relation of AccessToklen and RefreshToken are ${accessToken==refreshToken}`);
    if (accessToken && refreshToken) {
      setDevLog(filename, level.MARK, `Session created SuccessFully with both Token.`);
      return res
        .status(200)
        .send({
          message: `Token generated Successfully`,
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken
          }
        });
    } else if (accessToken && !refreshToken) {
      setDevLog(filename, level.INFO, `Session created SuccessFully with accessToken Only.`);
      return res
        .status(200)
        .send({
          message: `Token generated Successfully`,
          data: {
            accessToken: accessToken
          }
        });
    } else {
      setDevLog(filename, level.ERROR, `Failed to Create Session.`);
      return res.status(405).send({
        message: `Failed to generate Token`,
        data: {}
      });
    }
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at createUserSessionHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// Validate Current UserSession
export async function patchUserSessionHandler(req: Request, res: Response) {
  try {
    // const userId = await res.locals.user._id;
    // const sessions = await getSessions({user: userId});
    const sessionId = await res.locals.user.session;
    const sessions = await patchSession({_id: sessionId});
    if (sessions?.valid){
      setDevLog(filename, level.INFO, `Sessions Validated Successfully.`);
      return res.status(200).send({
        message: `Sessions Validated Successfully.`,
        data: sessions
      });
    } else {
      setDevLog(filename, level.INFO, `Current user Session is invalid.`);
      return res.status(309).send({
        message: `Current user Session is invalid.`,
        data: sessions
      });
    }
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at patchUserSessionHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// Delete a UserSession
export async function deleteUserSessionHandler(req: Request, res: Response) {
  try {
    const sessionId = await res.locals.user.session;
    const updatedSessions = await updateSession({ _id: sessionId }, { valid: false });

    if (updatedSessions.modifiedCount === 1 && updatedSessions.matchedCount === 1) {
      setDevLog(filename, level.MARK, `Sessions Deleted Successfully`);
      return res.status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .send({
          message: `Sessions Deleted Successfully`,
          data: updatedSessions
        });
    } else if (updatedSessions.matchedCount === 1 && updatedSessions.modifiedCount === 0) {
      setDevLog(filename, level.ERROR, `Unable to Deleted the Sessions`);
      return res.status(409).send({
        message: `Unable to Deleted the Sessions`,
        data: updatedSessions
      });
    } else if (updatedSessions.matchedCount === 0) {
      setDevLog(filename, level.ERROR, `No Session found`);
      return res.status(404).send({
        message: `No Session found`,
        data: updatedSessions
      });
    } else {
      setDevLog(filename, level.WARN, `Error occured when deleting the current Session`);
      return res.status(404).send({
        message: `Error occured when deleting the current Session`,
        data: updatedSessions
      });
    }

    // setDevLog(filename, level.INFO, `Sessions Deleted Successfully.`);
    // return res.status(200).send(updatedSessions);
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at deleteUserSessionHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// find all UserSessions
export async function getUserSessionHandler(req: Request<any, any, SessionValidInput["body"]>, res: Response) {
  try {
    const userId = await res.locals.user._id;
    const sessions = await getSessions({ user: userId, valid: req.body.valid });
    setDevLog(filename, level.INFO, `All Sessions Found Successfully with Valid type: ${req.body.valid}`);
    return res.status(200).send({
      message: `All Sessions Found Successfully with Valid type: ${req.body.valid}`,
      data: sessions
    });
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at getUserSessionHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// find a UserSession detail by ID
export async function getUserSessionbyIdHandler(req: Request<any, any, any, SessionIDInput["params"]>, res: Response) {
  try {
    const sessions = await getSessions({ _id: req.params._id });
    setDevLog(filename, level.INFO, `Session with id: ${req.params._id} Found.`);
    return res.status(200).send({
      message: `Session with id: ${req.params._id} Found.`,
      data: sessions
    });

  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at getUserSessionHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}