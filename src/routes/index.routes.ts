// src/routes/index.routes.ts

import path from "path";
import { setDevLog, level } from "../utils/log";
const filename = path.basename(__filename);

import { Express, Router, Request, Response, NextFunction } from "express";

var apiPaths = require('config').apiPaths;

import controllerRoutes from "./controller.routes";
import demoRoutes from "./demo.routes";
import registerRoutes from "./register.routes";
import userRoutes from "./user.routes";
import sessionRouter from "./session.routes";


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
