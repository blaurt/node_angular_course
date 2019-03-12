"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const position_1 = require("../../controllers/position");
const positionRouter = express.Router();
positionRouter.get("/:categoryId", position_1.getPositionByCategoryId);
positionRouter.post("/", position_1.createPosition);
positionRouter.put("/:id", position_1.updatePosition);
positionRouter.delete("/:id", position_1.deletePositionById);
exports.default = positionRouter;
//# sourceMappingURL=position.js.map