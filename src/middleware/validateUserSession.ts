// src/middleware/validateUserSession.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
import config from "config";

// Custom Functions from Lib
import setAccessToken from "../libs/functions/setAccessToken";

// Import Essential Librarys
import { get } from "lodash";
import { Request, Response, NextFunction } from "express";

// Essential Services
import { verifyJwt } from "../utils/auth/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const validateUserSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get Tokens from Session
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (!accessToken) {
    setDevLog(filename, level.WARN, `AccessToken was Expaired.`);
    return next();
  }

  // const accessToken_cookies = req.cookies.accessToken;
  // const refreshToken_cookies = req.cookies.refreshToken;

  // const accessToken_header = get(req, "headers.authorization", "").replace(
  //   /^Bearer\s/,
  //   ""
  // );
  // const refreshToken_header = get(req, "headers.x-refresh");


  // Verify AccessToken
  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    setDevLog(filename, level.INFO, `Valid User Available.`);
    return next();
  }

  // ReIssue of Access token when valid refresh is present and accesstoken was expaired.
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      // Add the new access token to the response header
      // res.setHeader("x-access-token", newAccessToken);

      // Add the new accessToken to the response Cookies

      setAccessToken(
        accessToken,
        config.get<number>("accessSessionExp"),
        res,
        filename, setDevLog, level
      );

      const { decoded } = verifyJwt(newAccessToken);

      res.locals.user = decoded;
    }

    setDevLog(filename, level.INFO, `Valid User Available and new access token set to response.`);
    return next();
  }

  return next();
};

export default validateUserSession;