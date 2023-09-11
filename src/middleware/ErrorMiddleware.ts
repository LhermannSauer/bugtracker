import { Express, NextFunction, Request, Response } from "express";
import { InvalidParameterError, NotFoundError } from "../common/errors";

export function errorMiddleware(app: Express): void {
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof NotFoundError) {
      res.status(404).send({ error: error.message });
    }
    if (error instanceof InvalidParameterError) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error " + error.message});
    }
  });
}
