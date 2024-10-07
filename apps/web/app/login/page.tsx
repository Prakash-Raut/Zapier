"use client";

import { CheckFeature } from "@/components/base/CheckFeature";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axiosInstance";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Login() {
	const router = useRouter();

	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onLogin = async (e: any) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			const response = await axiosInstance.post(
				"http://localhost:5000/api/v1/users/login",
				{
					email: user.email,
					password: user.password,
				},
				{
					withCredentials: true,
				}
			);
			console.log("Login success", response.data);
			toast.success("Login success");
			console.log("Redirecting to dashboard");
			router.push("/dashboard");
		} catch (error: any) {
			console.log("Login failed", error.message);
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [user]);

	return (
		<section className="container flex p-24 mx-auto w-full justify-center items-center max-w-7xl gap-20">
			<div className="w-1/2">
				<h2 className="scroll-m-20 pb-2 text-5xl font-semibold tracking-tight first:mt-0">
					Join millions worldwide who automate their work using
					Zapier.
				</h2>
				<div className="flex flex-col pt-10 space-y-6">
					<CheckFeature label="Easy setup, no coding required" />
					<CheckFeature label="Free forever for core features" />
					<CheckFeature label="14-day trial of premium features & apps" />
				</div>
			</div>
			<form className="w-1/2 max-w-md flex flex-col py-6 px-4 space-y-4 border rounded">
				<Link
					href="/api/auth/google"
					className="inline-flex items-center justify-center whitespace-nowrap px-8 py-3 border-2 rounded-full text-lg font-semibold hover:border-black dark:hover:border-white"
				>
					<GoogleIcon />
					Continue with Google
				</Link>
				<Input
					id="email"
					type="text"
					value={user.email}
					onChange={(e) =>
						setUser({ ...user, email: e.target.value })
					}
					placeholder="Work Email"
				/>
				<Input
					id="password"
					type="password"
					value={user.password}
					onChange={(e) =>
						setUser({ ...user, password: e.target.value })
					}
					placeholder="Password"
				/>

				<Button
					size="lg"
					className="w-full font-bold text-xl"
					onClick={onLogin}
					disabled={isButtonDisabled}
				>
					{isLoading ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						"Continue"
					)}
				</Button>

				<p className="text-center">
					Don&apos;t have a Zapier account yet?{" "}
					<Link
						href="/signup"
						className="text-blue-900 underline"
					>
						Sign up
					</Link>{" "}
				</p>
			</form>
		</section>
	);
}
