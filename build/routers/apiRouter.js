"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("./routes/auth");
const analytic_1 = require("./routes/analytic");
const order_1 = require("./routes/order");
const position_1 = require("./routes/position");
const category_1 = require("./routes/category");
const passport = require("passport");
const errorHandler_1 = require("../utils/errorHandler");
const apiRouter = express.Router();
apiRouter.use("/auth", auth_1.default);
apiRouter.use("/analytics", passport.authenticate("jwt", { session: false }), analytic_1.default);
apiRouter.use("/orders", passport.authenticate("jwt", { session: false }), order_1.default);
apiRouter.use("/positions", passport.authenticate("jwt", { session: false }), position_1.default);
apiRouter.use("/categories", passport.authenticate("jwt", { session: false }), category_1.default);
apiRouter.use(errorHandler_1.errorHandler);
exports.default = apiRouter;
//# sourceMappingURL=apiRouter.js.map