// src/utils/log/index.ts
var loggerPath = require('config').loggerPath;
import path from "path";

import { configure, getLogger, Level, levels } from "log4js";

configure({
    appenders: {
        out: { type: 'stdout' },
        devFile: { type: 'file', filename: path.join(loggerPath, "dev.log") },
        masterFile: { type: 'file', filename: path.join(loggerPath, "masterLog.log") },
        ownFile: { type: 'multiFile', base: 'resource/logs/', property: 'categoryName', extension: '.log' }
    },
    categories: {
        console: { appenders: ['out'], level: 'All' },
        dev: { appenders: ['devFile'], level: 'All' },
        master: { appenders: ['masterFile'], level: 'debug' },
        default: { appenders: ['ownFile'], level: 'debug' },
    }
});

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