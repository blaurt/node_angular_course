import { Request, Response } from "express";
import { Category } from "../models/category";
import { Position } from "../models/position";

export async function getCategoryList(
  req: Request,
  res: Response
): Promise<Response> {
  const categories = await Category.find({ userId: req.user.id });
  return res.status(200).json(categories);
}

export async function getCategoryByid(
  req: Request,
  res: Response
): Promise<Response> {
  const category = await Category.findById(req.params.id);
  return res.status(200).json(category);
}

export async function deleteCategoryById(
  req: Request,
  res: Response
): Promise<Response> {
  console.log("dekete");
  await Category.remove({ _id: req.params.id });
  await Position.remove({ category: req.params.id });
  return res.status(200).json({
    message: "Категория удалена."
  });
}
export async function createCategory(
  req: Request,
  res: Response
): Promise<Response> {
  const category = new Category({
    name: req.body.name,
    userId: req.user.id,
    imageSrc: req.file ? req.file.path : ""
  });

  await category.save();
  return res.status(201).json(category);
}

export async function updateCategory(
  req: Request,
  res: Response
): Promise<Response> {
  console.log("updateCategory");
  const updated: any = {
    name: req.body.name
  };

  if (req.file) {
    updated.imageSrc = req.file.path;
  }
  console.log("updated", updated);
  const category = await Category.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updated },
    { new: true }
  );
  return res.status(200).json(category);
}
