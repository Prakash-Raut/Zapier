import { Router } from "express";
import { actionRouter } from "./actionRoute";
import { triggerRouter } from "./triggerRoute";
import { userRouter } from "./userRoute";
import { zapRouter } from "./zapRoute";

const v1Router = Router();

v1Router.use("/users", userRouter);

v1Router.use("/zaps", zapRouter);

v1Router.use("/triggers", triggerRouter);

v1Router.use("/actions", actionRouter);

export { v1Router };
