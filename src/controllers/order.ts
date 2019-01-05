import { Request, Response } from "express";

export function getOrder(req: Request, res: Response): Response {
  return res.send({ login: true });
}

export function createOrder(req: Request, res: Response): Response {
    return res.send({ login: true });

}
