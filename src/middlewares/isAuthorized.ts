import { Request, Response, NextFunction } from "express";
import User from "../controllers/user.controller.js";

async function isAuthorized(req: any, res: Response, next: NextFunction) {
  const id = req.userId;
  const user = await User.fetchUser(id);
  const isAdmin = user.role === "admin";
  if (!isAdmin) throw new Error(`Not Authorized.`);
  next();
}

export default isAuthorized;
