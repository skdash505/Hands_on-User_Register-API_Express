var router = require("express").Router();
var config = require('config');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = require("./swaggerUI.json");

let serverUrl = `http://${config.host}:${config.port}`;
let serverBasePath = `${config.apiPaths._base}`;
// let serverBaseUrl = `${serverUrl}${config.apiPaths._base}`;

swaggerOptions.host = serverUrl;
swaggerOptions.basePath = serverBasePath;
router.use(config.apiPaths.swaggerUI, swaggerUi.serve, swaggerUi.setup(swaggerOptions, { explorer: true }));
// console.log("swaggerSpec: ",swaggerOptions);

// swaggerOptions.definition.servers = [
//     // {url: config.apiPaths.url},
//     { url: config.apiPaths.url.concat(config.apiPaths._base) },
//     // {url: config.apiPaths.url.concat(config.apiPaths.demo)},
//     // {url: config.apiPaths.url.concat(config.apiPaths._base.concat(config.apiPaths.controllers._base))}
// ]
// swaggerOptions.apis = ["../controller.js", "../controllers/register.js"];
// const swaggerSpec = swaggerJsDoc(swaggerOptions);
// console.log("swaggerSpec: ",swaggerSpec);
// router.use(config.apiPaths.swaggerUI, swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

module.exports = router;
// console.log("SwaggerUI Initialized.");
