import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({
	path: resolve(__dirname, "../../../.env"),
});

const PORT = Number(process.env.PORT);
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = String(process.env.JWT_SECRET);
const JWT_EXPIRY = String(process.env.JWT_EXPIRY);
const REFRESH_TOKEN_SECRET = String(process.env.REFRESH_TOKEN_SECRET);
const REFRESH_TOKEN_EXPIRY = String(process.env.REFRESH_TOKEN_EXPIRY);

export {
	JWT_EXPIRY,
	JWT_SECRET,
	PORT,
	REFRESH_TOKEN_EXPIRY,
	REFRESH_TOKEN_SECRET,
	SALT_ROUNDS,
};
