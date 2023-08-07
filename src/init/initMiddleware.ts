import express, { Express } from "express";
import path from "path";

import { routesMiddleware } from "../middleware/RoutesMiddleware";
import { errorMiddleware } from "../middleware/ErrorMiddleware";

export function initMiddleware(app: Express) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "public")));
  routesMiddleware(app);
  errorMiddleware(app);
}
