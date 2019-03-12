"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apiRouter_1 = require("./apiRouter");
const baseRouter = express.Router();
baseRouter.use("/api", apiRouter_1.default);
exports.default = baseRouter;
//# sourceMappingURL=index.js.map