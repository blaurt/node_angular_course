export interface IAppSettings {
  port: number;
}

export function getConfig() {
  const config = {
    port: Number(process.env.PORT) || 5000
  };
  return config;
}
