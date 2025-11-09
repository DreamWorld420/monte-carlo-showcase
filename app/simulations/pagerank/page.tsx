"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from "lucide-react";
import Link from "next/link";
import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";

type Page = {
	id: string;
	name: string;
	x: number;
	y: number;
	color: string;
	theme: string;
};

type PageLink = {
	from: string;
	to: string;
	probability: number;
};

const PAGES: Page[] = [
	{ id: "amy", name: "Amy", x: 150, y: 100, color: "#E8B4B8", theme: "music" },
	{ id: "ben", name: "Ben", x: 450, y: 100, color: "#F4C542", theme: "tech" },
	{ id: "dan", name: "Dan", x: 150, y: 300, color: "#5B8DBE", theme: "space" },
	{
		id: "chris",
		name: "Chris",
		x: 450,
		y: 300,
		color: "#7CB68E",
		theme: "nature",
	},
];

const LINKS: PageLink[] = [
	{ from: "amy", to: "ben", probability: 1.0 },
	{ from: "ben", to: "amy", probability: 0.33 },
	{ from: "ben", to: "chris", probability: 0.33 },
	{ from: "ben", to: "dan", probability: 0.33 },
	{ from: "dan", to: "amy", probability: 0.5 },
	{ from: "dan", to: "chris", probability: 0.5 },
	{ from: "chris", to: "dan", probability: 0.5 },
	{ from: "chris", to: "ben", probability: 0.5 },
];

