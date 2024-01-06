import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { decode } from "jsonwebtoken";

import { ForbiddenError, UnauthorizedError } from "../common/errors";
import { User } from "../entities/User.entity";
import { IUser } from "../interfaces/IUser";

export const authMiddleware = (req: Request, res: Response, next: Function) => {
  const token = req.headers["x-auth-token"] as string;
  let user: IUser;

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
