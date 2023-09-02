import { Express } from "express";
import { router as indexRouter } from "../routes/Index";
import { router as bugsRouter } from "../routes/Bugs";
import swaggerUi from "swagger-ui-express";
import { router as projectsRouter } from "../routes/Projects";
import { openapiSpecification } from "../swagger";

export function routesMiddleware(app: Express) {
  app.use("/", indexRouter);
  app.use("/api/projects", projectsRouter);
  app.use("/api/bugs", bugsRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}
