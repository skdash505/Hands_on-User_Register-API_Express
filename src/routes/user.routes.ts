var apiPaths = require('config').apiPaths;

import { Express, Router, Request, Response, NextFunction } from "express";
import { deserializeUser, requiresUser, validate } from "../middleware";


export default async function (app: Express, router: Router) {
    app.get(apiPaths._base+apiPaths.user, function (req: Request, res: Response, next: NextFunction) {
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