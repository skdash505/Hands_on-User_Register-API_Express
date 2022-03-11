// src/utils/auth/jwt.utils.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, level } from "../../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
import config from "config";

// Custom Functions from Lib ??

// Import Essential Librarys
import jwt from "jsonwebtoken";
import { readFile } from 'fs';

// Import Essential Services ??

// Import Essential Dto Classes
import { validatedToken } from "../../libs/classes/validatedToken";

// Import Other ??


// const pubKey = config.get<string>("pubKey");

// Read the perKey
var perKey: string;
var perKeyFile = path.join(__dirname.split("src")[0], config.get<string>("perKeyPath"));

readFile(perKeyFile, (err, data) => {
  if (err) {
    setDevLog(filename, level.FATAL, `Error at Reading Private Key is: ${err}`);
    // throw err;
  } else {
    perKey = data.toString();
    // console.log(`perKey: ${perKey}`);
  }
})
// Read the pubKey
var pubKey: string;
var pubKeyFile = path.join(__dirname.split("src")[0], config.get<string>("pubKeyPath"));

readFile(pubKeyFile, (err, data) => {
  if (err) {
    setDevLog(filename, level.FATAL, `Error at Reading Public Key is: ${err}`);
    // throw err;
  } else {
    pubKey = data.toString();
    // console.log(`perKey: ${perKey}`);
  }
})

//Create JWT Token
export async function signJwt(object: Object, options?: jwt.SignOptions | undefined): Promise<string | undefined> {
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
export async function verifyJwt(token: string, options?: jwt.VerifyOptions): Promise<validatedToken> {
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