// src/routes/register.routes.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
const apiPaths = require('config').apiPaths;
// import config from "config";
// var apiPaths = config.get<{}>("apiPaths");

// Custom Functions from Lib ??

// Import Essential Librarys
import { Express, Router, Request, Response, NextFunction } from "express";

// Import Essential Services ??

// Import Essential Dto Classes ??

// Import Required Schemas ??

// Import Other ??



export default async function (app: Express, router: Router) {
    app.get(apiPaths.register, function (req: Request, res: Response, next: NextFunction) {
        // res.render('index', { title: 'Registered Successfully', content: 'Registered Successfully. ' });
        if (!req.body.userRegisterData) {
            res.status(404);
            res.json({
                data: null,
                message: "required Request body not found"
            })
        } else {
            res.send({
                data: {
                    _default: 0,
                    _base: undefined
                }, message: "success"
            })
        }
    });
}