import jwt from "jsonwebtoken";
import { Router } from "express";
import { instanceToPlain } from "class-transformer";

import TYPES from "../types";
import asyncMiddleware from "../middleware/AsyncMiddleware";
import { container } from "../inversify.config";
import { IUserController } from "../interfaces/IUserController";

export const authRouter = Router();
const userController = container.get<IUserController>(TYPES.IUserController);

if (!process.env.JWTPRIVATEKEY) throw new Error("PrivateKey is required");
const privateKey = process.env.JWTPRIVATEKEY;

authRouter.post(
  "/signup",
  asyncMiddleware(async (req, res, next) => {
    const user = await userController.createUser(req.body);

    const token = jwt.sign(instanceToPlain(user), privateKey);

    res.header({ "x-auth-token": token }).status(200).send();
  })
);

authRouter.post(
  "/login",
  asyncMiddleware(async (req, res, next) => {
    const user = await userController.login(req.body);

    const token = jwt.sign(instanceToPlain(user), privateKey);

    res.header({ "x-auth-token": token }).status(200).send();
  })
);
