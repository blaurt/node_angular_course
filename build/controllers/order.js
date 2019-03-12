"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
function getOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = req.user;
        const { offset, limit } = req.query;
        const query = { userId };
        if (req.query.start) {
            query.date = {
                $gte: req.query.start
            };
        }
        if (req.query.end) {
            if (!query.date) {
                query.date = {};
            }
            query.date = {
                $lte: req.query.end
            };
        }
        if (req.query.order) {
            query.order = +req.query.order;
        }
        console.log("query", query);
        const orders = yield order_1.Order.find(query, null, {
            date: -1,
            skip: parseInt(offset),
            limit: parseInt(limit)
        });
        return res.send(orders);
    });
}
exports.getOrder = getOrder;
function createOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { list } = req.body;
        const { id: userId } = req.user;
        const lastOrder = yield order_1.Order.findOne({ userId }, null, { _id: -1 });
        const orderCount = lastOrder ? lastOrder.order : 0;
        const order = new order_1.Order({ list, userId, order: orderCount + 1 });
        yield order.save();
        return res.send(order);
    });
}
exports.createOrder = createOrder;
//# sourceMappingURL=order.js.map