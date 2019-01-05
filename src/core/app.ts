import * as bodyParser from "body-parser";
import * as express from "express";

function _attachCoreMiddlewares(app: express.Application): express.Application {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  return app;
}

let _appInstance = null;
export function getAppInstance() {
  if (!!_appInstance) return _appInstance;

  _appInstance = _attachCoreMiddlewares(express());
  return _appInstance;
}
