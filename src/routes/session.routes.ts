// src/routes/session.routes.ts


// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
var apiPaths = require('config').apiPaths;
// import config from "config";
// var apiPaths = config.get<{}>("apiPaths");

// Custom Functions from Lib ??

// Import Essential Librarys
import { Express, Router } from "express";

// Import Essential Services
import { validateResourses, requiresActiveUserSession } from "../middleware";
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionbyIdHandler, getUserSessionHandler, patchUserSessionHandler } from "../controllers/session.controller";

// Import Essential Dto Classes ??

// Import Required Schemas
import { CreateSessionSchema, SessionIDSchema, SessionValidSchema } from "../schema/session.schema";
import { CookiesSchema } from "../schema/cookies.schema";

// Import Other ??


export default async function (app: Express, router: Router) {
    try {

        // Create a Session
        app.post(
            apiPaths._base + apiPaths.session,
            validateResourses(CreateSessionSchema),
            createUserSessionHandler);

        // Validate Current UserSession
        app.patch(
            apiPaths._base + apiPaths.session,
            requiresActiveUserSession,
            validateResourses(CookiesSchema),
            patchUserSessionHandler);

        // Delete a Session
        app.delete(
            apiPaths._base + apiPaths.session,
            requiresActiveUserSession,
            validateResourses(CookiesSchema),
            deleteUserSessionHandler);

        // Get All Session Details
        app.get(
            apiPaths._base + apiPaths.allSession,
            requiresActiveUserSession,
            validateResourses(SessionValidSchema),
            getUserSessionHandler);

        // Get Session Details Using Id
        app.get(
            apiPaths._base + apiPaths.session_with_id,
            requiresActiveUserSession,
            validateResourses(SessionIDSchema),
            getUserSessionbyIdHandler);

    } catch (error: any) {
        setDevLog(filename, level.FATAL, `Error at SessionRoutesSetup is: ${error.message}`);
        throw new Error(error);
    }
}