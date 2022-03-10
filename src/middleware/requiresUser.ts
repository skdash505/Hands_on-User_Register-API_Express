// src/middleware/requiresUser.ts

import path from "path";
import { setDevLog, level } from "../utils/log";
const filename = path.basename(__filename);

import { get } from "lodash";
import { Request, Response, NextFunction } from "express";

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  // const user = get(res, "user");

  if (!user) {
    setDevLog(filename, level.WARN, `No Valid user available for Current Session.`);
    return res.sendStatus(403);
  }

  setDevLog(filename, level.MARK, `Valid user for Current Session found Successfully.`);
  return next();
};

export default requiresUser;