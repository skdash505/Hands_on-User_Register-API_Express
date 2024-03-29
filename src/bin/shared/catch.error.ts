// src/bin/shared/catch.error.ts

// Import Logging Essentials
import { masterLog } from "../../utils/log";

// Import Essential Librarys
import { Express, Router, Request, Response, NextFunction } from "express";

// Import Other ??


export default function (app: Express) {
  try {
    // assume 500 since no middleware responded
    // app.use(function(req, res, next){
    //   res.status(500).render('5xx');
    // });
    // // assume 400 since no middleware responded
    // app.use(function(req, res, next){
    //   res.status(404).render('4xx', { url: req.originalUrl });
    // });

    const createError = require('http-errors');

    // catch 404 and forward to error handler
    app.use(function (req: Request, res: Response, next: NextFunction) {
      next(createError(404));
    });

    // error handler
    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
      next();
    });
  } catch (error: any) {
    masterLog.fatal(`Error at catchError is: ${error.message}`);
    throw new Error(error);
  }
}