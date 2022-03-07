// src/utils/db/connect.ts

import mongoose from "mongoose";
import config from "config";

import path from "path";
import { setDevLog, masterLog, level } from "../log";
const filename = path.basename(__filename);

function connect() {
  try {
    //   const dbUri = config.dbUri as string;
    const dbUri = config.get<string>("dbUri");

    return mongoose
      .connect(dbUri, {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
      })
      .then(() => {
        setDevLog(filename, level.INFO, `Database connected`);
      })
      .catch((error) => {
        setDevLog(filename, level.FATAL, `db error ${error}`);
        process.exit(1);
      });
  } catch (error: any) {
    masterLog.fatal(`Error at connect is: ${error.message}`);
    throw new Error(error);
  }
}

export default connect;