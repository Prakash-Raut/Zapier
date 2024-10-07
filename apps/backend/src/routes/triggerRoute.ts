import { Router } from "express";
import { getAvailableTriggers } from "../controllers/triggerController";
import { authMiddleware } from "../middlewares/authMiddleware";

const triggerRouter = Router();

triggerRouter.use("/", authMiddleware);

triggerRouter.get("/available", getAvailableTriggers);

export { triggerRouter };
