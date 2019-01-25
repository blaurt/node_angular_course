import { Request, Response } from "express";
import { Category } from "../models/category";
import { Position } from "../models/position";

export async function getCategoryList(
  req: Request,
  res: Response
): Promise<Response> {
  const { id: userId } = req.user;
  const list = await Category.find({ userId });
  return res.send(list);
}

export async function getCategoryByid(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const category = await Category.findById(id);
  return res.send(category);
}

export async function deleteCategoryById(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  await Category.deleteOne({ _id: id });
  await Position.deleteMany({ categoryId: id });
  return res.status(204).send();
}

export async function createCategory(
  req: Request,
  res: Response
): Promise<Response> {
  const { name } = req.body;
  const { id: userId } = req.user;
  const category = new Category({
    name,
    userId,
    imageSrc: req.file ? req.file.path : ""
  });
  await category.save();
  return res.send(category);
}

export async function updateCategory(
  req: Request,
  res: Response
): Promise<Response> {
  const { name } = req.body;
  const { id } = req.params;
  const payload = { name } as any;
  if (req.file) {
    payload.imageSrc = req.file.path || "";
  }
  const updatedCategory = Category.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true }
  );
  return res.send(updatedCategory);
}
