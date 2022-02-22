var apiPaths = require('config').apiPaths;

import { Express, Router, Request, Response, NextFunction } from "express";


export default async function (app: Express, router: Router) {
    app.get(apiPaths._base + apiPaths.demo, function (req: Request, res: Response, next: NextFunction) {
        res.render('index', { title: 'Demo', content: 'respond with a resource as Demo' });
    });

}