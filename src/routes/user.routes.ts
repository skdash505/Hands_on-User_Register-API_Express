// src/routes/user.routes.ts

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
import { createUserHandler, updateUserHandler, getAllUserHandler, getUserbyIdHandler, deleteUserHandler } from "../controllers/user.controller";

// Import Essential Dto Classes ??

// Import Required Schemas
import { createUserSchema, UpdateUserSchema, UserIDSchema } from "../schema/user.schema";

// Import Other ??


export default async function (app: Express, router: Router) {
    try {

        // Create New User
        app.post(
            apiPaths._base + apiPaths.user,
            validateResourses(createUserSchema),
            createUserHandler);

        // All user Details by Id
        app.get(
            apiPaths._base + apiPaths.user_with_id,
            requiresActiveUserSession,
            validateResourses(UserIDSchema),
            getUserbyIdHandler);

        // Update User Details
        app.put(
            apiPaths._base + apiPaths.user_with_id,
            requiresActiveUserSession,
            validateResourses(UpdateUserSchema),
            updateUserHandler);

        // Delete a User
        app.delete(
            apiPaths._base + apiPaths.user_with_id,
            requiresActiveUserSession,
            validateResourses(UserIDSchema),
            deleteUserHandler);
            
        // Get All Users
        app.get(
            apiPaths._base + apiPaths.allUser,
            requiresActiveUserSession,
            getAllUserHandler);

    } catch (error: any) {
        setDevLog(filename, level.FATAL, `Error at UserRoutesSetup is: ${error.message}`);
        throw new Error(error);
    }
}