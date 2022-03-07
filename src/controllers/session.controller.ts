// src/controller/session.controller.ts

import path from "path";
import { setDevLog, level } from "../utils/log";
const filename = path.basename(__filename);

import config from "config";

import { Request, Response } from "express";
import { isEmpty, omit } from "lodash";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/auth/jwt.utils";
import { createSession, getAllSessions } from "../service/session.service";
import { SessionInput } from "../schema/session.schema";

// Create a UserSession
export async function createUserSessionHandler(req: Request<any, any, SessionInput["body"], SessionInput["query"]>, res: Response) {
  try {
    // validate the email and password
    const user = await validatePassword(req.body);
    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );
    if (accessToken) {
      res.cookie(
        "accessToken", accessToken,
        {
          maxAge: 10 * 60 * 1000,
          httpOnly: true
        });
    }

    // create refresh token
    var refreshToken: any
    if (Boolean(Number(req.query.rememberDevice))) {
      refreshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("refreshTokenTtl") } // 1 year
      );
      if (accessToken) {
        res.cookie(
          "refreshToken", refreshToken,
          {
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            httpOnly: true
          });
      }
    }

    // send refresh & access token back
    if (accessToken && refreshToken) {
      return res
        .status(200)
        .send({
          message: `Token generated Successfully`,
          data: {
            // accessToken: accessToken,
            // refreshToken: refreshToken
          }
        });
    } else if (accessToken && !refreshToken) {
      return res
        .status(200)
        .send({
          message: `Token generated Successfully`,
          data: {
            // accessToken: accessToken
          }
        });
    } else {
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

// find a UserSession
export async function getUserSessionHandler(req: Request, res: Response) {
  try {
    // validate the email and password
    const userId = await res.locals.user._id;
    const sessions = await getAllSessions({user: userId, valid: true})
    return res.status(200).send(sessions);
    
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at getUserSessionHandler is: ${error.message}`);
    return res.status(409).send(error.message);
  }
}