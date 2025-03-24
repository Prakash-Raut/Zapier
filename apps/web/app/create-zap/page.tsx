"use client";

import "@xyflow/react/dist/style.css";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
	Background,
	type Connection,
	Controls,
	type Edge,
	MarkerType,
	MiniMap,
	type Node,
	ReactFlow,
	addEdge,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import {
	Bell,
	ChevronDown,
	HelpCircle,
	Home,
	LayoutGrid,
	Plus,
	Settings,
	Zap,
} from "lucide-react";
import { useCallback, useState } from "react";

interface NodeData {
	label: string;
	type: "trigger" | "action";
}

interface Option {
	id: string;
	name: string;
	description: string;
}

const initialNodes: Node[] = [
	{
		id: "trigger",
		type: "input",
		data: { label: "Select Trigger", type: "trigger" },
		position: { x: 250, y: 0 },
	},
	{
		id: "action1",
		data: { label: "Select Action", type: "action" },
		position: { x: 250, y: 200 },
	},
];

const initialEdges: Edge[] = [
	{
		id: "trigger-action1",
		source: "trigger",
		target: "action1",
		markerEnd: { type: MarkerType.ArrowClosed },
	},
];

const triggerOptions: Option[] = [
	{
		id: "gmail",
		name: "Gmail",
		description: "Trigger when a new email is received",
	},
	{
		id: "slack",
		name: "Slack",
		description: "Trigger when a new message is posted",
	},
	{
		id: "trello",
		name: "Trello",
		description: "Trigger when a new card is created",
	},
];

const actionOptions: Option[] = [
	{
		id: "sheets",
		name: "Google Sheets",
		description: "Add a row to a Google Sheet",
	},
	{
		id: "notion",
		name: "Notion",
		description: "Create a new page in Notion",
	},
	{ id: "twitter", name: "Twitter", description: "Post a new tweet" },
];

export default function CreateZap() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	const onConnect = useCallback(
		(params: Connection) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	);

	const updateNodeData = useCallback(
		(id: string, newData: Partial<NodeData>) => {
			setNodes((nds) =>
				nds.map((node) => {
					if (node.id === id) {
						return { ...node, data: { ...node.data, ...newData } };
					}
					return node;
				}),
			);
		},
		[setNodes],
	);

	const handleNodeClick = useCallback(
		(event: React.MouseEvent, node: { id: string }) => {
			setCurrentNodeId(node.id);
			setDialogOpen(true);
		},
		[],
	);

	const handleOptionSelect = (option: Option) => {
		if (currentNodeId) {
			updateNodeData(currentNodeId, { label: option.name });
		}
		setDialogOpen(false);
	};

	const addNewAction = useCallback(() => {
		const newNodeId = `action${nodes.length}`;
		const newNode = {
			id: newNodeId,
			data: { label: "Select Action", type: "action" },
			position: { x: 250, y: (nodes[nodes.length - 1]?.position.y ?? 0) + 150 },
		};
		setNodes((nds) => [...nds, newNode]);
		setEdges((eds) => [
			...eds,
			{
				id: `edge-${edges.length + 1}`,
				source: nodes[nodes.length - 1]?.id ?? "",
				target: newNodeId,
				markerEnd: { type: MarkerType.ArrowClosed },
			},
		]);
	}, [nodes, edges, setNodes, setEdges]);

	const filteredOptions =
		currentNodeId &&
		nodes.find((n) => n.id === currentNodeId)?.data.type === "trigger"
			? triggerOptions.filter((option) =>
					option.name.toLowerCase().includes(searchTerm.toLowerCase()),
				)
			: actionOptions.filter((option) =>
					option.name.toLowerCase().includes(searchTerm.toLowerCase()),
				);

	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<div className="w-16 flex flex-col items-center py-4 space-y-4">
				<Home className="w-6 h-6" />
				<LayoutGrid className="w-6 h-6" />
				<Zap className="w-6 h-6 text-orange-500" />
				<Bell className="w-6 h-6" />
				<Settings className="w-6 h-6" />
			</div>

			{/* Main content */}
			<div className="flex-1 flex flex-col">
				{/* Header */}
				<header className="border-b px-4 py-2 flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Button variant="ghost" size="sm">
							<ChevronDown className="w-4 h-4 mr-2" />
							Prakash Raut
						</Button>
						<span>/</span>
						<span className="px-2 py-1 rounded text-sm font-medium">PR</span>
						<span className="font-medium">Untitled Zap</span>
						<span className="px-2 py-1 rounded text-sm font-medium">Draft</span>
					</div>
					<div className="flex items-center space-x-4">
						<span className="text-sm font-medium">124%</span>
						<Button variant="ghost" size="sm">
							<HelpCircle className="w-4 h-4 mr-2" />
							Help
						</Button>
					</div>
				</header>

				{/* Content */}
				<main className="flex-1 p-6 space-y-6 overflow-hidden">
					<div className="flex justify-between items-center">
						<Switch />
						<Button variant="secondary">Publish</Button>
					</div>

					{/* React Flow */}
					<div className="h-[calc(100vh-250px)] border rounded-lg overflow-hidden">
						<ReactFlow
							nodes={nodes}
							edges={edges}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							onConnect={onConnect}
							onNodeClick={handleNodeClick}
							fitView
						>
							<Background />
							<Controls />
							<MiniMap />
						</ReactFlow>
					</div>

					<div className="flex justify-center">
						<Button onClick={addNewAction} variant="outline" size="lg">
							<Plus className="w-4 h-4 mr-2" />
							Add Action
						</Button>
					</div>
				</main>
			</div>

			{/* Selection Dialog */}
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{currentNodeId &&
							nodes.find((n) => n.id === currentNodeId)?.data.type === "trigger"
								? "Select a Trigger"
								: "Select an Action"}
						</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						<Input
							className="mb-4"
							placeholder="Search..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<div className="space-y-4">
							{filteredOptions.map((option) => (
								<div
									key={option.id}
									className="flex items-start p-2 hover:rounded-lg cursor-pointer"
									onClick={() => handleOptionSelect(option)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											handleOptionSelect(option);
										}
									}}
								>
									<div className="w-10 h-10 rounded-full flex items-center justify-center mr-3">
										<Zap className="w-6 h-6" />
									</div>
									<div>
										<h3 className="font-medium">{option.name}</h3>
										<p className="text-sm">{option.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
