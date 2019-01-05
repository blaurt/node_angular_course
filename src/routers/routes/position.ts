import * as express from "express";
import {
  getPositionByCategory,
  createPosition,
  updatePosition,
  deletePositionById
} from "../../controllers/position";

const positionRouter: express.Router = express.Router();

positionRouter.get("/:id", getPositionByCategory);
positionRouter.post("/", createPosition);
positionRouter.put("/:id", updatePosition);
positionRouter.delete("/:id", deletePositionById);

export default positionRouter;
