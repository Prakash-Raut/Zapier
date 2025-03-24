import { db } from "@repo/db";
import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { asyncHandler } from "../utils";

const getAvailableTriggers = asyncHandler(
	async (_req: Request, res: Response, next: NextFunction) => {
		const triggers = await db.availableTrigger.findMany({});

		if (!triggers) {
			next(createHttpError(404, "No triggers found"));
		}

		return res
			.status(200)
			.json({ message: "Triggers fetched successfully", triggers });
	},
);

export { getAvailableTriggers };
