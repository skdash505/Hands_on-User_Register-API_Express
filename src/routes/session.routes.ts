// src/routes/session.routes.ts

import path from "path";
import { setDevLog, level } from "../utils/log";
const filename = path.basename(__filename);

var apiPaths = require('config').apiPaths;

import { Express, Router } from "express";
import { validateUserSession, requiresUser, validateResourses } from "../middleware";
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionbyIdHandler, getUserSessionHandler, patchUserSessionHandler } from "../controllers/session.controller";
import { CreateSessionSchema, SessionIDSchema } from "../schema/session.schema";
import { CookiesSchema } from "../schema/cookies.schema";


export default async function (app: Express, router: Router) {
    try {

        // Create a Session
        app.post(
            apiPaths._base + apiPaths.session,
            validateResourses(CreateSessionSchema),
            createUserSessionHandler);

        // Validate a session
        app.patch(
            apiPaths._base + apiPaths.session,
            requiresUser,
            validateResourses(CookiesSchema),
            patchUserSessionHandler);

        // Delete a Session
        app.delete(
            apiPaths._base + apiPaths.session_with_id,
            requiresUser,
            validateResourses(CookiesSchema),
            deleteUserSessionHandler);

        // Get Session Details Using Id
        app.get(
            apiPaths._base + apiPaths.session_with_id,
            requiresUser,
            validateResourses(SessionIDSchema),
            getUserSessionbyIdHandler);

        // Get All Session Details
        app.get(
            apiPaths._base + apiPaths.allSession,
            requiresUser,
            getUserSessionHandler);

    } catch (error: any) {
        setDevLog(filename, level.FATAL, `Error at SessionRoutesSetup is: ${error.message}`);
        throw new Error(error);
    }
}