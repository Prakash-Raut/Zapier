import { db } from "@repo/db";
import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const authMiddleware = asyncHandler(
	async (req: Request, _: Response, next: NextFunction) => {
		const token =
			req.cookies?.accessToken ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			throw new ApiError(401, "Unauthorized request");
		}

		const decodedToken: JwtPayload = jwt.verify(
			token,
			JWT_SECRET
		) as JwtPayload;

		const user = await db.user.findFirst({
			where: {
				id: decodedToken?._id,
			},
		});

		if (!user) {
			throw new ApiError(401, "Invalid access token");
		}

		req.user = user;

		next();
	}
);
