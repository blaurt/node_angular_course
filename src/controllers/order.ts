import { Request, Response } from "express";
import { Order, IOrder } from "../models/order";

export async function getOrder(req: Request, res: Response): Promise<Response> {
  const { id: userId } = req.user;
  const { offset, limit } = req.query;

  const query = { userId } as any;
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

  const orders = await Order.find(query, null, {
    date: -1,
    skip: parseInt(offset),
    limit: parseInt(limit)
  });
  return res.send(orders);
}

export async function createOrder(
  req: Request,
  res: Response
): Promise<Response> {
  const { list } = req.body;

  const { id: userId } = req.user;
  const lastOrder = await Order.findOne({ userId }, null, { _id: -1 });
  const orderCount = lastOrder ? lastOrder.order : 0;
  const order: IOrder = new Order({ list, userId, order: orderCount + 1 });
  await order.save();
  return res.send(order);
}
