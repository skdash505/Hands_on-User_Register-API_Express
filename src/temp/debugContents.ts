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

    // JWT Token_1
    // console.log("accessTokenPrivateKey_Name:", config.get<string>("accessTokenPrivateKey"),);
    // console.log("accessTokenPrivateKey:", Buffer.from(config.get<string>("accessTokenPrivateKey"), "base64").toString(
    //     "ascii"
    // ));
    // console.log("accessTokenPublicKey_Name:", config.get<string>("accessTokenPublicKey"),);
    // console.log("accessTokenPublicKey:", Buffer.from(config.get<string>("accessTokenPublicKey"), "base64").toString(
    //     "ascii"
    // ));
    // console.log("refreshTokenPrivateKey_Name:", config.get<string>("refreshTokenPrivateKey"),);
    // console.log("refreshTokenPrivateKey:", Buffer.from(config.get<string>("refreshTokenPrivateKey"), "base64").toString(
    //     "ascii"
    // ));
    // console.log("refreshTokenPublicKey_Name:", config.get<string>("refreshTokenPublicKey"),);
    // console.log("refreshTokenPublicKey:", Buffer.from(config.get<string>("refreshTokenPublicKey"), "base64").toString(
    //     "ascii"
    // ));

    // JWT Token_2
    // const accessTokenPrivateKey = Buffer.from(config.get<string>("accessTokenPrivateKey"), "base64").toString("ascii");
    // console.log("accessTokenPrivateKey:", accessTokenPrivateKey );
    // const accessTokenPublicKey = Buffer.from(config.get<string>("accessTokenPublicKey"), "base64").toString("ascii");
    // console.log("accessTokenPublicKey:", accessTokenPublicKey );
    // const refreshTokenPrivateKey = Buffer.from(config.get<string>("refreshTokenPrivateKey"), "base64").toString("ascii");
    // console.log("refreshTokenPrivateKey:", refreshTokenPrivateKey );
    // const refreshTokenPublicKey = Buffer.from(config.get<string>("refreshTokenPublicKey"), "base64").toString("ascii");
    // console.log("refreshTokenPublicKey:", refreshTokenPublicKey );


    // // For Provess Env and Config
    // console.log(require('config'));
    // console.log({
    //     "ACCESS_TOKEN_PRIVATE_KEY": process.env.ACCESS_TOKEN_PRIVATE_KEY,
    //     "ACCESS_TOKEN_PUBLIC_KEY": process.env.ACCESS_TOKEN_PUBLIC_KEY,
    //     "REFRESH_TOKEN_PRIVATE_KEY": process.env.REFRESH_TOKEN_PRIVATE_KEY,
    //     "REFRESH_TOKEN_PUBLIC_KEY": process.env.REFRESH_TOKEN_PUBLIC_KEY,
    // });

    // // encode and decode
    // let keyName = "accessTokenPublicKey";
    // console.log(atob(process.env[config.get<string>(keyName)] || ""));
    // let keySetName = config.get<string>(keyName);    
    // var encodedStringAtoB = process.env[keySetName] || "";
    // var decodedStringAtoB = atob(encodedStringAtoB);
    // console.log(decodedStringAtoB);
    


}