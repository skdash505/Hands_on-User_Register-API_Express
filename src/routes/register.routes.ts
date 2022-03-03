var apiPaths = require('config').apiPaths;

import { Express, Router, Request, Response, NextFunction } from "express";


export default async function (app: Express, router: Router) {
    app.get(apiPaths._base + apiPaths.register, function (req: Request, res: Response, next: NextFunction) {
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