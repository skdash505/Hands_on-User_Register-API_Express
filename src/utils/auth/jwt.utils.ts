// src/utils/auth/jwt.utils.ts

import path from "path";
import { setDevLog, level } from "../../utils/log";
const filename = path.basename(__filename);

import jwt from "jsonwebtoken";
import config from "config";

var privateKey: string;
var keyFile = path.join(__dirname.split("src")[0], config.get<string>("privateKeyPath"));

import { readFile } from 'fs';
readFile(keyFile, (err, data) => {
  if (err) {
    setDevLog(filename, level.FATAL, `Error at Reading Private Key is: ${err}`);
    // throw err;
  } else {
    privateKey = data.toString();
    // console.log(`privateKey: ${privateKey}`);
  }
})

// const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  try {
    const signToken = jwt.sign(object, privateKey, {
      ...(options && options),
      algorithm: 'RS256'
    });
    setDevLog(filename, level.INFO, `jwt Token Created successfully`);
    return signToken;
  } catch (error: any) {
    setDevLog(filename, level.ERROR, `Error at signJwt is: ${error}`);
    return undefined;
  }
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);
    setDevLog(filename, level.INFO, `jwt Token Verified successfully`);
    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    setDevLog(filename, level.ERROR, `jwt Token expired ${error}`);
    return {
      valid: false,
      // We will use expired to see if we should reissue another token
      expired: error.message.include(`jwt Token expired`),
      decoded: null,
    };
  }
}