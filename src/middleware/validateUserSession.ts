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
import { Request, Response, NextFunction } from "express";

// Import Essential Services
import { verifyJwt } from "../utils/auth/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

// Import Other ??


const validateUserSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get Tokens from Session
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // const accessToken_cookies = req.cookies.accessToken;
    // const refreshToken_cookies = req.cookies.refreshToken;

    // const accessToken_header = get(req, "headers.authorization", "").replace(
    //   /^Bearer\s/,
    //   ""
    // );
    // const refreshToken_header = get(req, "headers.x-refresh");

    // Check availability of tokens
    if (!accessToken) {
      setDevLog(filename, level.WARN, `AccessToken was Expaired.`);
      return next();
    }
    // if (!refreshToken) {
    //   setDevLog(filename, level.WARN, `RefreshToken was Expaired.`);
    //   return next();
    // }


    // Verify AccessToken
    const { decoded, expired } = await verifyJwt(accessToken);
    if (decoded) {
      // Set decoded User data in Local Response;
      res.locals.user = decoded;
      setDevLog(filename, level.INFO, `Valid User Available.`);
      return next();
    }

    // ReIssue of Access token when valid refresh is present and accesstoken was expaired.
    if (expired && refreshToken) {
      const newAccessToken = await reIssueAccessToken({ refreshToken });

      //Check newAccessoken
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

        // Get Decoded Data from new accessToken
        const { decoded } = await verifyJwt(newAccessToken);
        // Set decoded User data in Local Response;
        res.locals.user = decoded;

        setDevLog(filename, level.INFO, `Valid Session Available and new access token set to response.`);
      } else {
        setDevLog(filename, level.WARN, `No Valid Session is Available. so, Unable to provide a new AccessToken.`);
      }
      return next();
    }

    return next();
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at validateUserSession is: ${error.message}`);
    return res.status(409).send(error.message);
  }
};

export default validateUserSession;