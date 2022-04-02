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
import { readFile, readFileSync } from 'fs';

// Import Essential Services ??

// Import Essential Dto Classes
import { validatedToken } from "../../libs/classes/validatedToken";

// Import Other ??


// Create JWT Token
export async function signJwt(
  object: object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  exp: string | number
): Promise<string | undefined> {

  const perKey = await readKey(keyName);
  const signOptions: jwt.SignOptions ={
    // issuer: "santanu",
    // subject: "dev",
    // audience: "local",
    expiresIn: exp,
    algorithm: "RS256"
  }

  // Cerate Token with Private key
  try {
    const signToken = jwt.sign(object, perKey, {...signOptions});
    setDevLog(filename, level.MARK, `jwt Token Created successfully`);
    return signToken;
  } catch (error: any) {
    setDevLog(filename, level.ERROR, `Error at signJwt is: ${error}`);
    return undefined;
  }
}

// Validate JWT Token
export async function verifyJwt(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey",
  age: string | number): Promise<validatedToken> {

  const pubKey = await readKey(keyName);
  const verifyOptions: jwt.VerifyOptions ={
    // issuer: "santanu",
    // subject: "dev",
    // audience: "local",
    maxAge: age,
    algorithms: ["RS256"]
  }

  // Verify Token with Public key
  try {
    const decoded = jwt.verify(token, pubKey);
    // const decoded = jwt.verify(token, pubKey, {...verifyOptions});
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

// Read the Key
async function readKey(keyName: string): Promise<string> {
  // // Read the Key from Plain Key File
  // var key = "" as string;
  // const keyFile = config.get<string>(keyName + "Path");
  // await readFile(keyFile, (err, data) => {
  //   if (err) {
  //     setDevLog(filename, level.FATAL, `Error at Reading ${keyName} is: ${err}`);
  //   }
  //   key = data.toString();
  // });
  // return key;

  // // Read the Key from Plain Key File
  // return readFileSync(config.get<string>(keyName + "Path"), "utf8").toString();

  // Read the pubKey from sourse Encoded
  return atob(process.env[config.get<string>(keyName)] || "");
  // console.log(atob(process.env[config.get<string>(keyName)] || ""));
}