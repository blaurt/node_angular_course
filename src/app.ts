import * as express from "express";
import * as path from "path";

import baseRouter from "./routers";
import { getAppInstance } from "./core/server";
import { initConfig, IAppSettings } from "./config/main";

const { port }: IAppSettings = initConfig();
const app: express.Application = getAppInstance();
app.use("/uploads", express.static("uploads"));
app.use(baseRouter);

if (["prod", "production"].includes) {
  const publicFolderPath = path.resolve(__dirname, "../ngclient/dist/ngclient");
  console.log("publicFolderPath", publicFolderPath);

  app.use(express.static(publicFolderPath));
  const pathToIndexHtml = path.resolve(publicFolderPath, "index.html");
  console.log("pathToIndexHtml", pathToIndexHtml);

  app.get("*", (req, res) => res.sendfile(pathToIndexHtml));
}

app.listen(port, () =>
  console.log(`Server running on ${port} with auto restart!`)
);
