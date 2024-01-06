import { Express, NextFunction, Request, Response } from "express";
import {
  InvalidParameterError,
  NotFoundError,
  ExistingUserError,
  ForbiddenError,
  UnauthorizedError,
} from "../common/errors";

export function errorMiddleware(app: Express): void {
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof NotFoundError) {
      res.status(404).send({ error: error.message });
    } else if (error instanceof InvalidParameterError) {
      res.status(400).send({ error: error.message });
    } else if (error instanceof ForbiddenError) {
      res.status(401).send({ error: error.message });
    } else if (error instanceof ExistingUserError) {
      res.status(400).send({ error: error.message });
    } else if (error instanceof UnauthorizedError) {
      res.status(403).send({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error " + error.message });
    }
  });
}
