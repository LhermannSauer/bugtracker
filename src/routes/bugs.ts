import { Request, Response, NextFunction, Router } from "express";
import * as _ from "lodash";

import bugsController from "../controllers/bugs.controllers";
import { Project } from "../entities/Project.entity";
import { Bug } from "../entities/Bug.entity";
import { Status } from "../entities/Status.entity";
import { Priority } from "../entities/Priority.entity";
import asyncMiddleware from "../middleware/asyncMiddleware";

const priorities: Priority[] = [
  {
    id: 1,
    name: "Critical",
  },
];

const statuses: Status[] = [
  {
    id: 1,
    name: "Open",
  },
];

export const router: Router = Router();

const projects: Project[] = [
  {
    id: 1,
    name: "Bugtracker",
    description: "A simple bugtracking app",
    manager: "lhermann@bugtracker.com",
    bugs: [],
  },
  {
    id: 2,
    name: "TodoList",
    description: "Track TODO stuff",
    manager: "lhermann@todolist.com",
    bugs: [],
  },
];

const bugs: Bug[] = [
  {
    id: 1,
    title: "Bug 1",
    description: "Bug 1 description",
    priority: priorities[0],
    project: projects[0],
    status: statuses[0],
    dateCreated: new Date(),
    dueDate: new Date(Date.now() + 2),
  },
  {
    id: 2,
    title: "Bug 2",
    description: "Bug 2 description",
    priority: priorities[0],
    project: projects[1],
    status: statuses[0],
    dateCreated: new Date(),
    dueDate: new Date(Date.now() + 5),
  },
];

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
