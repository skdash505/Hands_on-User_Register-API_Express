// src/middleware/validateResourses.ts

import { Request, Response, NextFunction} from "express";
import { AnyZodObject } from "zod";

import log from "../utils/log";

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
        log.info(" Validate Resourses Sucessfully.");
        next();
    } catch (error: any) {
        log.error("Error at Validate Resourses is:", error.name,"\n details as: ", JSON.stringify(error.issues),"\n", error.stack);
        return res.status(404).send(error);
    }
}

export default validateResourses;
