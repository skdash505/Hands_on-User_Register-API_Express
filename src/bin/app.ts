// src/bin/app.ts

// import Express and Http server 
import express, { Express, Router } from "express";
import http from "http";

// Import Essential Package
import path from "path";
// Import and use Logger Scripts
import { setDevLog, level } from "../utils/log";
// Import Config
import config from "config";

// Import Custom MiddleWares
// import { deserializeUser } from "../middleware";

//Import Essential components
import swaggerDocs from "../utils/swaggerUi";
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
  private filename = path.basename(__filename);

  constructor() {
    // Initiated Application
    this.httpServer = express()
    this.httpRouter = Router()

    setDevLog(this.filename, level.INFO, `\n\n\t\t\t\t\t\tExpress App initiated.`);

    this.setupMiddleware();
    // this.setupServer();
  }

  public async setupMiddleware() {
    try {
      setDevLog(this.filename, level.INFO, "Stup MiddleWare Started.");
      // Using Express's MiddleWares
      this.httpServer.use(express.json());
      this.httpServer.use(express.urlencoded({ extended: false }));
      // Import and use MiddleWares
      this.httpServer.use(require('cookie-parser')());
      this.httpServer.use(require('cors')());
      this.httpServer.use(require('helmet')());

      // Using Custom MiddleWares
      // await this.httpServer.use(deserializeUser);

      setDevLog(this.filename, level.INFO, "MiddleWare Setup Done.");
    } catch (error) {
      setDevLog(this.filename, level.FATAL, `Error during MiddleWare Setup: ${error}`);
    }
  }


  public async startServer() {
    try {
      setDevLog(this.filename, level.INFO, "Starting the Server.");
      return new Promise((resolve, reject) => {
        var server = http.createServer(this.httpServer);
        // Listen on provided port, on all network interfaces.
        server.listen(
          this.port, this.host,
          () => {
            setDevLog(this.filename, level.INFO, `Server listing at http://${this.host}:${this.port}`);
            resolve(this.port);
          })
          // Event listener for HTTP server "listening" event.
          .on('listening', () => {
            var addr = server.address() || { port: Number };
            var bind = typeof addr === 'string'
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
            var bind = typeof this.port === 'string'
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
      setDevLog(this.filename, level.INFO, "Server Setup Started.");

      // Initating staticPages
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

      setDevLog(this.filename, level.INFO, "Server Setup Done.");
    } catch (error) {
      setDevLog(this.filename, level.FATAL, `Error during Server Setup: ${error}`);
    }
  }
}

export default App;


