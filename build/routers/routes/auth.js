"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("../../controllers/auth");
const withAsync_1 = require("../../decorators/withAsync");
const authRouter = express.Router();
authRouter.post("/login", withAsync_1.withAsync(auth_1.login));
authRouter.post("/register", withAsync_1.withAsync(auth_1.register));
exports.default = authRouter;
//# sourceMappingURL=auth.js.map