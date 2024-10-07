import type { Request, Response } from "express";
import { db } from "@repo/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getAvailableTriggers = asyncHandler(async (_: Request, res: Response) => {
	const triggers = await db.availableTrigger.findMany({});

	if (!triggers) {
		throw new ApiError(404, "No triggers found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, triggers, "Triggers fetched successfully"));
});

export { getAvailableTriggers };
