import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

async function isAuthenticated(req: any, res: Response, next: NextFunction) {
  const bearerToken = req.headers["authorization"];
  if (!bearerToken) throw new Error(`please provide an authentication token.`);
  const token = bearerToken.split(" ")[1];
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = verifiedToken.id;
  next();
}

export default isAuthenticated;
