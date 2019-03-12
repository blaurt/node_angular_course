"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const routers_1 = require("./routers");
const server_1 = require("./core/server");
const main_1 = require("./config/main");
const { port } = main_1.initConfig();
const app = server_1.getAppInstance();
app.use("/uploads", express.static("uploads"));
app.use(routers_1.default);
if (["prod", "production"].includes) {
    const publicFolderPath = path.resolve(__dirname, "../ngclient/dist/ngclient");
    console.log("publicFolderPath", publicFolderPath);
    app.use(express.static(publicFolderPath));
    const pathToIndexHtml = path.resolve(publicFolderPath, "index.html");
    console.log("pathToIndexHtml", pathToIndexHtml);
    app.get("*", (req, res) => res.sendfile(pathToIndexHtml));
}
app.listen(port, () => console.log(`Server running on ${port} with auto restart!`));
//# sourceMappingURL=app.js.map