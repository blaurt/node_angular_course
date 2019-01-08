import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import * as mongoose from "mongoose";
import { IAppSettings, initConfig } from "../config/main";
import * as passport from "passport";
import * as passportJwt from "passport-jwt";
import { useJwt } from "../middlewares/auth";

async function _attachCoreMiddlewares(app: express.Application) {
  const config: IAppSettings = initConfig();

  app.use(morgan(process.env.ENV));
  app.use(passport.initialize());
  useJwt(passport);
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  try {
    await mongoose.connect(
      config.dbConnectionString,
      { useNewUrlParser: true }
    );
  } catch (e) {
    // TODO implement DbCOnnectionError
    console.error("Can not connect to MongoDB", e);
  }
}

let _appInstance = null;
export function getAppInstance() {
  if (!!_appInstance) return _appInstance;

  _appInstance = express();
  _attachCoreMiddlewares(_appInstance);
  return _appInstance;
}
