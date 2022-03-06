// src/utils/log/index.ts

import logger, { destination } from "pino";
import dayjs from "dayjs";

import path from "path";
var loggerPath = require('config').loggerPath;

const levels = {
    http: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60
};
// levels: {
//     trace: 0,
//     input: 1,
//     verbose: 2,
//     prompt: 3,
//     debug: 4,
//     info: 5,
//     data: 6,
//     help: 7,
//     warn: 8,
//     error: 9
// },
// colors: {
//     trace: 'magenta',
//     input: 'grey',
//     verbose: 'cyan',
//     prompt: 'grey',
//     debug: 'blue',
//     info: 'green',
//     data: 'grey',
//     help: 'cyan',
//     warn: 'yellow',
//     error: 'red'
// }

const log = logger(
    {
        name: 'ExpressJs Logs',
        customLevels: levels, // our defined levels
        useOnlyCustomLevels: true,
        level: 'http',
        prettyPrint: {
            colorize: true, // colorizes the log
            levelFirst: true,

            // Adds the filename property to the message
            messageFormat: '{filename}: {msg}',
            // need to ignore 'filename' otherwise it appears beneath each log
            // ignore: 'pid,hostname',
            ignore: 'pid,hostname,filename',
        },
        silent      : false,
        json        : false,
        timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD T(HH:mm:ss) Z[Z]')}`,
    },
    logger.destination(`${loggerPath}\\logger.log`)
    // logger.destination(`${loggerPath}\\logger${dayjs().format('_(YYYY-MM-DD)_(HH:mm:ss)_(Z[Z])')}.log`)
)
// ).child({ filename: path.basename(__filename) });

export default log;