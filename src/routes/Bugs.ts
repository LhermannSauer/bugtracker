import { Request, Response, NextFunction, Router } from "express";
import * as _ from "lodash";

import bugsController from "../controllers/Bugs.controllers";
import asyncMiddleware from "../middleware/AsyncMiddleware";

export const router: Router = Router();

router.get(
  "/",
  asyncMiddleware(async (req, res, next) => {
    const bugs = await bugsController.getBugs();

    res.send(bugs);
  })
);

router.get(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const bug = await bugsController.getBugById(+req.params.id);

    res.send(bug);
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res, next) => {
    const bug = await bugsController.createBug(req.body);

    res.send(bug);
  })
);

router.put(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const bug = await bugsController.updateBug(+req.params.id, req.body);

    res.send(bug);
  })
);

router.delete(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const deletedBug = await bugsController.deleteBug(+req.params.id);

    res.send(deletedBug);
  })
);
