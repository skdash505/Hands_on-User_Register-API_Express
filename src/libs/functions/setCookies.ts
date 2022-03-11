// src/libs/function/setCookies.ts

// Import Logging Essentials
import path, { PlatformPath } from "path";
import { setDevLog, level, masterLog } from "../../utils/log";

// Import Process Configuration ??

// Custom Functions from Lib ??

// Import Essential Librarys
import { Request, Response, NextFunction, CookieOptions } from "express";

// Import Essential Services ??

// Import Essential Dto Classes ??

// Import Required Schemas ??

// Import Other ??


export default async (
    filename: string,
    name: string,
    value: any,
    res: Response,
    next: NextFunction,
    opt: {
        age?: number,
        expaire?: number
        http?: boolean,
        sescure?: boolean,
        path?: string,
    }
) => {

    if (!value) return next();
    var option: CookieOptions = {}
    // var cookiesOption: {
    //     maxAge?: number,
    //     expires?: Date,
    //     path?: string,
    //     httpOnly?: boolean,
    //     secure?: boolean
    // } = {};

    if (opt.age) option.maxAge = opt.age * (60 * 1000);
    if (opt.expaire) option.expires = new Date(Date.now() + opt.expaire * (24 * 60 * 60 * 1000));
    if (opt.path) option.path = opt.path;
    if (opt.http) option.httpOnly = opt.http;
    if (opt.sescure) option.secure = opt.sescure;

    setDevLog(filename, level.MARK, `Sending ${name} in Cookies.`);
    return res.cookie(`${name}`, value, option);
}