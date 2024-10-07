import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { buttonVariants } from "../ui/button";

export function AppBar() {
	return (
		<header className="flex border-b justify-between px-8 py-2">
			<div className="flex flex-col justify-center text-2xl font-extrabold">
				Zapier
			</div>
			<nav className="flex justify-center items-center">
				<ul className="flex space-x-6">
					{
						[
							"Product",
							"Solutions",
							"Resources",
							"Enterprises",
							"Pricing",
						].map((item) => (
							<li key={item}>
								<Link href={`/${item.toLowerCase()}`}>
									{item}
								</Link>
							</li>
						))
					}
				</ul>
			</nav>
			<div className="flex space-x-4">
				<ModeToggle />
				<Link
					href="/signup"
					className={buttonVariants({ variant: "ghost" })}
				>
					Contact Sales
				</Link>
				<Link
					href="/login"
					className={buttonVariants({ variant: "ghost" })}
				>
					Login
				</Link>
				<Link
					href="/signup"
					className="inline-flex items-center justify-center whitespace-nowrap bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-700"
				>
					Signup
				</Link>
			</div>
		</header>
	);
}
