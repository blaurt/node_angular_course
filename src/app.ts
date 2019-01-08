import * as express from "express";

import baseRouter from "./routers";
import { getAppInstance } from "./core/server";
import { initConfig, IAppSettings } from "./config/main";

const { port }: IAppSettings = initConfig();
const app: express.Application = getAppInstance();
app.use(baseRouter);

app.listen(port, () =>
  console.log(`Server running on ${port} with auto restart!`)
);
