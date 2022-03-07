// src/middleware/deserializeUser.ts
import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/auth/jwt.utils";
// import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get Tokens from Session
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (!accessToken) return next();

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
    return next();
  }

  // if (expired && refreshToken) {
  //   const newAccessToken = await reIssueAccessToken({ refreshToken });

  //   if (newAccessToken) {
  //     // Add the new access token to the response header
  //     res.setHeader("x-access-token", newAccessToken);

  //     const { decoded } = verifyJwt(newAccessToken);

  //     // @ts-ignore
  //     req.user = decoded;
  //   }

  //   return next();
  // }

  return next();
};

export default deserializeUser;