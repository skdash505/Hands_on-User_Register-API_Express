// src/bin/server.ts

// Import Essential Librarys
import app from './app';
import path from 'path';

// Import Logging Essentials
import { setDevLog, masterLog, level } from "../utils/log";
const filename = path.basename(__filename);

// Starting the Node Server
const server = new app().startServer()
  .then(port => (setDevLog(filename, level.DEBUG, `Server running on port ${port}`)))
  .catch(error => {
    setDevLog(filename, level.FATAL, error);
    masterLog.fatal(error);
    process.exit(1);
  });

export default server;
