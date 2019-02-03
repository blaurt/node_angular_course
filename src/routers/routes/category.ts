import * as express from "express";
import {
  getCategoryList,
  getCategoryByid,
  createCategory,
  deleteCategoryById,
  updateCategory
} from "../../controllers/category";
import upload from "../../middlewares/upload";

const categoryRouter: express.Router = express.Router();

categoryRouter.get("/", getCategoryList);
categoryRouter.get("/:id", getCategoryByid);
categoryRouter.post("/", upload.single("image"), createCategory);
categoryRouter.put("/:id", upload.single("image"), updateCategory);
categoryRouter.delete("/:id", deleteCategoryById);

export default categoryRouter;
