import { prototype } from "stream";

export interface IAppSettings {
  port: number;
  dbConnectionString: string;
  jwtKey: string;
}

function _getDbConnectionString() {
  let dbUrl = process.env.DB_URL;
  const dbUser = process.env.DB_USER;
  const dbPass = process.env.DB_PASS;

  const dbParams = { dbUrl, dbUser, dbPass };
  for (const key in dbParams) {
    if (!dbParams[key]) {
      //TODO implement MissingPAramError
      console.error(`${key} is missing`);
      process.exit();
    }
  }

  dbUrl = dbUrl.replace("<dbuser>", dbUser);
  dbUrl = dbUrl.replace("<dbpassword>", dbPass);
  return dbUrl;
}

export let config: IAppSettings = null;
export function initConfig() {
  config = {
    port: Number(process.env.PORT) || 5000,
    dbConnectionString: _getDbConnectionString(),
    jwtKey: process.env.JWT_KEY
  };
  return config;
}
