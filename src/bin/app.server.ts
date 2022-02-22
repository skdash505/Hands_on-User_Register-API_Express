// src/bin/server.ts

import express, { Express } from "express";

var debug = require('debug')('userregister:server');
import path from "path";

import config from "config";
import log from "../utils/log";

import { deserializeUser } from "../middleware";
import www from "./www.public";
import connect from "../utils/db/connect";
import catchError from "./catch.error";
import temp from "./temp.shared";
import routes from "./routes/index.routes";

const app = express();
var router = express.Router();

// debugger;
debug("Express App initiated.")

async function setupMiddleware(app: Express) {
  try {
    // debugger;
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(require('cookie-parser')());
    app.use(require('cors')());

    // await app.use(deserializeUser);
    log.info("MiddleWare Setup Done.")
  } catch (error) {
    log.error("Error during MiddleWareSetup: " + error);
    // } finally {
    //   log.warn("MiddleWare Setup");
  }

  // var cookieParser = require('cookie-parser');
  // app.use(cookieParser());

  // var cors = require('cors');
  // app.use(cors());
}

async function setupServer(app: Express) {
  try {
    // debugger;
    const port = config.get("port") as number;
    const host = config.get("host") as string;
    var apiPaths = config.get("apiPaths") as { demo: string, _base: string };

    if (www(app, port, host)) {
      try {
        // debugger;

        // staticPages
        app.use(express.static(path.join(__dirname, './public')));

        // view engine setup
        app.set('views', path.join(__dirname, './views'));
        app.set('view engine', 'pug');

        //SwaggerUi initalized
        await app.use(apiPaths._base, require('../utils/swaggerUi'));
        // app.use("/", require('./swaggerUi/swaggerUI.js'));


        //All end points atteched as Router
        await routes(app, router);
        // await app.use(apiPaths.demo, require('./routes/demo.js'));
        // await app.use(apiPaths._base, require('./routes/controller.js'));
        // await app.use(apiPaths._base, require('./routes/register.controller.js'));
        // debugger;

        //Handel unavailable End-Points
        await catchError(app);

        // Connection to Database established
        await connect();

        //Some essential middleware used
        await temp(app);

        log.info(`Server listing at http://${host}:${port}`);
      } catch (error) {
        log.error("Error during EndPoints Setup: " + error);
        // } finally {
        //   log.warn("EndPoints Setup");
      }
    } else {
      log.error(`Unable to config the HTTP server.`);
    }
  } catch (error) {
    log.error("Error during Server Setup: " + error);
    // } finally {
    //   log.warn("Server Setup");
  }
}


// debugger;
setupMiddleware(app);
// debugger;
setupServer(app);