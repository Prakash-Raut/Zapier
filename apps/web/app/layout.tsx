import type { Metadata } from "next";
import localFont from "next/font/local";
import Provider from "../components/providers/Provider";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
});

export const metadata: Metadata = {
	title: "Zapier",
	description: "Automate your workflow with Zapier",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Provider>{children}</Provider>
				<Toaster />
			</body>
		</html>
	);
}
