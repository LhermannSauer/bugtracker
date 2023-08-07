import { Express } from "express";
import { router as indexRouter } from "../routes/Index";
import { router as bugsRouter } from "../routes/Bugs";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../swagger";

export function routesMiddleware(app: Express) {
  app.use("/", indexRouter);
  app.use("/bugs", bugsRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
