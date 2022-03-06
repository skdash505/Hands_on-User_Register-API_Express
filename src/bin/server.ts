// src/bin/server.ts

import app from './app';

import path from "path";
import parentLogger from "../utils/log";
const log = parentLogger.child({ filename: path.basename(__filename) });


const server = new app().startServer()
  .then(port => log.info(`Server running on port ${port}`))
  .catch(error => {
    console.log(error)
    process.exit(1);
  });

export default server;
