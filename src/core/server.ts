import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import * as mongoose from "mongoose";
import { IAppSettings, getConfig } from "../config/main";

async function _attachCoreMiddlewares(app: express.Application) {
  const config: IAppSettings = getConfig();

  app.use(morgan(process.env.ENV));

  try {
    await mongoose.connect(config.dbConnectionString);
    console.log("connection to db is successfull");
  } catch (e) {
    console.error("Can not connect to MongoDB", e);
  }

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
}

let _appInstance = null;
export function getAppInstance() {
  if (!!_appInstance) return _appInstance;

  _appInstance = express();
  _attachCoreMiddlewares(_appInstance);
  return _appInstance;
}
