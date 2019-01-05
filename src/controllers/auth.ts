import { Request, Response } from "express";

export function login(req: Request, res: Response): Response {
  return res.send({ login: {
    email: req.body.email,
    password: req.body.password,
  } });
}

export function register(req: Request, res: Response): Response {
  return res.send({ register: true });

}
