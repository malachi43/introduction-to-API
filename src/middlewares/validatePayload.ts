import { Request, Response, NextFunction } from "express";
import joi from "joi";

async function validateUserPayload(req:Request, res: Response, next: NextFunction) {
  const schema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  });

  await schema.validateAsync(req.body);
  next();
}

async function validateRoomPayload(req:Request, res: Response, next: NextFunction) {
  const schema = joi.object({
    name: joi.string().required(),
    roomType: joi.string().required(),
    price: joi.number().required(),
  });

  await schema.validateAsync(req.body);
  next();
}

async function validateRoomTypePayload(req: Request, res: Response, next: NextFunction) {
  const schema = joi.object({
    name: joi.string().required(),
  });

  await schema.validateAsync(req.body);
  next();
}

export { validateRoomPayload, validateUserPayload, validateRoomTypePayload };
