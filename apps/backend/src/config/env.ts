import dotenv from "dotenv";
import { resolve } from "node:path";

dotenv.config({
	path: resolve(__dirname, "../../../.env"),
});

const PORT = Number(process.env.BACKEND_PORT);
const SALT_ROUNDS = Number(process.env.BACKEND_SALT_ROUNDS);
const JWT_SECRET = String(process.env.BACKEND_JWT_SECRET);
const JWT_EXPIRY = String(process.env.BACKEND_JWT_EXPIRY);
const REFRESH_TOKEN_SECRET = String(process.env.BACKEND_REFRESH_TOKEN_SECRET);
const REFRESH_TOKEN_EXPIRY = String(process.env.BACKEND_REFRESH_TOKEN_EXPIRY);

export {
	JWT_EXPIRY,
	JWT_SECRET,
	PORT,
	REFRESH_TOKEN_EXPIRY,
	REFRESH_TOKEN_SECRET,
	SALT_ROUNDS,
};
