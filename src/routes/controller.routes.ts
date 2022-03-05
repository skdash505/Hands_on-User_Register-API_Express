// src/routes/controller.routes.ts

var apiPaths = require('config').apiPaths;

import { Express, Router, Request, Response, NextFunction } from "express";


const controllerRoutes = async (app: Express, router: Router) => {
    app.get(apiPaths.controllers, function (req: Request, res: Response, next: NextFunction) {
        console.log("controller initiated");
        res.render('index', { title: 'Controller', content: 'respond with a resource as Controller' });
        res.json({ message: "hi User" });
        next()
    });

    app.post(apiPaths.controllers, function (req: Request, res: Response, next: NextFunction) {
        res.send({ message: "submitted successfully" });
    });

    app.get(apiPaths.controllers_id, function (req: Request, res: Response, next: NextFunction) {
        console.log("controller with id initiated");
        res.render('index', { title: 'Controller ' + req.params.id, content: 'respond with a resource as Controller as Id :' + req.params.id });
        res.json({ message: "hi User: " + req.params.id, data: req.params.id });
        next();
    });

}

export default controllerRoutes;