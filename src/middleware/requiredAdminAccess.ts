// src/middleware/requiredAdminAccess.ts

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


const requiredAdminAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      
    return next();
} catch (error: any) {
  setDevLog(filename, level.FATAL, `Error at requiredAdminAccess is: ${error.message}`);
  return res.status(409).send(error.message);
}
};

export default requiredAdminAccess;