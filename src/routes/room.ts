import express, { Request, Response } from "express";
const router = express.Router();
import Room from "../controllers/room.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import isAuthorized from "../middlewares/isAuthorized.js";
import { validateRoomPayload } from "../middlewares/validatePayload.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

router.get(
  "/",
  asyncWrapper(async (req: Request, res: Response) => {
    const rooms = await Room.getAllRooms(req);
    res.status(200).json({ rooms, count: rooms.length });
  })
);

router.get(
  "/:roomId",
  asyncWrapper(async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const room = await Room.getRoom(roomId);
    res.status(200).json({ room });
  })
);

router.post(
  "/",
  asyncWrapper(validateRoomPayload),
  asyncWrapper(isAuthenticated),
  asyncWrapper(isAuthorized),
  asyncWrapper(async (req: Request, res: Response) => {
    const { name, roomType, price } = req.body;
    const newRoom = await Room.createRoom({ name, roomType, price });
    res.status(200).json({ room: newRoom });
  })
);

router.patch(
  "/:roomId",
  asyncWrapper(validateRoomPayload),
  asyncWrapper(isAuthenticated),
  asyncWrapper(isAuthorized),
  asyncWrapper(async (req: Request, res: Response) => {
    const edit = req.body;
    const { roomId } = req.params;
    const room = await Room.editRoom(roomId, edit);
    res.status(200).json({ room });
  })
);

router.delete(
  "/:roomId",
  asyncWrapper(validateRoomPayload),
  asyncWrapper(isAuthenticated),
  asyncWrapper(isAuthorized),
  asyncWrapper(async (req: Request, res: Response) => {
    const { roomId } = req.params;
    await Room.deleteRoom(roomId);
    res.status(200).json({ success: true, msg: `room deleted successfully.` });
  })
);

export default router;
