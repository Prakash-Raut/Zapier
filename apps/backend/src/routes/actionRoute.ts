import { Router } from "express";
import { getAvailableActions } from "../controllers/actionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const actionRouter = Router();

actionRouter.use("/", authMiddleware);

actionRouter.get("/available", getAvailableActions);

export { actionRouter };
