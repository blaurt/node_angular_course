import * as express from "express";
import {
  getPositionByCategoryId,
  createPosition,
  updatePosition,
  deletePositionById
} from "../../controllers/position";

const positionRouter: express.Router = express.Router();

positionRouter.get("/:categoryId", getPositionByCategoryId);
positionRouter.post("/", createPosition);
positionRouter.put("/:id", updatePosition);
positionRouter.delete("/:id", deletePositionById);

export default positionRouter;
