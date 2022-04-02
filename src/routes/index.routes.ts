// src/routes/index.routes.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
const apiPaths = require('config').apiPaths;
// import config from "config";
// var apiPaths = config.get<{}>("apiPaths");

// Custom Functions from Lib ??
import controllerRoutes from "./controller.routes";
import demoRoutes from "./demo.routes";
import registerRoutes from "./register.routes";
import userRoutes from "./user.routes";
import sessionRouter from "./session.routes";

// Import Essential Librarys
import { Express, Router, Request, Response, NextFunction } from "express";

// Import Essential Services ??

// Import Essential Dto Classes ??

// Import Required Schemas ??

// Import Other ??



export default async function (app: Express, router: Router) {

  try {
    await app.get(apiPaths._base + apiPaths.healthcheck, (req: Request, res: Response) => res.sendStatus(200));

    await demoRoutes(app, router);
    await controllerRoutes(app, router);
    await registerRoutes(app, router);

    await userRoutes(app, router);
    await sessionRouter(app, router);

    setDevLog(filename, level.INFO, `EndPoints as Routrs Setup Successed.`);
  } catch (error: any) {
    setDevLog(filename, level.FATAL, `Error at Index.Routes is: ${error.message}`);
    throw new Error(error);
  }
}
