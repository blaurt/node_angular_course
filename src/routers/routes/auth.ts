import * as express from "express";
import { login, register } from "../../controllers/auth";
import { withAsync } from "../../decorators/withAsync";

const authRouter: express.Router = express.Router();

authRouter.post("/login", withAsync(login));
authRouter.post("/register", withAsync(register));

export default authRouter;
