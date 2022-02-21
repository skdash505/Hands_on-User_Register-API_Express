// src/bin/server.ts

import express from "express";
const app = express();

var router = express.Router();
import log from "../logger";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(require('cors')());

// var cookieParser = require('cookie-parser');
// app.use(cookieParser());

// var cors = require('cors');
// app.use(cors());


// import { deserializeUser } from "../middleware";
// app.use(deserializeUser);


var path = require('path');
import config from "config";

import www from "./www";
import connect from "../db/connect";
import catchError from "./catchError";
import temp from "./temp";

// import routes from "./routes";

const port = config.get("port") as number;
const host = config.get("host") as string;
var apiPaths = config.get("apiPaths") as { demo: string, _base: string };

if (www(app, port, host)) {
  log.info(`Server listing at http://${host}:${port}`);

  connect();

  temp(app);

  // staticPages
  app.use(express.static(path.join(__dirname, './public')));

  // view engine setup
  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'pug');

  app.use(apiPaths.demo, require('./routes/demo.js'));
  app.use(apiPaths._base, require('./routes/controller'));
  app.use(apiPaths._base, require('./swaggerUi/swaggerUI.js'));
  // app.use("/", require('./swaggerUi/swaggerUI.js'));


  // routes(app);
  
  catchError(app);

} else {
  log.error(`Some error occured.`);
}




