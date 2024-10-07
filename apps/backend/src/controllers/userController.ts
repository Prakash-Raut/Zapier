import type { Request, Response } from "express";
import { db } from "@repo/db";
import { SigninSchema, SignupSchema } from "../types/schemas";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
	const { success, data, error } = SignupSchema.safeParse(req.body);

	if (!success) {
		throw new ApiError(400, "Invalid request body", error);
	}

	const { name, email, password } = data;

	const existedUserWithEmail = await db.user.findFirst({
		where: {
			email,
		},
	});

	if (existedUserWithEmail) {
		return res
			.status(409)
			.json(new ApiError(409, "User already exists with this email"));
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
		throw new ApiError(500, "Something went wrong while creating the user");
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
		throw new ApiError(
			500,
			"Something went wrong while registering the user"
		);
	}

	return res
		.status(201)
		.json(new ApiResponse(201, createdUser, "User created successfully"));
});

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

const loginUser = asyncHandler(async (req: Request, res: Response) => {
	const { success, data, error } = SigninSchema.safeParse(req.body);

	if (!success) {
		throw new ApiError(400, "Invalid request body", error);
	}

	const { email, password } = data;

	const user = await db.user.findFirst({
		where: {
			email,
		},
	});

	if (!user) {
		throw new ApiError(404, "User not found with given email");
	}

	const encryptedPassword = await db.user.isPasswordCorrect(
		password,
		user.password
	);

	if (!encryptedPassword) {
		throw new ApiError(401, "Invalid password");
	}

	const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
		user.id
	);

	if (!accessToken || !refreshToken) {
		throw new ApiError(500, "Something went wrong while generating tokens");
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

	console.log("Logged In User: ", loggedInUser);

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(
			new ApiResponse(
				200,
				{
					user: loggedInUser,
				},
				"User logged in successfully"
			)
		);
});

const getCurrentUser = async (req: Request, res: Response) => {
	return res
		.status(200)
		.json(new ApiResponse(200, req.user, "User found successfully"));
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

	return res
		.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json(new ApiResponse(200, {}, "User logged Out"));
});

export { getCurrentUser, loginUser, registerUser, logoutUser };
