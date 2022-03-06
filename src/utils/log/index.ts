// src/utils/log/index.ts
var loggerPath = require('config').loggerPath;
import path from "path";

import { configure, getLogger, Level, levels } from "log4js";

configure({
    appenders: {
        out: { type: 'stdout' },
        devFile: { type: 'file', filename: path.join(loggerPath, "dev.log") },
        masterFile: { type: 'file', filename: path.join(loggerPath, "masterLog.log") },
        ownFile: { type: 'multiFile', base: 'logs/', property: 'categoryName', extension: '.log' }
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
    devLog.log(type, `${fileName}: ${messages}`);
    log.log(type, `${fileName}: ${messages}`);
    return true;
}

var fileLog: any;
export function creatFileLog(fileName: string) {
    // let refined_fileName = fileName.replace(".ts","");
    // const fileLog = getLogger(refined_fileName);
    fileLog = getLogger(fileName);
    return true;
}
export function setLog(type: Level, messages: any) {
    masterLog.log(type, messages);
    fileLog.log(type, messages);
    return true;
}
// export function creatandSetLog(fileName: string, type: Level, messages: any, consoleFlag?: boolean) {
//     // let refined_fileName = fileName.replace(".ts","");
//     // const fileLog = getLogger(refined_fileName);
//     fileLog = getLogger(fileName);
//     masterLog.log(type, messages);
//     fileLog.log(type, messages);
//     if (!consoleFlag) log.log(type, messages);
//     return true;
// }