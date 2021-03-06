import * as express from "express";

import authRouter from "./routes/auth";
import analyticsRouter from "./routes/analytic";
import orderRouter from "./routes/order";
import positionRouter from "./routes/position";
import categoryRouter from "./routes/category";
import passport = require("passport");
import { errorHandler } from "../utils/errorHandler";

const apiRouter: express.Router = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use(
  "/analytics",
  passport.authenticate("jwt", { session: false }),
  analyticsRouter
);
apiRouter.use(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  orderRouter
);
apiRouter.use(
  "/positions",
  passport.authenticate("jwt", { session: false }),
  positionRouter
);
apiRouter.use(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  categoryRouter
);

apiRouter.use(errorHandler);

export default apiRouter;
