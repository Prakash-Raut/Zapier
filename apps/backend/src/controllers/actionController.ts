import { db } from "@repo/db";
import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { asyncHandler } from "../utils";

const getAvailableActions = asyncHandler(
	async (_req: Request, res: Response, next: NextFunction) => {
		const actions = await db.availableAction.findMany({});

		if (!actions) {
			next(createHttpError(404, "No actions found"));
		}

		return res.status(200).json({
			message: "Actions fetched successfully",
			actions,
		});
	},
);

export { getAvailableActions };
