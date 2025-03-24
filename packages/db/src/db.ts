import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Config } from "./env";

class PrismaConfig {
	private static instance: PrismaConfig;
	private prisma: PrismaClient;

	private constructor() {
		this.prisma = new PrismaClient();
	}

	public static getInstance(): PrismaConfig {
		if (!PrismaConfig.instance) {
			PrismaConfig.instance = new PrismaConfig();
		}
		return PrismaConfig.instance;
	}

	public getPrisma(): PrismaClient {
		return this.prisma;
	}
}

const prisma = PrismaConfig.getInstance().getPrisma();

interface IUser {
	id: number;
	name: string;
	email: string;
	password: string;
	refreshToken?: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export const db = prisma.$extends({
	model: {
		user: {
			async hashPassword(password: string): Promise<string> {
				return bcrypt.hash(password, Config.BACKEND_SALT_ROUNDS);
			},
			async isPasswordCorrect(
				inputPassword: string,
				databasePassword: string
			): Promise<boolean> {
				return bcrypt.compare(inputPassword, databasePassword);
			},
			async generateAccessToken(
				user: IUser
			): Promise<string | undefined> {
				return new Promise((resolve, reject) => {
					jwt.sign(
						{ id: user.id },
						Config.BACKEND_JWT_SECRET,
						{ expiresIn: Config.BACKEND_JWT_EXPIRY },
						(err, token) => {
							if (err) {
								return reject(err);
							}
							resolve(token);
						}
					);
				});
			},
			async generateRefreshToken(
				user: IUser
			): Promise<string | undefined> {
				return new Promise((resolve, reject) => {
					jwt.sign(
						{ id: user.id },
						Config.BACKEND_REFRESH_TOKEN_SECRET,
						{ expiresIn: Config.BACKEND_REFRESH_TOKEN_EXPIRY },
						(err, token) => {
							if (err) {
								return reject(err);
							}
							resolve(token);
						}
					);
				});
			},
		},
	},
});
