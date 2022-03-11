// src/middleware/validateResourses.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
import config from "config";

// Custom Functions from Lib ??

// Import Essential Librarys
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

// Import Essential Services ??

// Import Other ??


const validateResourses = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers,
            cookies: req.cookies,
            route: req.route,
            secure: req.secure,
            socket: req.socket,
            subDomines: req.subdomains
        });
        setDevLog(filename, level.MARK, `Validate Resourses Sucessfully.`);
        return next();
    } catch (error: any) {
        setDevLog(filename, level.ERROR, `Error at Validate Resourses is: ${error.name} \n details as: ${JSON.stringify(error.issues)}\n ${error.stack}`);
        return res.status(404).send(error);
    }
}

export default validateResourses;
