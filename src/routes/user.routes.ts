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
        app.post(
            apiPaths._base + apiPaths.user,
            validateResourses(createUserSchema),
            createUserHandler);

        app.get(
            apiPaths._base + apiPaths.user,
            getAllUserHandler);

        app.get(
            apiPaths._base + apiPaths.user_with_id,
            validateResourses(UserIDSchema),
            getUserbyIdHandler);

        app.put(
            apiPaths._base + apiPaths.user_with_id,
            validateResourses(UpdateUserSchema),
            updateUserHandler);

        app.delete(
            apiPaths._base + apiPaths.user_with_id,
            validateResourses(UserIDSchema),
            deleteUserHandler);

    } catch (error: any) {
        setDevLog(filename, level.FATAL, `Error at UserRoutesSetup is: ${error.message}`);
        throw new Error(error);
    }
}