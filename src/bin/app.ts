// src/bin/app.ts

// import Express and Http server
import express, { Express, Router } from "express";
import http from "http";

// Import Debug components
import debugerComp from "../temp/debugContents";

// Import Essential Package
import path from "path";
// Import and use Logger Scripts
import { setDevLog, level } from "../utils/log";
// Import Process Configuration
import config from "config";
import dotenv from "dotenv";
dotenv.config();

// Import Custom MiddleWares
import { validateUserSession } from "../middleware";

// Import Essential components
import swaggerDocs from "../utils/swaggerUi";
import connect from "../utils/db/connect";
import Routers from "../routes/index.routes";
import catchError from "./shared/catch.error";
import temp from "./shared/temp.shared";

// Import Other ??

class App {
  private Server: any;
  private Router: any;
  private protocol: string = process.env.protocol || config.get<string>("protocol");
  private port: number = Number(process.env.PORT) || config.get<number>("port");
  private host: string = process.env.HOST || config.get<string>("host");
  private serverUrl: string = process.env.URL || config.get<string>("serverUrl");
  private apiPaths: {} = config.get<any>("apiPaths");
  private filename = path.basename(__filename);

  constructor() {
    // Initiated Application
    this.Server = express()
    this.Router = Router()

    // Debug some content
    debugerComp(this.Server);

    setDevLog(this.filename, level.INFO, `\n\n\t\t\t\t\t\tExpress App initiated.`);

    // Initiating Middlewares
    this.setupMiddleware();
    // this.setupServer();
  }

  public async setupMiddleware() {
    try {
      setDevLog(this.filename, level.TRACE, "Stup MiddleWare Started.");
      // Using Express's MiddleWares
      //  // parse application/json
      this.Server.use(express.json());
      // // parse application/x-www-form-urlencoded
      this.Server.use(express.urlencoded({ extended: false }));

      // Import and use MiddleWares
      this.Server.use(require('cookie-parser')());
      this.Server.use(require('cors')());
      this.Server.use(require('helmet')());

      // Using Custom MiddleWares
      await this.Server.use(validateUserSession);

      setDevLog(this.filename, level.INFO, "MiddleWare Setup Done.");
    } catch (error) {
      setDevLog(this.filename, level.FATAL, `Error during MiddleWare Setup: ${error}`);
    }
  }


  public async startServer() {
    try {
      setDevLog(this.filename, level.TRACE, "Starting the Server.");
      return new Promise((resolve, reject) => {
        const server = http.createServer(this.Server);
        // Listen on provided port, on all network interfaces.
        server.listen(
          this.port, this.host,
          () => {
            setDevLog(this.filename, level.INFO, `Server listing at ${this.serverUrl}`);
            resolve(this.port);
          })
          // Event listener for HTTP server "listening" event.
          .on('listening', () => {
            const addr = server.address() || { port: Number };
            const bind = typeof addr === 'string'
              ? 'pipe ' + addr
              : 'port ' + addr.port;
            setDevLog(this.filename, level.TRACE, `Listening on ${bind}`);
            // debugger;
            return this.setupServer();
          })
          // Event listener for HTTP server "error" event.
          .on('error', (error: any) => {
            if (error.syscall !== 'listen') {
              reject(error);
              // throw error;
            }
            const bind = typeof this.port === 'string'
              ? 'Pipe ' + this.port
              : 'Port ' + this.port;
            // handle specific listen errors with friendly messages
            switch (error.code) {
              case 'EACCES':
                setDevLog(this.filename, level.ERROR, `${bind} requires elevated privileges`);
                process.exit(1);
                reject(error);
              // throw error;
              case 'EADDRINUSE':
                setDevLog(this.filename, level.ERROR, `${bind} is already in use`);
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
      setDevLog(this.filename, level.FATAL, `Error during Starting the Server: ${error}`);
    }
  }


  public async setupServer() {
    try {
      setDevLog(this.filename, level.TRACE, "Server Setup Started.");

      // Initating staticPages
      this.Server.use(express.static(path.join(__dirname, './public')));

      // view engine setup
      this.Server.set('views', path.join(__dirname, './views'));
      this.Server.set('view engine', 'pug');

      // Some essential middleware used
      await temp(this.Server);

      // Connection to Database established
      await connect();

      // All end points atteched as Router
      await Routers(this.Server, this.Router);

      // SwaggerUi initalized
      await swaggerDocs(this.Server, this.serverUrl);

      // Handel unavailable End-Points
      await catchError(this.Server);

      setDevLog(this.filename, level.INFO, "Server Setup Done.");
    } catch (error) {
      setDevLog(this.filename, level.FATAL, `Error during Server Setup: ${error}`);
    }
  }
}

export default App;


