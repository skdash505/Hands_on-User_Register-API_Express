// src/middleware/requiresActiveUserSession.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
import config from "config";

// Custom Functions from Lib ??

// Import Essential Librarys
import { Request, Response, NextFunction } from "express";

// Import Essential Services ??

// Import Other ??


const requiresActiveUserSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
  const user = res.locals.user;
  // const user = get(res, "user");

  if (!user) {
    setDevLog(filename, level.WARN, `No Valid user available for Current Session.`);
    return res.status(403)
    .send({
      message: `No Valid user available for Current Session.`,
      data: {}
    });
  }

  setDevLog(filename, level.MARK, `Valid user for Current Session found Successfully.`);
  return next();
} catch (error: any) {
  setDevLog(filename, level.FATAL, `Error at requiresActiveUserSession is: ${error.message}`);
  return res.status(409).send(error.message);
}
};

export default requiresActiveUserSession;