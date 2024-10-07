import type { Request, Response } from "express";
import { db } from "@repo/db";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getAvailableActions = asyncHandler(async (_: Request, res: Response) => {
	const actions = await db.availableAction.findMany({});

	if (!actions) {
		throw new ApiError(404, "No actions found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, actions, "Actions fetched successfully"));
});

export { getAvailableActions };
