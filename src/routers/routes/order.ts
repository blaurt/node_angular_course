import * as express from "express";
import { getOrder, createOrder } from "../../controllers/order";
const orderRouter: express.Router = express.Router();

orderRouter.get("/", getOrder);
orderRouter.post("/", createOrder);

export default orderRouter;
