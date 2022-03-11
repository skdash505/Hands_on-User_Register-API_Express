// src/routes/demo.routes.ts

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
import { Express, Router, Request, Response, NextFunction } from "express";

// Import Essential Services ??

// Import Essential Dto Classes ??

// Import Required Schemas ??

// Import Other ??



export default async function (app: Express, router: Router) {
    app.get(apiPaths.demo, function (req: Request, res: Response, next: NextFunction) {
        res.render('index', { title: 'Demo', content: 'respond with a resource as Demo' });
    });

}