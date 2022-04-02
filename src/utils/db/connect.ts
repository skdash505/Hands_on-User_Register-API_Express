// src/utils/db/connect.ts

// Import Logging Essentials
import path from "path";
import { setDevLog, masterLog, level } from "../../utils/log";
const filename = path.basename(__filename);

// Import Process Configuration
import config from "config";

// Custom Functions from Lib ??

// Import Essential Librarys
import mongoose from "mongoose";

// Import Essential Services ??

// Import Essential Dto Classes ??

// Import Other ??


function connect() {
  try {
    //   const dbUri = config.dbUri as string;
    const dbUri = process.env.dbUri || config.get<string>("dbUri");

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