// config/default.ts

import path from "path"
// import apiPaths from "./apiPath.json"
import apiPaths from "./apiPaths"

export default {
  // Server Url
  protocol: "http",
  host: "localhost",
  port: 3000,
  serverUrl: `http://localhost:3000`,

  // DataBase Url
  dbUri: "mongodb://localhost:27017/userRegister",

  // Api's subPaths
  apiPaths: apiPaths,

  // Location to LoggerFile
  loggerPath: path.join(__dirname, '../resource/logs'),

  // Factor for Hashing of User password
  saltWorkFactor: 10,

  // Tokens Expairation Time
  // accessTokenExp: -1, // in minutes
  accessTokenExp: "5min", // in minutes
  refreshTokenExp: "30d", // in Days

  // Tokens Session Time
  accessSessionExp: 30, // in Days
  // accessSessionExp: 30, // in minutes
  refreshSessionExp: 30, // in Days

  // Access key for Token (Encoded)
  accessTokenPrivateKey: "ACCESS_TOKEN_PRIVATE_KEY",
  accessTokenPublicKey: "ACCESS_TOKEN_PUBLIC_KEY",

  // Refresh key for Token (Encoded)
  refreshTokenPrivateKey: "REFRESH_TOKEN_PRIVATE_KEY",
  refreshTokenPublicKey: "REFRESH_TOKEN_PUBLIC_KEY",


  // Path to Access key for Token (Plain)
  accessTokenPrivateKeyPath: path.join(__dirname, '../resource/key/id_rsa_access_per.pem'),
  accessTokenPublicKeyPath: path.join(__dirname, '../resource/key/id_rsa_access_pub.pem'),

  // Path to Refresh key for Token (Plain)
  refreshTokenPrivateKeyPath: path.join(__dirname, '../resource/key/id_rsa_refresh_per.pem'),
  refreshTokenPublicKeyPath: path.join(__dirname, '../resource/key/id_rsa_refresh_pub.pem'),

  // 
}