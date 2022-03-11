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


//Create JWT Token
export async function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
): Promise<string | undefined> {

  const perKey = await readKey(keyName);

  // Cerate Token with Private key
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
export async function verifyJwt(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey",
  options?: jwt.VerifyOptions): Promise<validatedToken> {

  const pubKey = await readKey(keyName);

  // Verify Token with Public key
  try {
    const decoded = jwt.verify(token, pubKey, { algorithms: ['RS256'] });
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

  // Read the Key from Plain Key File
  const keyFile = config.get<string>(keyName + "Path");
  return  readFileSync(keyFile).toString();

  // Read the pubKey from sourse Encoded
  // return Buffer.from(config.get<string>(keyName), "base64").toString(
  //   "ascii"
  // );
}