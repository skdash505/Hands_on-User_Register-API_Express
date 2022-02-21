import { Express } from "express";

export default function (app: Express) {

// allow overriding methods in query (?_method=put)
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

    
};