// src/controller/session.controller.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
import config from "config";

// Custom Functions from Lib
import setAccessToken from "../libs/functions/setAccessToken";
import setRefreshToken from "../libs/functions/setRefreshToken";

// Import Essential Librarys
import { Request, Response } from "express";
import { isEmpty, omit } from "lodash";

// Import Essential Services
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/auth/jwt.utils";
import { createSession, deleteSession, getAllSessions, getSessionsbyId, patchSession } from "../service/session.service";

// Import Required Schemas
import { CreateSessionInput, SessionIDInput } from "../schema/session.schema";
import { CookiesnInput } from "../schema/cookies.schema";

// Create a UserSession
export async function createUserSessionHandler(
  req: Request<any, any, CreateSessionInput["body"]>, 
  // req: Request<any, any, CreateSessionInput["body"], CreateSessionInput["params"]>, 
  res: Response<any, CookiesnInput["cookies"]>) {
  try {
    // validate the email and password
    const user = await validatePassword(req.body);
    if (!user) {
      setDevLog(filename, level.WARN, `Invalid username or password.`);
      return res.status(401).send(`Invalid username or password`);
    }

    // Create a session
    const session = await createSession(user._id, req);
    // const session = await createSession(user._id, req, req.get("user-agent") || "");

    // create access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenExp") } // 15 minutes
    );
    setAccessToken(
      accessToken,
      config.get<number>("accessSessionExp"),
      res,
      filename, setDevLog, level
    );
    // if (accessToken) {
    //   setDevLog(filename, level.MARK, `Sending accessToken in Cookies.`);
    //   res.cookie(
    //     "accessToken", accessToken,
    //     {
    //       maxAge: config.get<number>("accessSessionExp") * (60 * 1000),
    //       httpOnly: true
    //     });
    // }

    // create refresh token
    var refreshToken: any
    if (req.body.rememberDevice) {
    // if (Boolean(Number(req.params.rememberDevice))) {
      refreshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("refreshTokenExp") } // 1 year
      );
      setRefreshToken(
        refreshToken,
        config.get<number>("refreshSessionExp"),
        res,
        filename, setDevLog, level
      );
      // if (refreshToken) {
      //   setDevLog(filename, level.MARK, `Sending refreshToken in Cookies.`);
      //   res.cookie(
      //     "refreshToken", refreshToken,
      //     {
      //       expires: new Date(Date.now() + config.get<number>("refreshSessionExp") * (24 * 60 * 60 * 1000)),
      //       httpOnly: true
      //     });
      // }
    }

    // send refresh & access token back
    if (accessToken && refreshToken) {
      setDevLog(filename, level.MARK, `Session created SuccessFully with both Token.`);
      return res
        .status(200)
        .send({
          message: `Token generated Successfully`,
          data: {
            accessToken: accessToken,
            // refreshToken: refreshToken
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

  // Validate a UserSession
export async function patchUserSessionHandler(req: Request, res: Response) {
  try {
    // validate the email and password
    const userId = await res.locals.user._id;
    const sessions = await patchSession({ user: userId, valid: true });
    setDevLog(filename, level.INFO, `All Sessions Found Successfully.`);
    return res.status(200).send(sessions);

  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at getUserSessionHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// Delete a UserSession
export async function deleteUserSessionHandler(req: Request, res: Response) {
  try {
    // validate the email and password
    const userId = await res.locals.user._id;
    const sessions = await deleteSession({ user: userId, valid: true });
    setDevLog(filename, level.INFO, `All Sessions Found Successfully.`);
    return res.status(200).send(sessions);

  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at getUserSessionHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// find a UserSession detail by ID
export async function getUserSessionbyIdHandler(req: Request, res: Response) {
  try {
    // validate the email and password
    const userId = await res.locals.user._id;
    const sessions = await getSessionsbyId({ user: userId, valid: true });
    setDevLog(filename, level.INFO, `All Sessions Found Successfully.`);
    return res.status(200).send(sessions);

  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at getUserSessionHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}

// find all UserSessions
export async function getUserSessionHandler(req: Request, res: Response) {
  try {
    // validate the email and password
    const userId = await res.locals.user._id;
    const sessions = await getAllSessions({ user: userId, valid: true });
    setDevLog(filename, level.INFO, `All Sessions Found Successfully.`);
    return res.status(200).send(sessions);

  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at getUserSessionHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}