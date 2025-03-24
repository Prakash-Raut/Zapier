import { db } from "@repo/db";
import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { Config } from "../config/env";
import { asyncHandler } from "../utils";

export const authMiddleware = asyncHandler(
	async (req: Request, _res: Response, next: NextFunction) => {
		const token =
			req.cookies?.accessToken ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			next(createHttpError(401, "Access token not found"));
		}

		const decodedToken: JwtPayload = jwt.verify(
			token,
			Config.BACKEND_JWT_SECRET as string,
		) as JwtPayload;

		const user = await db.user.findFirst({
			where: {
				id: decodedToken?._id,
			},
		});

		if (!user) {
			next(createHttpError(401, "User not found"));
		}

		req.user = user;

		next();
	},
);
