import { Request, Response } from "express";

export function getCategoryList(req: Request, res: Response): Response {
  return res.send({ login: true });
}

export function getCategoryByid(req: Request, res: Response): Response {
  return res.send({ login: true });
}

export function deleteCategoryById(req: Request, res: Response): Response {
  return res.send({ login: true });
}

export function createCategory(req: Request, res: Response): Response {
  return res.send({ login: true });
}

export function updateCategory(req: Request, res: Response): Response {
  return res.send({ login: true });
}
