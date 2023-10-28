import { Router } from "express";

import asyncMiddleware from "../middleware/AsyncMiddleware";
import TYPES from "../types";

import { container } from "../inversify.config";
import { IBugsController } from "../interfaces/IBugsController";

export const bugsRouter = Router();
const bugsController = container.get<IBugsController>(TYPES.IBugsController);

bugsRouter.get(
  "/",
  asyncMiddleware(async (req, res, next) => {
    const bugs = await bugsController.getBugs();

    res.send(bugs);
  })
);

bugsRouter.get(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const bug = await bugsController.getBugById(+req.params.id);

    res.send(bug);
  })
);

bugsRouter.post(
  "/",
  asyncMiddleware(async (req, res, next) => {
    const bug = await bugsController.createBug(req.body);

    res.send(bug);
  })
);

bugsRouter.put(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const bug = await bugsController.updateBug(+req.params.id, req.body);

    res.send(bug);
  })
);

bugsRouter.delete(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const result = await bugsController.deleteBug(+req.params.id);

    res.send(result);
  })
);
