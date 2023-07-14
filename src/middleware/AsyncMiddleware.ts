import { Request, Response, NextFunction } from "express";

type AsyncMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export default function asyncMiddleware(
  handler: AsyncMiddleware
): AsyncMiddleware {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await handler(req, res, next);
    } catch (ex) {
      next(ex);
    }
  };
}
