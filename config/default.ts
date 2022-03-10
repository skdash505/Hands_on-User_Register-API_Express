// config/default.ts

import path from "path"
import apiPaths from "./apiPaths.json"
// import {apiPaths} from "./apiPaths"

export default {
  // Server Url
  protocol: "http",
  host: "localhost",
  port: 3000,
  serverUrl: `http://localhost:3000`,
  dbUri: "mongodb://localhost:27017/userRegister",

  // Api's subPaths
  apiPaths: apiPaths,
  // apiPaths: apiPaths(),

  // Location to LoggerFile
  loggerPath: path.join(__dirname, '../resource/logs'),

  // Factor for Hashing of User password
  saltWorkFactor: 10,

  // Tokens Expairation Time
  accessTokenExp: "1m", // in minutes
  refreshTokenExp: "60", // in Days

  // Tokens Session Time
  accessSessionExp: 2, // in minutes
  refreshSessionExp: 60, // in Days

  // Public key for Token
  pubKey:
    `-----BEGIN PUBLIC KEY-----
  MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHXit2AqJc62JDRRPiWGuI2YQKE5
  6Lu+TiZrEDzcSD9nkIlZLZx3Qcljqa21VzqMLi+eBRYLLFmBylisdVa/RCY/T728
  kxD7OU0+sP6Flb76KuYRwyuCC/+bsNvnzJ3PM9ehSZRrIP+jvJ7/mog5oJRZ7F7F
  ljS0u8z2/JnJ2dojAgMBAAE=
  -----END PUBLIC KEY-----`,

  // Path to Private key for Token
  perKeyPath: "./resource/key/id_rsa_per.key",

  // 
}