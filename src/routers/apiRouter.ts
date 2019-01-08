import * as express from "express";

import authRouter from "./routes/auth";
import analyticsRouter from "./routes/analytic";
import orderRouter from "./routes/order";
import positionRouter from "./routes/position";
import categoryRouter from "./routes/category";
import passport = require("passport");

const apiRouter: express.Router = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/analytics", passport.authenticate("jwt"), analyticsRouter);
apiRouter.use("/order", passport.authenticate("jwt"), orderRouter);
apiRouter.use(
  "/position",
  passport.authenticate("jwt", { session: false }),
  positionRouter
);
apiRouter.use("/category", passport.authenticate("jwt"), categoryRouter);

export default apiRouter;
