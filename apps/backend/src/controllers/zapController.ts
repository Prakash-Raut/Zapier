import { db } from "@repo/db";
import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { ZapCreateSchema } from "../types/schemas";
import { asyncHandler } from "../utils";

const createZap = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.user?.id ?? 1;
		const body = req.body;

		const { success, data } = ZapCreateSchema.safeParse(body);

		if (!success) {
			return next(createHttpError(400, "Invalid request body"));
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

		res.status(200).json({ message: "Zap created successfully", zapId });
	},
);

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

	res.status(200).json({
		message: "Zaps fetched successfully",
		zaps,
	});
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

	return res.status(200).json({ message: "Zap fetched successfully", zap });
});

export { createZap, getAllZaps, getZap };
