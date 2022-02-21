var router = require("express").Router();
const apiPaths = require('./apiPaths');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = require("./swaggerUI.json");

swaggerOptions.host = apiPaths.url;
swaggerOptions.basePath = apiPaths._base;
router.use(apiPaths.swaggerUI, swaggerUi.serve, swaggerUi.setup(swaggerOptions, { explorer: true }));
// console.log("swaggerSpec: ",swaggerOptions);

// swaggerOptions.definition.servers = [
//     // {url: apiPaths.url},
//     { url: apiPaths.url.concat(apiPaths._base) },
//     // {url: apiPaths.url.concat(apiPaths.demo)},
//     // {url: apiPaths.url.concat(apiPaths._base.concat(apiPaths.controllers._base))}
// ]
// swaggerOptions.apis = ["../controller.js", "../controllers/register.js"];
// const swaggerSpec = swaggerJsDoc(swaggerOptions);
// console.log("swaggerSpec: ",swaggerSpec);
// router.use(apiPaths.swaggerUI, swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

module.exports = router;
// console.log("SwaggerUI Initialized.");
