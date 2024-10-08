import { db } from "@repo/db";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

app.use(express.json());

// https://hooks.zapier.com/hooks/catch/17043103/22b8496/
// password logic
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
	// const userId = req.params.userId;
	const zapId = req.params.zapId;
	const body = req.body;

	// store in db a new trigger
	await db.$transaction(async (tx) => {
		const run = await tx.zapRun.create({
			data: {
				zapId: zapId,
				metadata: body,
			},
		});

		await tx.zapRunOutbox.create({
			data: {
				zapRunId: run.id,
			},
		});
	});
	res.json({
		message: "Webhook received",
	});
});

app.listen(3002);
