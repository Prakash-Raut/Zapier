import { Router } from "express";
import { createZap, getAllZaps, getZap } from "../controllers/zapController";
import { authMiddleware } from "../middlewares/authMiddleware";

const zapRouter = Router();

zapRouter.use("/", authMiddleware);

zapRouter.post("/", createZap);
zapRouter.get("/", getAllZaps);
zapRouter.get("/:id", getZap);

export { zapRouter };
