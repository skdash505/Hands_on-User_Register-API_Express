// src/routes/session.routes.ts

import path from "path";
import { setDevLog, level } from "../utils/log";
const filename = path.basename(__filename);

var apiPaths = require('config').apiPaths;

import { Express, Router } from "express";
import { deserializeUser, requiresUser, validateResourses } from "../middleware";
import { createUserSessionHandler, getUserSessionHandler } from "../controllers/session.controller";
import { SessionSchema } from "../schema/session.schema";


export default async function (app: Express, router: Router) {
    try {

        app.post(
            apiPaths._base + apiPaths.session,
            validateResourses(SessionSchema),
            createUserSessionHandler);

        app.get(
            apiPaths._base + apiPaths.session,
            requiresUser,
            getUserSessionHandler);

    } catch (error: any) {
        setDevLog(filename, level.FATAL, `Error at SessionRoutesSetup is: ${error.message}`);
        throw new Error(error);
    }
}