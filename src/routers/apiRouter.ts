import * as express from "express";

import authRouter from "./routes/auth";
import analyticsRouter from "./routes/analytic";
import orderRouter from "./routes/order";
import positionRouter from "./routes/position";
import categoryRouter from "./routes/category";

const apiRouter: express.Router = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/analytics", analyticsRouter);
apiRouter.use("/orrder", orderRouter);
apiRouter.use("/position", positionRouter);
apiRouter.use("/category", categoryRouter);

export default apiRouter;
