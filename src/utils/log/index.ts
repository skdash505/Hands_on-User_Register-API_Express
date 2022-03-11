// src/utils/log/index.ts

// Import Logging Essentials
import path from "path";

// Import Process Configuration
var loggerPath = require('config').loggerPath;
// import config from "config";
// var loggerPath = config.get<"">("loggerPath");

// Custom Functions from Lib ??

// Import Essential Librarys
import { configure, getLogger, Level, levels } from "log4js";

// Import Essential Services ??

// Import Essential Dto Classes ??

// Import Other ??


// Custom Configuration of Logging Path and Categories
configure({
    appenders: {
        out: { type: 'stdout' },
        devFile: { type: 'file', filename: path.join(loggerPath, "dev.log") },
        masterFile: { type: 'file', filename: path.join(loggerPath, "masterLog.log") },
        ownFile: { type: 'multiFile', base: 'resource/logs/', property: 'categoryName', extension: '.log' }
    },
    categories: {
        console: { appenders: ['out'], level: 'ALL' },
        dev: { appenders: ['devFile'], level: 'All' },
        master: { appenders: ['masterFile'], level: 'ALL' },
        default: { appenders: ['ownFile'], level: 'debug' },
    }
});
// TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK


// [
// Level { level: 5e-324, levelStr: 'ALL', colour: 'grey' },
//   Level { level: 5000, levelStr: 'TRACE', colour: 'blue' },
//   Level { level: 10000, levelStr: 'DEBUG', colour: 'cyan' },
//   Level { level: 20000, levelStr: 'INFO', colour: 'green' },
//   Level { level: 30000, levelStr: 'WARN', colour: 'yellow' },
//   Level { level: 40000, levelStr: 'ERROR', colour: 'red' },
//   Level { level: 50000, levelStr: 'FATAL', colour: 'magenta' },
//   Level { level: 9007199254740992, levelStr: 'MARK', colour: 'grey' },
//   Level {
//     level: 1.7976931348623157e+308,
//     levelStr: 'OFF',
//     colour: 'grey'
//   }
// ]

export const level = levels;
export const log = getLogger('console');
export const masterLog = getLogger("master");

const devLog = getLogger("dev");
export function setDevLog(fileName: string, type: Level, messages: any) {
    try {
        devLog.log(type, `${fileName}: ${messages}`);
        log.log(type, `${fileName}: ${messages}`);
        return true;
    } catch (error: any) {
        masterLog.fatal(`Error at setDevLog is: ${error.message}`);
        throw new Error(error);
    }
}

var fileLog: any;
export function creatFileLog(fileName: string) {
    try {
        // let refined_fileName = fileName.replace(".ts","");
        // const fileLog = getLogger(refined_fileName);
        fileLog = getLogger(fileName);
        return true;
    } catch (error: any) {
        masterLog.fatal(`Error at creatFileLog is: ${error.message}`);
        throw new Error(error);
    }
}
export function setLog(type: Level, messages: any) {
    try {
        masterLog.log(type, messages);
        fileLog.log(type, messages);
        return true;
    } catch (error: any) {
        masterLog.fatal(`Error at setLog is: ${error.message}`);
        throw new Error(error);
    }
}
// export function creatandSetLog(fileName: string, type: Level, messages: any, consoleFlag?: boolean) {
//     try {// let refined_fileName = fileName.replace(".ts","");
//         // const fileLog = getLogger(refined_fileName);
//         fileLog = getLogger(fileName);
//         masterLog.log(type, messages);
//         fileLog.log(type, messages);
//         if (!consoleFlag) log.log(type, messages);
//         return true;
//     } catch (error: any) {
//         masterLog.fatal(`Error at creatandSetLog is: ${error.message}`);
//         throw new Error(error);
//     }
// }