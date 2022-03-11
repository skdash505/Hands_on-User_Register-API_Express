// src/temo/debugContent.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog, log } from "../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
import config from "config";

// Custom Functions from Lib ??

// Import Essential Librarys
import { Express } from "express";

// Import Essential Services ??

// Import Essential Dto Classes ??

// Import Required Schemas ??
// import { CreateUserInput } from "../schema/user.schema";

// Import Other ??


export default async (app: Express) => {
    masterLog.debug("🤞🎉👨‍🦰 Hi Debugger Here ✌🤷‍♂️");

    // For Logger
    log.debug("🙌hi Debug");
    log.mark("🚀 hi Mark");
    log.trace("🚁 hi trace");
    log.info("🤷‍♂️hi Info");

    log.warn("⚓ Ohh Warn");
    log.error("🥢 Oops Error");
    log.fatal("😈 Opps Fatal");
    // level.addLevels({level: 60, levelStr: 'DEV', colour: 'pink'});
    // console.log(level.getLevel("DEV"));

    // // For Dynamic token expair time
    //   masterLog.debug({
    //     accessTtl: config.get("accessTokenExp"),
    //     accessTtl_maxAge: config.get<number>("accessSessionExp") * (60 * 1000),
    //     refreshTtl: config.get("refreshTokenExp"),
    //     refreshTtl_expires: new Date(Date.now() + config.get<number>("accessSessionExp") * (24 * 60 * 60 * 1000)),
    //   })
}