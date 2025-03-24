import { db } from "@repo/db";
import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { SigninSchema, SignupSchema } from "../types/schemas";
import { asyncHandler } from "../utils";

const registerUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { success, data } = SignupSchema.safeParse(req.body);

		if (!success) {
			return next(createHttpError(400, "Invalid request body"));
		}

		const { name, email, password } = data;

		const existedUserWithEmail = await db.user.findFirst({
			where: {
				email,
			},
		});

		if (existedUserWithEmail) {
			return next(createHttpError(409, "User already exists with this email"));
		}

		const hashedPassword = await db.user.hashPassword(password);

		const user = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		if (!user) {
			return next(
				createHttpError(500, "Something went wrong while creating the user"),
			);
		}

		const createdUser = await db.user.findFirst({
			where: {
				email: data.email,
			},
			select: {
				id: true,
				email: true,
				password: false,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!createdUser) {
			return next(
				createHttpError(500, "Something went wrong while fetching the user"),
			);
		}

		return res.status(201).json({
			id: createdUser.id,
			message: "User created successfully",
		});
	},
);

const generateAccessAndRefereshTokens = async (userId: number) => {
	try {
		const user = await db.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			return {
				message: "User not found",
			};
		}

		const accessToken = await db.user.generateAccessToken(user);

		const refreshToken = await db.user.generateRefreshToken(user);

		if (refreshToken) {
			user.refreshToken = refreshToken;
		}

		return { accessToken, refreshToken };
	} catch (error) {
		console.log("Error: ", error);
		return {
			message: "Something went wrong while generating tokens",
		};
	}
};

const loginUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { success, data } = SigninSchema.safeParse(req.body);

		if (!success) {
			return next(createHttpError(400, "Invalid request body"));
		}

		const { email, password } = data;

		const user = await db.user.findFirst({
			where: {
				email,
			},
		});

		if (!user) {
			return next(createHttpError(404, "User not found with given email"));
		}

		const encryptedPassword = await db.user.isPasswordCorrect(
			password,
			user.password,
		);

		if (!encryptedPassword) {
			return next(createHttpError(401, "Invalid Username or Password"));
		}

		const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
			user.id,
		);

		if (!accessToken || !refreshToken) {
			return next(
				createHttpError(500, "Something went wrong while generating tokens"),
			);
		}

		const loggedInUser = await db.user.findFirst({
			where: {
				email,
			},
			select: {
				id: true,
				email: true,
				password: false,
				createdAt: true,
				updatedAt: true,
			},
		});

		const options = {
			httpOnly: true,
			secure: true,
		};

		res
			.status(200)
			.cookie("accessToken", accessToken, options)
			.cookie("refreshToken", refreshToken, options)
			.json({
				message: "User logged in successfully",
				user: loggedInUser,
			});
	},
);

const getCurrentUser = async (req: Request, res: Response) => {
	res.status(200).json({
		message: "User found successfully",
		user: req.user,
	});
};

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
	await db.user.update({
		where: {
			id: req.user?.id,
		},
		data: {
			refreshToken: null,
		},
	});

	const options = {
		httpOnly: true,
		secure: true,
	};

	res
		.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json({
			message: "User logged out",
		});
});

export { getCurrentUser, loginUser, logoutUser, registerUser };
