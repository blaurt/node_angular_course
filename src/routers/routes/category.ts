import * as express from "express";
import {
  getCategoryList,
  getCategoryByid,
  createCategory,
  deleteCategoryById,
  updateCategory
} from "../../controllers/category";

const categoryRouter: express.Router = express.Router();

categoryRouter.get("/", getCategoryList);
categoryRouter.get("/:id", getCategoryByid);
categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategoryById);

export default categoryRouter;
