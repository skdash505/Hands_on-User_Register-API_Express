// src/bin/app.ts

import express, { Express, Router } from "express";
import http from "http";

import path from "path";
import config from "config";
import log from "../utils/log";
import swaggerDocs from "../utils/swaggerUi";

// import { deserializeUser } from "../middleware";

import connect from "../utils/db/connect";
import Routers from "../routes/index.routes";
import catchError from "./shared/catch.error";
import temp from "./shared/temp.shared";

class App {
  private httpServer: any
  private httpRouter: any
  private port = config.get<number>("port");
  private host = config.get<string>("host");
  private apiPaths = config.get<{}>("apiPaths");

  constructor() {
    this.httpServer = express()
    this.httpRouter = Router()
    // debugger;
    log.info("Express App initiated.")

    // debugger;
    this.setupMiddleware();
    // debugger;
    // this.setupServer();

  }

  public async setupMiddleware() {
    try {
      // debugger;
      this.httpServer.use(express.json());
      this.httpServer.use(express.urlencoded({ extended: false }));
      this.httpServer.use(require('cookie-parser')());
      this.httpServer.use(require('cors')());
      this.httpServer.use(require('helmet')());

      // await this.httpServer.use(deserializeUser);

      log.info("MiddleWare Setup Done.")
    } catch (error) {
      log.error("Error during MiddleWareSetup: " + error);
      // } finally {
      //   log.warn("MiddleWare Setup");
    }
  }


  public async startServer() {
    try {
      return new Promise((resolve, reject) => {
        var server = http.createServer(this.httpServer);
        // Listen on provided port, on all network interfaces.
        server.listen(
          this.port, this.host,
          () => {
            log.info(`Server listing at http://${this.host}:${this.port}`);
            log.warn("Server is Up");
            resolve(this.port);
          })
          // Event listener for HTTP server "listening" event.
          .on('listening', () => {
            var addr = server.address() || { port: Number };
            var bind = typeof addr === 'string'
              ? 'pipe ' + addr
              : 'port ' + addr.port;
            log.trace('Listening on ' + bind);
            // debugger;
            return this.setupServer();
          })
          // Event listener for HTTP server "error" event.
          .on('error', (error: any) => {
            if (error.syscall !== 'listen') {
              reject(error);
              // throw error;
            }
            var bind = typeof this.port === 'string'
              ? 'Pipe ' + this.port
              : 'Port ' + this.port;
            // handle specific listen errors with friendly messages
            switch (error.code) {
              case 'EACCES':
                log.error(bind + ' requires elevated privileges');
                process.exit(1);
                reject(error);
              // throw error;
              case 'EADDRINUSE':
                log.error(bind + ' is already in use');
                process.exit(1);
                reject(error);
              // throw error;
              default:
                reject(error);
              // throw error;
            }
          });
      })
    } catch (error) {
      log.error("Error during Server Setup: " + error);
      log.error(`Unable to run the server at ${this.host}${this.port}`);
      // } finally {
      //   log.warn("Server Setup");
    }
  }


  public async setupServer() {
    try {
      // debugger;

      // staticPages
      this.httpServer.use(express.static(path.join(__dirname, './public')));

      // view engine setup
      this.httpServer.set('views', path.join(__dirname, './views'));
      this.httpServer.set('view engine', 'pug');

      //All end points atteched as Router
      await Routers(this.httpServer, this.httpRouter);

      // Connection to Database established
      await connect();

      //SwaggerUi initalized
      await swaggerDocs(this.httpServer, this.port);

      //Some essential middleware used
      await temp(this.httpServer);

      //Handel unavailable End-Points
      await catchError(this.httpServer);

      log.info(`Server Setup Done.`);
    } catch (error) {
      log.error("Error during Server Setup: " + error);
      // } finally {
      //   log.warn("EndPoints Setup");
    }
  }

}


export default App;


