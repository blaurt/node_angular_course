"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const order_1 = require("../../controllers/order");
const orderRouter = express.Router();
orderRouter.get("/", order_1.getOrder);
orderRouter.post("/", order_1.createOrder);
exports.default = orderRouter;
//# sourceMappingURL=order.js.map