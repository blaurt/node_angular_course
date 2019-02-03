import { Request, Response } from "express";
import { Position, IPosition } from "../models/position";
import { Document } from "mongoose";

export async function getPositionByCategoryId(
  req: Request,
  res: Response
): Promise<Response> {
  const { categoryId } = req.params;
  const { id: userId } = req.user;
  console.log("userId", userId);
  const positions: Document[] = await Position.find({ categoryId, userId });
  return res.send(positions);
}

export async function createPosition(
  req: Request,
  res: Response
): Promise<Response> {
  const { name, cost, categoryId } = req.body;
  const { id: userId } = req.user;
  const newPosition: IPosition = new Position({
    name,
    cost,
    categoryId,
    userId
  });
  await newPosition.save();

  return res.send(newPosition);
}

export async function updatePosition(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const position = await Position.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true }
  );
  return res.send(position);
}

export async function deletePositionById(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  await Position.deleteOne({ _id: id });
  return res.status(204).send();
}
