// src/bin/shared/temp.shared.ts

// Import Logging Essentials
import { masterLog } from "../../utils/log";

// Import Essential Librarys
import { Express } from "express";

// Import Other ??


export default function (app: Express) {
	try {
		// // allow overriding methods in query (?_method=put)
		// var methodOverride = require('method-override');
		// app.use(methodOverride('_method'));

	} catch (error: any) {
		masterLog.fatal(`Error at catchError is: ${error.message}`);
		throw new Error(error);
	}
};