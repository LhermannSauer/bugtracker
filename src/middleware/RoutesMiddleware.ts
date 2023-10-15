import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { openapiSpecification } from "../swagger";

import { router as indexRouter } from "../routes/Index";
import { router as bugsRouter } from "../routes/Bugs";
import { router as usersRouter } from "../routes/Users";
import { router as projectsRouter } from "../routes/Projects";
import { router as authRouter } from "../routes/Auth";

export function routesMiddleware(app: Express) {
  app.use("/", indexRouter);
  app.use("/", authRouter);
  app.use("/api/projects", projectsRouter);
  app.use("/api/bugs", bugsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}
