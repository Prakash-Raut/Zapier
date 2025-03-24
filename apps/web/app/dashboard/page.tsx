import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	ChevronDown,
	HelpCircle,
	Home,
	LayoutGrid,
	Search,
	Zap,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<div className="w-64 border-r flex flex-col">
				<div className="p-4">
					<Link
						href="/create-zap"
						className="inline-flex w-full items-center justify-center whitespace-nowrap bg-orange-500 text-white px-6 py-2 rounded-xl text-lg font-semibold hover:bg-orange-600"
					>
						+ Create
					</Link>
				</div>
				<nav className="flex-1 overflow-y-auto">
					<Button
						variant="ghost"
						className="w-full justify-start px-4 py-2 text-left"
					>
						<Home className="w-5 h-5 mr-3" />
						Home
					</Button>
					<Button
						variant="ghost"
						className="w-full justify-start px-4 py-2 text-left"
					>
						<LayoutGrid className="w-5 h-5 mr-3" />
						Discover
					</Button>
					<Button
						asChild
						variant="ghost"
						className="w-full justify-start px-4 py-2 text-left"
					>
						<Link href="/my-zaps">
							<Zap className="w-5 h-5 mr-3" />
							Zaps
						</Link>
					</Button>
					<Button
						variant="ghost"
						className="w-full justify-start px-4 py-2 text-left"
					>
						Tables
					</Button>
					<Button
						variant="ghost"
						className="w-full justify-start px-4 py-2 text-left"
					>
						Interfaces
					</Button>
					<Button
						variant="ghost"
						className="w-full justify-between px-4 py-2 text-left"
					>
						Chatbots
						<Badge variant="outline">Beta</Badge>
					</Button>
					<Button
						variant="ghost"
						className="w-full justify-between px-4 py-2 text-left"
					>
						Canvas
						<Badge variant="outline">Beta</Badge>
					</Button>
					<Button
						variant="ghost"
						className="w-full justify-start px-4 py-2 text-left"
					>
						Apps
					</Button>
					<Button
						variant="ghost"
						className="w-full justify-start px-4 py-2 text-left"
					>
						Zap History
					</Button>
					<Button
						variant="ghost"
						className="w-full justify-start px-4 py-2 text-left"
					>
						More
					</Button>
				</nav>
				<div className="p-4 border-t">
					<div className="text-sm font-medium">Professional plan (Trial)</div>
					<div className="text-xs text-gray-500 mt-1">
						Tasks: 0 / 1,000
						<br />
						Zaps: Unlimited
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 flex flex-col">
				{/* Header */}
				<header className="border-b px-4 py-2 flex items-center justify-between">
					<div className="flex items-center">
						<span className="text-2xl font-bold mr-8">zapier</span>
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
							<Input className="pl-10 pr-4 py-2" placeholder="Search" />
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<Button variant="ghost" size="sm">
							<HelpCircle className="w-4 h-4 mr-2" />
							Help
						</Button>
						<Button variant="ghost" size="sm">
							Explore apps
						</Button>
						<Button variant="ghost" size="sm">
							Contact Sales
						</Button>
						<Button className="bg-violet-600 hover:bg-violet-700">
							Upgrade
						</Button>
						<Avatar>
							<AvatarImage src="/placeholder-user.jpg" alt="PR" />
							<AvatarFallback>PR</AvatarFallback>
						</Avatar>
					</div>
				</header>

				{/* Content */}
				<main className="flex-1 p-6 space-y-6 overflow-y-auto">
					<h1 className="text-4xl font-bold">Welcome to Zapier, Prakash!</h1>

					<div className="p-6 rounded-lg shadow-sm border">
						<h2 className="text-xl font-semibold mb-4">
							What would you like to automate?
						</h2>
						<div className="flex items-center">
							<Input
								className="flex-1 mr-2"
								placeholder="The more details, the better."
							/>
							<Button>
								<ChevronDown className="w-4 h-4" />
							</Button>
						</div>
						<p className="text-sm mt-2">
							Example: When I add a reaction to a Slack message, create a card
							in Trello.
						</p>
					</div>

					<h2 className="text-2xl font-semibold">Start from scratch</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
						{["Zap", "Table", "Interface", "Chatbot", "Canvas"].map((item) => (
							<Button
								key={item}
								variant="outline"
								className="h-24 flex flex-col items-center justify-center"
							>
								<Zap className="w-8 h-8 mb-2" />
								<span>{item}</span>
								<span className="text-xs">
									{item === "Zap" && "Automated workflows"}
									{item === "Table" && "Automated data"}
									{item === "Interface" && "Apps, forms, and pages"}
									{item === "Chatbot" && "AI-powered chatbot"}
									{item === "Canvas" && "Process visualization"}
								</span>
							</Button>
						))}
					</div>

					<h2 className="text-2xl font-semibold">Start from a template</h2>
					{/* Add template cards here */}
				</main>
			</div>
		</div>
	);
}
