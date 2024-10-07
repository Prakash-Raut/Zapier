import type { Request, Response } from "express";
import { db } from "@repo/db";
import { ZapCreateSchema } from "../types/schemas";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createZap = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id ?? 1;
	const body = req.body;

	const { success, data, error } = ZapCreateSchema.safeParse(body);

	if (!success) {
		throw new ApiError(411, "Invalid request body", error);
	}

	const { actions, availableTriggerId } = data;

	const zapId = await db.$transaction(async (tx) => {
		const zap = await db.zap.create({
			data: {
				userId,
				triggerId: "",
				actions: {
					create: actions.map((x, index) => ({
						actionId: x.availableActionId,
						sortingOrder: index,
						metadata: x.actionMetadata,
					})),
				},
			},
		});

		const trigger = await tx.trigger.create({
			data: {
				triggerId: availableTriggerId,
				zapId: zap.id,
			},
		});

		await tx.zap.update({
			where: {
				id: zap.id,
			},
			data: {
				triggerId: trigger.id,
			},
		});

		return zap.id;
	});
	return res
		.status(200)
		.json(new ApiResponse(200, zapId, "Zap created successfully"));
});

const getAllZaps = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id ?? 1;

	const zaps = await db.zap.findMany({
		where: {
			userId,
		},
		include: {
			actions: {
				include: {
					type: true,
				},
			},
			trigger: {
				include: {
					type: true,
				},
			},
		},
	});

	return res
		.status(200)
		.json(new ApiResponse(200, zaps, "Zaps fetched successfully"));
});

const getZap = asyncHandler(async (req: Request, res: Response) => {
	const userId = req.user?.id ?? 1;
	const zapId = req.params.zapId;

	const zap = await db.zap.findFirst({
		where: {
			id: zapId,
			userId,
		},
		include: {
			actions: {
				include: {
					type: true,
				},
			},
			trigger: {
				include: {
					type: true,
				},
			},
		},
	});

	return res
		.status(200)
		.json(new ApiResponse(200, zap, "Zap fetched successfully"));
});

export { createZap, getAllZaps, getZap };
