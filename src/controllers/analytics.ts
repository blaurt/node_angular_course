import { Request, Response } from "express";

export function overview(req: Request, res: Response): Response {
  return res.send({ overview: true });
}

export function analytics(req: Request, res: Response): Response {
    return res.send({ analytics: true });

}
