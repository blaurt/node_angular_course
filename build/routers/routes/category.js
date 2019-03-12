"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const category_1 = require("../../controllers/category");
const upload_1 = require("../../middlewares/upload");
const categoryRouter = express.Router();
categoryRouter.get("/", category_1.getCategoryList);
categoryRouter.get("/:id", category_1.getCategoryByid);
categoryRouter.post("/", upload_1.default.single("image"), category_1.createCategory);
categoryRouter.put("/:id", upload_1.default.single("image"), category_1.updateCategory);
categoryRouter.delete("/:id", category_1.deleteCategoryById);
exports.default = categoryRouter;
//# sourceMappingURL=category.js.map