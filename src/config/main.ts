export interface IAppSettings {
  port: number;
  dbConnectionString: string;
}

function _getDbConnectionString() {
  let dbUrl = process.env.DB_URL;
  console.log("process.env.ENV", process.env.DB_URL);

  if (!dbUrl) {
    //TODO add DbConnectionError
    console.error("DB_URL is missing");
    process.exit();
  }

  return "123";
}

export function getConfig() {
  const config = {
    port: Number(process.env.PORT) || 5000,
    dbConnectionString: _getDbConnectionString()
  };
  return config;
}
