var router = require("express").Router();
var config = require('config');
var apiPaths = require('config').apiPaths;

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = require("./swaggerUI.json");

let serverUrl = `https://${config.host}:${config.port}`;
let serverBasePath = `${apiPaths._base}`;
// let serverBaseUrl = `${serverUrl}${apiPaths._base}`;

swaggerOptions.host = serverUrl;
swaggerOptions.basePath = serverBasePath;
router.use(apiPaths.swaggerUI, swaggerUi.serve, swaggerUi.setup(swaggerOptions, { explorer: true }));
// console.log("swaggerSpec: ",swaggerOptions);

module.exports = router;
// console.log("SwaggerUI Initialized.");
