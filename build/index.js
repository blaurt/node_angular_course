"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const main_1 = require("./config/main");
dotenv.config();
main_1.initConfig();
require("./app");
console.log("env", process.env.DB_URL);
//# sourceMappingURL=index.js.map