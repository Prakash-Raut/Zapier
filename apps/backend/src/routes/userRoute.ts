import { Router } from "express";
import {
	getCurrentUser,
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", authMiddleware, getCurrentUser);
userRouter.post("/logout", authMiddleware, logoutUser);

export { userRouter };
