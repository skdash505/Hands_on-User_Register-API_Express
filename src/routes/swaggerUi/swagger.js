const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require("./swagger.json");

var app = require('../../server');
const apiPaths = require('../apiPaths');
    
// app.use('/api/swaggerUi', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec), {explorer: true}));

app.use(apiPaths.swaggerUI, swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec), {explorer: true}));
module.exports  = swaggerJsdoc(swaggerSpec);
console.log("SwaggerUI Initialized.");
