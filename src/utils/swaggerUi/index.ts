// src/utils/swaggerUi/index.ts

import path from "path";
import { setDevLog, masterLog, level } from "../log";
const filename = path.basename(__filename);

import { Express, Request, Response, NextFunction } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

import { version } from "../../../package.json"

var apiPaths = require('config').apiPaths;
import config from "config";
// const apiPaths = config.get<{}>("apiPaths");


function swaggerDocs(app: Express, serverUrl: string) {
try{
  setupSwaggerUi(app, serverUrl);
  // setupOpenApi(app, serverUrl);
} catch (error: any) {
  masterLog.fatal(`Error at swaggerDocs is: ${error.message}`);
  throw new Error(error);
}
}

export default swaggerDocs;

function setupSwaggerUi(app: Express, serverUrl: string) {
  try {
    // // swaggerUi Default page
    // app.use(
    //   apiPaths.swaggerUI + "/index.html",
    //   swaggerUi.serve,
    //   swaggerUi.setup(
    //     // swaggerOptions,
    //     require("./index.swaggerUi.json"),
    //     { explorer: true }
    //   )
    // );
    // setDevLog(filename, level.TRACE, `Swagger available at ${serverUrl}${apiPaths.swaggerUI}/index.html`);


    // // swaggerUi Default in JSON format
    // app.get(apiPaths.swaggerUI + ".json", (req: Request, res: Response) => {
    //   res.setHeader("Content-Type", "application/json");
    //   res.send(require("./index.swaggerUi.json"));
    // });


    const swaggerOptions = require("./app.swaggerUI.json");
    let serverBasePath = `${apiPaths._base}`;
    // let serverBaseUrl = `${serverUrl}${apiPaths._base}`;
    swaggerOptions.host = serverUrl;
    swaggerOptions.basePath = serverBasePath;

    // swaggerUi App page
    app.use(
      apiPaths._base + apiPaths.swaggerUI,
      swaggerUi.serve,
      swaggerUi.setup(
        swaggerOptions,
        // require("./app.swaggerUi.json"),
        { explorer: true }
      )
    );
    setDevLog(filename, level.TRACE, `Swagger available at ${serverUrl}${apiPaths._base + apiPaths.swaggerUI}`);


    // swaggerUi App in JSON format
    app.get(apiPaths._base + apiPaths.swaggerUI + ".json", (req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerOptions);
      // res.send(require("./app.swaggerUi.json"));
    });
  } catch (error: any) {
    masterLog.fatal(`Error at setUpSwaggerUi is: ${error.message}`);
    throw new Error(error);
  }
}


function setupOpenApi(app: Express, serverUrl: string) {
  try {
    // // OpenApi Default page
    // app.use(
    //   apiPaths.swaggerUI + "/index.html",
    //   swaggerUi.serve,
    //   swaggerUi.setup(
    //     require("./index.openapi.json"),
    //     { explorer: true }
    //   )
    // );
    // setDevLog(filename, level.TRACE, `Swagger available at ${serverUrl}${apiPaths.swaggerUI}/index.html`);

    // // OpenApi Default in JSON format
    // app.get(apiPaths.swaggerUI + ".json", (req: Request, res: Response) => {
    //   res.setHeader("Content-Type", "application/json");
    //   res.send(require("./index.openapi.json"));
    // });

    const openApiOptions = require("./app.openapi.json");
    // // OpenApi App page inside default
    // app.get(apiPaths.swaggerUI + "/index.html" + "?configUrl=",
    //   swaggerUi.serve,
    //   swaggerUi.setup(
    //     swaggerJSDoc(openApiOptions),
    //     // swaggerJSDoc(require("./app.openapi.json")),
    //     { explorer: true }
    //   )
    // );


    // OpenApi App page
    app.use(
      apiPaths._base + apiPaths.swaggerUI,
      swaggerUi.serve,
      swaggerUi.setup(
        swaggerJSDoc(openApiOptions),
        // swaggerJSDoc(require("./app.openapi.json")),
        { explorer: true }
      )
    );
    // setDevLog(filename, level.TRACE, `Swagger available at ${serverUrl}${apiPaths._base + apiPaths.swaggerUI}`);

    // OpenApi App in JSON format
    app.get(apiPaths._base + apiPaths.swaggerUI + ".json", (req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(require("./app.openapi.json"));
    });
  } catch (error: any) {
    masterLog.fatal(`Error at setUpOpenApi is: ${error.message}`);
    throw new Error(error);
  }
}