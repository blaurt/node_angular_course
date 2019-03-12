"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const analytics_1 = require("../../controllers/analytics");
const analyticsRouter = express.Router();
analyticsRouter.get("/analytics", analytics_1.analytics);
analyticsRouter.get("/overview", analytics_1.overview);
exports.default = analyticsRouter;
//# sourceMappingURL=analytic.js.map