import cors from "cors";
import express from "express";
import { Config } from "./config/env";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { v1Router } from "./routes";

const app = express();

app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1Router);

app.use(globalErrorHandler);

app.listen(Config.BACKEND_PORT, () => {
	console.log(`Server is up on http://localhost:${Config.BACKEND_PORT}`);
});
