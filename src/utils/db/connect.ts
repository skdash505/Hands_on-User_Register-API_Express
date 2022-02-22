// src/db/connect.ts

import mongoose from "mongoose";
import config from "config";
import log from "../log";

function connect() {
//   const dbUri = config.dbUri as string;
  const dbUri = config.get("dbUri") as string;

  return mongoose
    .connect(dbUri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    })
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
      process.exit(1);
    });
}

export default connect;