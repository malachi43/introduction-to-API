import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import RoomType from "../controllers/roomType.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { validateRoomTypePayload } from "../middlewares/validatePayload.js";
import isAuthorized from "../middlewares/isAuthorized.js";

router.get(
  "/",
  asyncWrapper(async (req: Request, res: Response) => {
    const roomTypes = await RoomType.getAllRoomTypes();
    res.status(200).json({ roomTypes, count: roomTypes.length });
  })
);

router.post(
  "/",
  asyncWrapper(validateRoomTypePayload),
  asyncWrapper(isAuthenticated),
  asyncWrapper(isAuthorized),
  asyncWrapper(async (req: Request, res: Response) => {
    const { name } = req.body;
    const newRoomType = await RoomType.createRoomType({ name });
    res.status(200).json({ roomType: newRoomType });
  })
);

export default router;
