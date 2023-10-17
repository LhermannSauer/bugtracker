import { decode } from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../entities/User.entity";
import { plainToClass } from "class-transformer";
import { ForbiddenError, UnauthorizedError } from "../common/errors";

export const authMiddleware = (req: Request, res: Response, next: Function) => {
  const token = req.headers["x-auth-token"] as string;
  let user: User;

  if (!token) {
    throw new UnauthorizedError();
  }

  try {
    const decoded = decode(token);
    user = plainToClass(User, decoded);
  } catch (error) {
    throw new UnauthorizedError();
  }

  next();
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: Function
) => {
  const token = req.headers["x-auth-token"] as string;
  let user: User;

  if (!token) {
    throw new UnauthorizedError();
  }

  try {
    const decoded = decode(token);
    user = plainToClass(User, decoded);
    if (user.role != "Admin") throw new ForbiddenError();
  } catch (error) {
    throw new UnauthorizedError();
  }

  next();
};
