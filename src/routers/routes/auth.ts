import * as express from "express";
import { login, register } from "../../controllers/auth";
const authRouter: express.Router = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;