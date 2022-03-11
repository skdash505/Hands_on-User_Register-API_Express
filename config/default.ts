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

  // DataBase Url
  dbUri: "mongodb://localhost:27017/userRegister",

  // Api's subPaths
  apiPaths: apiPaths,
  // apiPaths: apiPaths(),

  // Location to LoggerFile
  loggerPath: path.join(__dirname, '../resource/logs'),

  // Factor for Hashing of User password
  saltWorkFactor: 10,

  // Tokens Expairation Time
  accessTokenExp: "1min", // in minutes
  refreshTokenExp: "30d", // in Days

  // Tokens Session Time
  accessSessionExp: 17, // in minutes
  refreshSessionExp: 30, // in Days

  // Path to Private key for Token
  pubKeyPath: "./resource/key/id_rsa_pub.key",

  // Path to Private key for Token
  perKeyPath: "./resource/key/id_rsa_per.key",

  // 
}