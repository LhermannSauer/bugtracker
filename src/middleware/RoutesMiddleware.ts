import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { openapiSpecification } from "../swagger";

import { indexRouter } from "../routes/Index";
import { bugsRouter } from "../routes/Bugs";
import { usersRouter } from "../routes/Users";
import { projectsRouter } from "../routes/Projects";
import { authRouter } from "../routes/Auth";
import { adminMiddleware, authMiddleware } from "./AuthMiddleware";

export function routesMiddleware(app: Express) {
  app.use("/", indexRouter);
  app.use("/", authRouter);
  app.use("/api/projects", projectsRouter);
  app.use("/api/bugs", bugsRouter);
  app.use("/api/users", adminMiddleware, usersRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}
