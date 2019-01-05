import * as express from "express";
import { analytics, overview } from "../../controllers/analytics";
const analyticsRouter: express.Router = express.Router();

analyticsRouter.get("/analytics", analytics);
analyticsRouter.get("/overview", overview);

export default analyticsRouter;
