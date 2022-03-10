// src/routes/user.routes.ts

import path from "path";
import { setDevLog, level } from "../utils/log";
const filename = path.basename(__filename);

var apiPaths = require('config').apiPaths;

import { Express, Router } from "express";
import { validateResourses } from "../middleware";
import { createUserHandler, updateUserHandler, getAllUserHandler, getUserbyIdHandler, deleteUserHandler } from "../controllers/user.controller";
import { createUserSchema, UpdateUserSchema, UserIDSchema } from "../schema/user.schema";


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
            validateResourses(UserIDSchema),
            getUserbyIdHandler);

        // Update User Details
        app.put(
            apiPaths._base + apiPaths.user_with_id,
            validateResourses(UpdateUserSchema),
            updateUserHandler);

        // Delete a User
        app.delete(
            apiPaths._base + apiPaths.user_with_id,
            validateResourses(UserIDSchema),
            deleteUserHandler);
            
        // Get All Users
        app.get(
            apiPaths._base + apiPaths.allUser,
            getAllUserHandler);

    } catch (error: any) {
        setDevLog(filename, level.FATAL, `Error at UserRoutesSetup is: ${error.message}`);
        throw new Error(error);
    }
}