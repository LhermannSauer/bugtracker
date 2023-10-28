import { Router } from "express";
import { container } from "../inversify.config";

import TYPES from "../types";
import asyncMiddleware from "../middleware/AsyncMiddleware";
import { IProjectController } from "../interfaces/IProjecController";

export const projectsRouter: Router = Router();
const projectController = container.get<IProjectController>(
  TYPES.IProjectController
);

/**
 * @swagger
 * paths:
 *   /api/projects:
 *     get:
 *       summary: Get projects
 *       description: Retrieve a list of projects
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Project'
 *
 */
projectsRouter.get(
  "/",
  asyncMiddleware(async (req, res, next) => {
    const projects = await projectController.getProjects();

    res.send(projects);
  })
);

/**
 * @swagger
 * paths:
 *   /api/projects/:id:
 *     get:
 *       summary: Get projects
 *       description: Retrieve a list of projects
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Project'
 *
 */
projectsRouter.get(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const project = await projectController.getProjectById(+req.params.id);

    res.send(project);
  })
);

projectsRouter.post(
  "/",
  asyncMiddleware(async (req, res, next) => {
    const project = await projectController.createProject(req.body);

    res.send(project);
  })
);

projectsRouter.put(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const project = await projectController.updateProject(
      +req.params.id,
      req.body
    );

    res.send(project);
  })
);

projectsRouter.delete(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const result = await projectController.deleteProject(+req.params.id);

    res.send(result);
  })
);
