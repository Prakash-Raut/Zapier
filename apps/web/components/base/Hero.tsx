import Link from "next/link";
import GoogleIcon from "../icons/GoogleIcon";

export const Hero = () => {
	return (
		<section className="flex flex-col min-h-screen mx-auto justify-center items-center w-full lg:max-w-7xl lg:gap-10 lg:flex-row lg:px-5">
			<div className="flex flex-col justify-center space-y-6 w-1/2">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
					Automate Without Limits
				</h1>
				<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
					Turn chaos into smooth operations by automating workflows yourself—no
					developers, no IT tickets, no delays. The only limit is your
					imagination.
				</h3>
				<div className="flex space-x-4">
					<Link
						href="/signup"
						className="inline-flex items-center justify-center whitespace-nowrap bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-700"
					>
						Start free with email
					</Link>
					<Link
						href="/api/auth/google"
						className="inline-flex items-center justify-center whitespace-nowrap px-8 py-3 border-2 rounded-full text-lg font-semibold hover:border-black dark:hover:border-white"
					>
						<GoogleIcon />
						Start free with Google
					</Link>
				</div>
			</div>
			<div className="w-1/2">
				<img
					src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"
					alt="zapier logo"
					loading="lazy"
					className="rounded-2xl object-contain overflow-hidden"
				/>
			</div>
		</section>
	);
};
