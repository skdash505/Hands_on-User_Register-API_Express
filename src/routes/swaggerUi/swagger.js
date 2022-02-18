const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
var router = require("express").Router();

const apiPaths = require('../apiPaths');
// const swaggerSpec = require("./swagger.json");
// const userSchema = require("./user");

const swaggerOptions = {

    definition: {
        openapi: "3.0.0",
        info: {
            title: "UserRegister Express API with Swagger",
            version: "0.1.0",
            description: "This is a User Register CRUD API application made with Express and documented with Swagger"
        },
        servers: [
            {
                url: apiPaths.url.concat(apiPaths._base)
            }
        ]
    },
    schemes: [
        'http',
        'https'
    ],
    consumes: [
        'application/json'
    ],
    produces: [
        'application/json'],
    apis: ["./user.js"],
    // apis: ["${__dirname}/user.js"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// swaggerSpec.definition.servers = [
//     // {url: apiPaths.url},
//     {url: apiPaths.url.concat(apiPaths._base)},
//     // {url: apiPaths.url.concat(apiPaths.demo)},
//     // {url: apiPaths.url.concat(apiPaths._base.concat(apiPaths.controllers._base))}
// ]
// swaggerSpec.apis = ["./user.js"];

console.log("swaggerSpec: ",swaggerSpec);


router.use(apiPaths.swaggerUI, swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
// router.use(apiPaths.swaggerUI, swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec), {explorer: true}));
module.exports = router;

// var app = require('../../bin/server');
// // app.use('/api/swaggerUi', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec), {explorer: true}));
// app.use(apiPaths.swaggerUI, swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec), {explorer: true}));
// module.exports  = swaggerJsdoc(swaggerSpec);
console.log("SwaggerUI Initialized.");

