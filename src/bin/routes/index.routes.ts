// src/routes.ts

import { Express, Router, Request, Response, NextFunction } from "express";
var apiPaths = require('config').apiPaths;
import log from "../../utils/log";

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

    log.info("EndPoints as Routrs Setup Successed.");
  } catch (error) {
    log.error("Error Occured during EndPoint Setup: " + error);
  } finally {
    log.warn("EndPoints as Routrs Setup End.");
  }
}