import { Router } from "express";
import asyncMiddleware from "../middleware/AsyncMiddleware";

import { container } from "../inversify.config";
import TYPES from "../types";
import { IUserController } from "../interfaces/IUserController";

export const router: Router = Router();
const userController = container.get<IUserController>(TYPES.IUserController);

router.get(
  "/",
  asyncMiddleware(async (req, res, next) => {
    const users = await userController.getUsers();

    res.send(users);
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const user = await userController.getUser(req.params.id);

    res.send(user);
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res, next) => {
    const user = await userController.createUser(req.body);

    res.send(user);
  })
);

router.put(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const user = await userController.updateUser(req.params.id, req.body);

    res.send(user);
  })
);

router.delete(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const result = await userController.deleteUser(req.params.id);

    res.send(result);
  })
);
