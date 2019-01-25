import { Request, Response } from "express";
import { Document, Model } from "mongoose";
import * as bcryptjs from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { User } from "../models/user";
import { config } from "../config/main";

export async function login(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("user not found");
  }
  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).send("invalid password");
  }

  const token = jwt.sign(
    { email: user.email, userId: user._id },
    config.jwtKey,
    {
      expiresIn: 3600
    }
  );

  res.send({ token: `Bearer ${token}` });
}

export async function register(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;
  const existingUser: Document = await User.findOne({ email });
  if (existingUser) {
    // TODO implement user exist error
    res.status(409).send("Email is in use");
  }
  const salt: string = await bcryptjs.genSalt(10);
  const newUser: Document = new User({
    email,
    password: await bcryptjs.hash(password, salt)
  });
  await newUser.save();
  return res.status(201).send(newUser);
}