export default function PageRankPage() {
	const [visits, setVisits] = useState<Record<string, number>>({
		amy: 0,
		ben: 0,
		dan: 0,
		chris: 0,
	});
	const [currentPage, setCurrentPage] = useState<string>("");
	const [isRunning, setIsRunning] = useState(false);
	const [speed, setSpeed] = useState(10);
	const [totalSteps, setTotalSteps] = useState(0);
	const [chartData, setChartData] = useState<
		Array<{ name: string; percentage: number; fill: string }>
	>([]);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { theme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

	useEffect(() => {
		const newChartData = PAGES.map((page) => ({
			name: page.name,
			percentage: totalSteps > 0 ? (visits[page.id] / totalSteps) * 100 : 0,
			fill: page.color,
		}));
		setChartData(newChartData);
	}, [visits, totalSteps]);

	const drawNetwork = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const width = canvas.width;
		const height = canvas.height;

		ctx.fillStyle = isDark ? "#1e293b" : "#ffffff";
		ctx.fillRect(0, 0, width, height);

		// Draw links with arrows - each direction is a separate curved arrow
		LINKS.forEach((link) => {
			const fromPage = PAGES.find((p) => p.id === link.from);
			const toPage = PAGES.find((p) => p.id === link.to);

			if (!fromPage || !toPage) return;

			const fromX = fromPage.x;
			const fromY = fromPage.y;
			const toX = toPage.x;
			const toY = toPage.y;

			// Check if there's a reverse link to determine curve offset
			const reverseLink = LINKS.find(
				(l) => l.from === link.to && l.to === link.from
			);
			const curveOffset = reverseLink ? 20 : 0;

			// Calculate angle
			const angle = Math.atan2(toY - fromY, toX - fromX);
			const perpAngle = angle + Math.PI / 2;

			// Offset from center to edge of node
			const nodeRadius = 50;
			const startX = fromX + Math.cos(angle) * nodeRadius;
			const startY = fromY + Math.sin(angle) * nodeRadius;
			const endX = toX - Math.cos(angle) * nodeRadius;
			const endY = toY - Math.sin(angle) * nodeRadius;

			// Calculate control point for curve
			const midX = (startX + endX) / 2 + Math.cos(perpAngle) * curveOffset;
			const midY = (startY + endY) / 2 + Math.sin(perpAngle) * curveOffset;

			// Draw curved line
			ctx.beginPath();
			ctx.moveTo(startX, startY);
			ctx.quadraticCurveTo(midX, midY, endX, endY);
			ctx.strokeStyle = isDark ? "#64748b" : "#94a3b8";
			ctx.lineWidth = 2;
			ctx.stroke();

			// Calculate angle at end for arrowhead
			const endAngle = Math.atan2(endY - midY, endX - midX);

			// Draw arrowhead
			const arrowSize = 10;
			ctx.beginPath();
			ctx.moveTo(endX, endY);
			ctx.lineTo(
				endX - arrowSize * Math.cos(endAngle - Math.PI / 6),
				endY - arrowSize * Math.sin(endAngle - Math.PI / 6)
			);
			ctx.lineTo(
				endX - arrowSize * Math.cos(endAngle + Math.PI / 6),
				endY - arrowSize * Math.sin(endAngle + Math.PI / 6)
			);
			ctx.closePath();
			ctx.fillStyle = isDark ? "#64748b" : "#94a3b8";
			ctx.fill();

			// Draw probability label on the curve
			const labelX = midX + Math.cos(perpAngle) * 15;
			const labelY = midY + Math.sin(perpAngle) * 15;

			ctx.fillStyle = isDark ? "#94a3b8" : "#64748b";
			ctx.font = "bold 12px sans-serif";
			ctx.textAlign = "center";
			ctx.fillText(`${(link.probability * 100).toFixed(0)}%`, labelX, labelY);
		});

		// Draw pages as browser windows
		PAGES.forEach((page) => {
			const isCurrent = page.id === currentPage;

			// Browser window
			ctx.fillStyle = isCurrent ? page.color : isDark ? "#334155" : "#f1f5f9";
			ctx.strokeStyle = isDark ? "#475569" : "#cbd5e1";
			ctx.lineWidth = 3;

			// Window shadow for current page
			if (isCurrent) {
				ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
				ctx.shadowBlur = 10;
				ctx.shadowOffsetX = 0;
				ctx.shadowOffsetY = 4;
			}

			// Main window
			const x = page.x - 45;
			const y = page.y - 35;
			const w = 90;
			const h = 70;
			const r = 8;

			ctx.beginPath();
			ctx.moveTo(x + r, y);
			ctx.lineTo(x + w - r, y);
			ctx.quadraticCurveTo(x + w, y, x + w, y + r);
			ctx.lineTo(x + w, y + h - r);
			ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
			ctx.lineTo(x + r, y + h);
			ctx.quadraticCurveTo(x, y + h, x, y + h - r);
			ctx.lineTo(x, y + r);
			ctx.quadraticCurveTo(x, y, x + r, y);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.shadowColor = "transparent";
			ctx.shadowBlur = 0;

			// Browser chrome bar
			ctx.fillStyle = isDark ? "#1e293b" : "#e2e8f0";
			ctx.beginPath();
			ctx.moveTo(x + r, y);
			ctx.lineTo(x + w - r, y);
			ctx.quadraticCurveTo(x + w, y, x + w, y + r);
			ctx.lineTo(x + w, y + 15);
			ctx.lineTo(x, y + 15);
			ctx.lineTo(x, y + r);
			ctx.quadraticCurveTo(x, y, x + r, y);
			ctx.closePath();
			ctx.fill();

			// Browser dots
			for (let i = 0; i < 3; i++) {
				ctx.fillStyle = isDark ? "#475569" : "#cbd5e1";
				ctx.beginPath();
				ctx.arc(x + 10 + i * 8, y + 8, 2, 0, 2 * Math.PI);
				ctx.fill();
			}

			// Page name
			ctx.fillStyle = isCurrent ? "#1e293b" : isDark ? "#e2e8f0" : "#475569";
			ctx.font = "bold 18px sans-serif";
			ctx.textAlign = "center";
			ctx.fillText(page.name, page.x, page.y + 8);

			// Visit count badge
			if (visits[page.id] > 0) {
				const badge = visits[page.id].toString();
				ctx.fillStyle = "#3b82f6";
				ctx.beginPath();
				ctx.arc(page.x + 40, page.y - 30, 12, 0, 2 * Math.PI);
				ctx.fill();

				ctx.fillStyle = "#ffffff";
				ctx.font = "bold 10px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(badge, page.x + 40, page.y - 26);
			}
		});
	};

	useEffect(() => {
		drawNetwork();
	}, [currentPage, visits, isDark]);

	useEffect(() => {
		if (!isRunning) return;

		const simulate = () => {
			// Get outgoing links from current page
			const outgoingLinks = LINKS.filter((link) => link.from === currentPage);

			if (outgoingLinks.length === 0) {
				// Random restart if no outgoing links
				const randomPage = PAGES[Math.floor(Math.random() * PAGES.length)].id;
				setCurrentPage(randomPage);
				setVisits((prev) => ({
					...prev,
					[randomPage]: prev[randomPage] + 1,
				}));
			} else {
				// Follow a random link based on probabilities
				const rand = Math.random();
				let cumulative = 0;

				for (const link of outgoingLinks) {
					cumulative += link.probability;
					if (rand <= cumulative) {
						setCurrentPage(link.to);
						setVisits((prev) => ({
							...prev,
							[link.to]: prev[link.to] + 1,
						}));
						break;
					}
				}
			}

			setTotalSteps((prev) => prev + 1);
		};

		const interval = setInterval(() => {
			for (let i = 0; i < speed; i++) {
				simulate();
			}
		}, 50);

		return () => clearInterval(interval);
	}, [isRunning, currentPage, speed]);

	const reset = () => {
		setVisits({ amy: 0, ben: 0, dan: 0, chris: 0 });
		setCurrentPage("amy");
		setTotalSteps(0);
		setIsRunning(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-chart-4/10 p-4 md:p-8">
			<div className="container mx-auto max-w-6xl">
				<div className="flex items-center justify-between mb-8">
					<Link
						href="/"
						className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
					>
						← Back to all simulations
					</Link>
					<ModeToggle />
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
					<Card className="h-fit">
						<CardHeader>
							<CardTitle className="text-2xl md:text-3xl">
								PageRank Simulation
							</CardTitle>
							<CardDescription>
								Monte Carlo simulation of web surfing behavior
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="bg-card rounded-lg border border-border p-2 md:p-4">
								<canvas
									ref={canvasRef}
									width={600}
									height={400}
									className="w-full h-auto max-w-full"
								/>
							</div>
						</CardContent>
					</Card>

					<div className="space-y-4 md:space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Page Importance</CardTitle>
								<CardDescription>Time spent on each page</CardDescription>
							</CardHeader>
							<CardContent>
								<ChartContainer
									config={{
										percentage: {
											label: "Visits",
										},
									}}
									className="h-[180px] md:h-[200px]"
								>
									<ResponsiveContainer width="100%" height="100%">
										<BarChart data={chartData}>
											<CartesianGrid
												strokeDasharray="3 3"
												stroke="hsl(var(--border))"
											/>
											<XAxis
												dataKey="name"
												tick={{ fill: "hsl(var(--foreground))" }}
											/>
											<YAxis
												label={{
													value: "Visits (%)",
													angle: -90,
													position: "insideLeft",
													style: {
														fill: "hsl(var(--foreground))",
														textAnchor: "middle",
														fontSize: 12,
													},
												}}
												tick={{ fill: "hsl(var(--foreground))" }}
											/>
											<ChartTooltip content={<ChartTooltipContent />} />
											<Bar dataKey="percentage" radius={[8, 8, 0, 0]} />
										</BarChart>
									</ResponsiveContainer>
								</ChartContainer>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Results</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-2 gap-3">
									{PAGES.map((page) => (
										<div
											key={page.id}
											className="rounded-lg p-3"
											style={{ backgroundColor: `${page.color}40` }}
										>
											<p className="text-sm font-medium">{page.name}</p>
											<p className="text-2xl font-bold">
												{visits[page.id].toLocaleString()}
											</p>
											<p className="text-xs text-muted-foreground">
												{totalSteps > 0
													? ((visits[page.id] / totalSteps) * 100).toFixed(1)
													: "0.0"}
												% visits
											</p>
										</div>
									))}
								</div>

								<div className="bg-primary/10 rounded-lg p-4 text-center">
									<p className="text-sm text-muted-foreground mb-1">
										Total Steps
									</p>
									<p className="text-3xl font-bold text-primary font-mono">
										{totalSteps.toLocaleString()}
									</p>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Controls</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex gap-2">
									<Button
										onClick={() => setIsRunning(!isRunning)}
										className="flex-1"
									>
										{isRunning ? (
											<Pause className="w-4 h-4 mr-2" />
										) : (
											<Play className="w-4 h-4 mr-2" />
										)}
										{isRunning ? "Pause" : "Start"}
									</Button>
									<Button onClick={reset} variant="outline">
										<RotateCcw className="w-4 h-4" />
									</Button>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium">Speed: {speed}x</label>
									<Slider
										value={[speed]}
										onValueChange={(v) => setSpeed(v[0])}
										min={1}
										max={50}
										step={1}
									/>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-lg">How it works</CardTitle>
							</CardHeader>
							<CardContent className="text-sm text-muted-foreground space-y-2">
								<p>
									1. Start at a random page and follow links with given
									probabilities
								</p>
								<p>2. Track how many times each page is visited</p>
								<p>3. Pages visited more often are considered more important</p>
								<p className="pt-2 text-xs">
									This simulates how Google's PageRank algorithm determines page
									importance based on the link structure of the web.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
