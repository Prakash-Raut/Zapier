import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const isPublicPath =
		path === "/login" || path === "/signup" || path === "/verifyemail";

	const token = request.cookies.get("accessToken")?.value || "";

	if (isPublicPath && token) {
		return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
	}

	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}
}

export const config = {
	matcher: [
		"/",
		"/login",
		"/signup",
		"/verifyemail",
		"/dashboard",
	],
};
