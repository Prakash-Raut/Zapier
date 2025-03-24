import { AppBar } from "@/components/base/AppBar";
import { Hero } from "@/components/base/Hero";
import React from "react";

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
