import cors from "cors";
import express from "express";
import { PORT } from "./config/env";
import { v1Router } from "./routes";

const app = express();

app.use(
	cors({
		origin: ["http://localhost:3000", "https://zapier-web-inky.vercel.app"],
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
	console.log(`Server is up on http://localhost:${PORT}`);
});
