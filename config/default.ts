// config/default.ts

import path from "path"
import apiPaths from "./apiPaths.json"
// import {apiPaths} from "./apiPaths"

export default {
  protocol: "http",
  host: "localhost",
  port: 3000,
  serverUrl: `http://localhost:3000`,
  dbUri: "mongodb://localhost:27017/userRegister",

  apiPaths: apiPaths,
  // apiPaths: apiPaths(),

  loggerPath: path.join(__dirname, '../resource/logs'),
  
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",

  publicKey: 
  `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHXit2AqJc62JDRRPiWGuI2YQKE5
6Lu+TiZrEDzcSD9nkIlZLZx3Qcljqa21VzqMLi+eBRYLLFmBylisdVa/RCY/T728
kxD7OU0+sP6Flb76KuYRwyuCC/+bsNvnzJ3PM9ehSZRrIP+jvJ7/mog5oJRZ7F7F
ljS0u8z2/JnJ2dojAgMBAAE=
-----END PUBLIC KEY-----`,

privateKeyPath: "./resource/key/id_rsa_private.key"
}