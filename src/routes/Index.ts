import Router, { Request, Response, NextFunction } from "express";

export const indexRouter = Router();

/* GET home page. */
indexRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send(
    "<br><hr><hr><h1 style='text-align: center; color: green'>Welcome my Dudes</h1><hr><hr>"
  );
});
