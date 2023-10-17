import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { openapiSpecification } from "../swagger";

import { router as indexRouter } from "../routes/Index";
import { router as bugsRouter } from "../routes/Bugs";
import { router as usersRouter } from "../routes/Users";
import { router as projectsRouter } from "../routes/Projects";
import { router as authRouter } from "../routes/Auth";
import { adminMiddleware, authMiddleware } from "./AuthMiddleware";

export function routesMiddleware(app: Express) {
  app.use("/", indexRouter);
  app.use("/", authRouter);
  app.use("/api/projects", authMiddleware, projectsRouter);
  app.use("/api/bugs", authMiddleware, bugsRouter);
  app.use("/api/users", adminMiddleware, usersRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}
