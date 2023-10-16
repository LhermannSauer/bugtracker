import { Router } from "express";
import asyncMiddleware from "../middleware/AsyncMiddleware";
import { instanceToPlain } from "class-transformer";
import { container } from "../inversify.config";
import { IUserController } from "../interfaces/IUserController";
import TYPES from "../types";
import jwt from "jsonwebtoken";

export const router: Router = Router();
const userController = container.get<IUserController>(TYPES.IUserController);

if (!process.env.JWTPRIVATEKEY) throw new Error("PrivateKey is required");
const privateKey = process.env.JWTPRIVATEKEY;

router.post(
  "/signup",
  asyncMiddleware(async (req, res, next) => {
    const user = await userController.createUser(req.body);

    const token = jwt.sign(instanceToPlain(user), privateKey);

    res.header({ "x-auth-token": token }).status(200).send();
  })
);

router.post(
  "/login",
  asyncMiddleware(async (req, res, next) => {
    const user = await userController.login(req.body);

    const token = jwt.sign(instanceToPlain(user), privateKey);

    res.header({ "x-auth-token": token }).status(200).send();
  })
);
