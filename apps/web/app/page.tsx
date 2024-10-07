import React from "react";
import { AppBar } from "@/components/base/AppBar";
import { Hero } from "@/components/base/Hero";

export default function Home() {
	return (
		<>
			<AppBar />
			<main className="container">
				<Hero />
			</main>
		</>
	);
}
