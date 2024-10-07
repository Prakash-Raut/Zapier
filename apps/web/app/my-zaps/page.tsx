import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function page() {
	return (
		<section className="flex flex-col mx-auto w-full max-w-7xl justify-center items-center">
			<Table>
				<TableCaption>A list of your recent zaps.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="">Name</TableHead>
						<TableHead>Running</TableHead>
						<TableHead>Last Edit</TableHead>
						<TableHead className="text-right">Go</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">Webhook Email Solana</TableCell>
						<TableCell>af9cd1f9-c5a5-47b3-874a-c6f645b59a55</TableCell>
						<TableCell>Nov 13, 2023</TableCell>
						<TableCell className="text-right">Go</TableCell>
					</TableRow>
				</TableBody>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">Webhook Email Solana</TableCell>
						<TableCell>af9cd1f9-c5a5-47b3-874a-c6f645b59a55</TableCell>
						<TableCell>Nov 13, 2023</TableCell>
						<TableCell className="text-right">Go</TableCell>
					</TableRow>
				</TableBody>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">Webhook Email Solana</TableCell>
						<TableCell>af9cd1f9-c5a5-47b3-874a-c6f645b59a55</TableCell>
						<TableCell>Nov 13, 2023</TableCell>
						<TableCell className="text-right">Go</TableCell>
					</TableRow>
				</TableBody>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">Webhook Email Solana</TableCell>
						<TableCell>af9cd1f9-c5a5-47b3-874a-c6f645b59a55</TableCell>
						<TableCell>Nov 13, 2023</TableCell>
						<TableCell className="text-right">Go</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</section>
	);
}
