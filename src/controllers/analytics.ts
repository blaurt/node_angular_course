import { Request, Response } from "express";
import * as moment from "moment";

import { Order, IOrder, IListItem } from "../models/order";

export async function overview(req: Request, res: Response): Promise<Response> {
  const orders = await Order.find({ userId: req.user.id }).sort({ date: 1 });
  const ordersMap = getOrdersMap(orders);
  const ordersCount = orders.length;
  const daysCount = Object.keys(ordersMap).length;
  const ordersPerDay = Math.floor(ordersCount / daysCount);
  const yesterdayOrders =
    ordersMap[
      moment()
        .add(-1, "d")
        .format("DD.MM.YYYY")
    ] || [];
  const yesterdayOrderLength = yesterdayOrders.length;
  const ordersPercent = (
    (yesterdayOrderLength / ordersPerDay - 1) *
    100
  ).toFixed(2);

  const totalRevenue = calculateRevenue(orders);
  const revenuePerDay = totalRevenue / daysCount;
  const yesterdayRevenue = calculateRevenue(yesterdayOrders);
  const revenuePercent = ((yesterdayRevenue / revenuePerDay - 1) * 100).toFixed(
    2
  );

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
}

function getOrdersMap(orders: IOrder[] = []) {
  const daysOrders = {};
  orders.forEach((order: IOrder) => {
    const date = moment(order.date).format("DD.MM.YYYY");
    if (date === moment().format("DD.MM.YYYY")) return;
    if (!daysOrders[date]) {
      daysOrders[date] = [];
    }

    daysOrders[date].push(order);
  });

  return daysOrders;
}

function calculateRevenue(orders: IOrder[] = []) {
  return orders.reduce((total: number, order: IOrder) => {
    const orderPrice = order.list.reduce(
      (orderTotal: number, item: IListItem) => {
        return (orderTotal += item.cost * item.quantity);
      },
      0
    );

    return total + orderPrice;
  }, 0);
}

export async function analytics(
  req: Request,
  res: Response
): Promise<Response> {
  const orders = await Order.find({ userId: req.user.id }).sort({ date: 1 });
  const ordersMap = getOrdersMap(orders);
  const average = +(
    calculateRevenue(orders) / Object.keys(ordersMap).length
  ).toFixed(2);
  const chart = Object.keys(ordersMap).map((label: string) => {
    const revenue = calculateRevenue(ordersMap[label]);
    const order = ordersMap[label].length;
    return {
      label,
      revenue,
      order
    };
  });
  return res.send({ average, chart });
}
