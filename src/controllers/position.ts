import { Request, Response } from "express";
import { Position } from "../models/position";
import { Document } from "mongoose";

export async function getPositionByCategoryId(
  req: Request,
  res: Response
): Promise<Response> {
  const { categoryId } = req.params;
  const { id: userId } = req.user.id;

  const positions: Document[] = await Position.find({ categoryId, userId });
  return res.send(positions);
}

export async function createPosition(
  req: Request,
  res: Response
): Promise<Response> {
  return res.send({ login: true });
}

export async function updatePosition(
  req: Request,
  res: Response
): Promise<Response> {
  return res.send({ login: true });
}

export async function deletePositionById(
  req: Request,
  res: Response
): Promise<Response> {
  return res.send({ login: true });
}
