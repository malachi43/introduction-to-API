import express, { Request, Response } from "express";
const router = express.Router();
import User from "../controllers/user.controller.js";
import asyncWrapper from "../utils/asyncWrapper.js";

router.post(
  "/register",
  asyncWrapper(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const createdUser = await User.registerUser({ username, password, email });
    console.log(`createdUser: `, createdUser);
    res.status(201).json({ success: true, data: createdUser });
  })
);

router.post(
  "/login",
  asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.loginUser({ email, password });
    res.status(200).json(user);
  })
);

export default router;
