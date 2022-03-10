// src/utils/auth/jwt.utils.ts

import path from "path";
import { setDevLog, level } from "../../utils/log";
const filename = path.basename(__filename);

import jwt from "jsonwebtoken";
import config from "config";

const pubKey = config.get<string>("pubKey");

// Read the perKey
var perKey: string;
var keyFile = path.join(__dirname.split("src")[0], config.get<string>("perKeyPath"));

import { readFile } from 'fs';
readFile(keyFile, (err, data) => {
  if (err) {
    setDevLog(filename, level.FATAL, `Error at Reading Private Key is: ${err}`);
    // throw err;
  } else {
    perKey = data.toString();
    // console.log(`perKey: ${perKey}`);
  }
})

//Create JWT Token
export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  try {
    const signToken = jwt.sign(object, perKey, {
      ...(options && options),
      algorithm: 'RS256'
    });
    setDevLog(filename, level.MARK, `jwt Token Created successfully`);
    return signToken;
  } catch (error: any) {
    setDevLog(filename, level.ERROR, `Error at signJwt is: ${error}`);
    return undefined;
  }
}

//Validate JWT Token
export function verifyJwt(token: string, options?: jwt.VerifyOptions) {
  try {
    const decoded = jwt.verify(token, perKey, {
      ...(options && options),
      algorithms:['RS256']
    });
    setDevLog(filename, level.MARK, `jwt Token Verified successfully`);
    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    setDevLog(filename, level.ERROR, `Error at verifyJwt is ${error}`);
    return {
      valid: false,
      // We will use expired to see if we should reissue another token
      expired: error.message.includes(`jwt expired`),
      decoded: null,
    };
  }
}