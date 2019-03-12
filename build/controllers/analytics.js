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
const moment = require("moment");
const order_1 = require("../models/order");
function overview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield order_1.Order.find({ userId: req.user.id }).sort({ date: 1 });
        const ordersMap = getOrdersMap(orders);
        const ordersCount = orders.length;
        const daysCount = Object.keys(ordersMap).length;
        const ordersPerDay = Math.floor(ordersCount / daysCount);
        const yesterdayOrders = ordersMap[moment()
            .add(-1, "d")
            .format("DD.MM.YYYY")] || [];
        const yesterdayOrderLength = yesterdayOrders.length;
        const ordersPercent = ((yesterdayOrderLength / ordersPerDay - 1) *
            100).toFixed(2);
        const totalRevenue = calculateRevenue(orders);
        const revenuePerDay = totalRevenue / daysCount;
        const yesterdayRevenue = calculateRevenue(yesterdayOrders);
        const revenuePercent = ((yesterdayRevenue / revenuePerDay - 1) * 100).toFixed(2);
        const compareRevenue = (yesterdayRevenue - revenuePerDay).toFixed(2);
        const compareCount = (yesterdayOrderLength - ordersPerDay).toFixed(2);
        return res.send({
            gain: {
                percent: Math.abs(+revenuePercent),
                compare: Math.abs(+compareRevenue),
                yesterday: +yesterdayRevenue,
                isHigher: +revenuePercent > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareCount),
                yesterday: +yesterdayOrderLength,
                isHigher: +ordersPercent > 0
            }
        });
    });
}
exports.overview = overview;
function getOrdersMap(orders = []) {
    const daysOrders = {};
    orders.forEach((order) => {
        const date = moment(order.date).format("DD.MM.YYYY");
        if (date === moment().format("DD.MM.YYYY"))
            return;
        if (!daysOrders[date]) {
            daysOrders[date] = [];
        }
        daysOrders[date].push(order);
    });
    return daysOrders;
}
function calculateRevenue(orders = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => {
            return (orderTotal += item.cost * item.quantity);
        }, 0);
        return total + orderPrice;
    }, 0);
}
function analytics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield order_1.Order.find({ userId: req.user.id }).sort({ date: 1 });
        const ordersMap = getOrdersMap(orders);
        const average = +(calculateRevenue(orders) / Object.keys(ordersMap).length).toFixed(2);
        const chart = Object.keys(ordersMap).map((label) => {
            const revenue = calculateRevenue(ordersMap[label]);
            const order = ordersMap[label].length;
            return {
                label,
                revenue,
                order
            };
        });
        return res.send({ average, chart });
    });
}
exports.analytics = analytics;
//# sourceMappingURL=analytics.js.map