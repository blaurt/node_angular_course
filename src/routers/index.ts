import * as express from "express";
import apiRouter from "./apiRouter";

const baseRouter: express.Router = express.Router();

baseRouter.use("/api", apiRouter);

 if(['prod','production'].includes){

}

export default baseRouter;
