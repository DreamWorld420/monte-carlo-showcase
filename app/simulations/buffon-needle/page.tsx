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

type Needle = {
	x: number;
	y: number;
	angle: number;
	crosses: boolean;
};

export default function BuffonNeedlePage() {
	const [needles, setNeedles] = useState<Needle[]>([]);
	const [isRunning, setIsRunning] = useState(false);
	const [speed, setSpeed] = useState(5);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const lineSpacing = 60;
	const needleLength = 50;

	const crosses = needles.filter((n) => n.crosses).length;
	const total = needles.length;
	const piEstimate =
		total > 0 && crosses > 0
			? (2 * needleLength * total) / (lineSpacing * crosses)
			: 0;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const width = canvas.width;
		const height = canvas.height;

		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, width, height);

		ctx.strokeStyle = "#cbd5e1";
		ctx.lineWidth = 2;
		for (let y = lineSpacing; y < height; y += lineSpacing) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
			ctx.stroke();
		}

		needles.forEach((needle) => {
			const x1 = needle.x - (needleLength / 2) * Math.cos(needle.angle);
			const y1 = needle.y - (needleLength / 2) * Math.sin(needle.angle);
			const x2 = needle.x + (needleLength / 2) * Math.cos(needle.angle);
			const y2 = needle.y + (needleLength / 2) * Math.sin(needle.angle);

			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.strokeStyle = needle.crosses ? "#ef4444" : "#10b981";
			ctx.lineWidth = 2;
			ctx.lineCap = "round";
			ctx.stroke();
		});
	}, [needles]);

	useEffect(() => {
		if (!isRunning) return;

		const addNeedle = () => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const x = Math.random() * canvas.width;
			const y = Math.random() * canvas.height;
			const angle = Math.random() * Math.PI;

			// Check if needle crosses a line
			const y1 = y - (needleLength / 2) * Math.sin(angle);
			const y2 = y + (needleLength / 2) * Math.sin(angle);

			const line1 = Math.floor(y1 / lineSpacing);
			const line2 = Math.floor(y2 / lineSpacing);
			const crosses = line1 !== line2;

			setNeedles((prev) => [...prev, { x, y, angle, crosses }]);
		};

		const interval = setInterval(() => {
			for (let i = 0; i < speed; i++) {
				addNeedle();
			}
		}, 50);

		return () => clearInterval(interval);
	}, [isRunning, speed]);

	const reset = () => {
		setNeedles([]);
		setIsRunning(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-chart-3/10 p-4 md:p-8">
			<div className="container mx-auto max-w-6xl">
				<Link
					href="/"
					className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
				>
					← Back to all simulations
				</Link>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<Card className="h-fit">
						<CardHeader>
							<CardTitle className="text-3xl">Buffon's Needle</CardTitle>
							<CardDescription>
								Estimate π by dropping needles on parallel lines
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="bg-card rounded-lg border border-border p-4">
								<canvas
									ref={canvasRef}
									width={500}
									height={500}
									className="w-full h-auto"
								/>
							</div>
						</CardContent>
					</Card>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Results</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="bg-accent/50 rounded-lg p-4">
										<p className="text-sm text-muted-foreground">Crossings</p>
										<p className="text-2xl font-bold text-chart-1">
											{crosses.toLocaleString()}
										</p>
									</div>
									<div className="bg-accent/50 rounded-lg p-4">
										<p className="text-sm text-muted-foreground">
											Total Needles
										</p>
										<p className="text-2xl font-bold">
											{total.toLocaleString()}
										</p>
									</div>
								</div>

								<div className="bg-primary/10 rounded-lg p-6 text-center">
									<p className="text-sm text-muted-foreground mb-2">
										Estimated π
									</p>
									<p className="text-4xl font-bold text-primary font-mono">
										{piEstimate > 0 ? piEstimate.toFixed(6) : "—"}
									</p>
									{piEstimate > 0 && (
										<p className="text-xs text-muted-foreground mt-2">
											Actual π: {Math.PI.toFixed(6)} (Error:{" "}
											{Math.abs(piEstimate - Math.PI).toFixed(6)})
										</p>
									)}
								</div>

								<div className="bg-accent/50 rounded-lg p-4">
									<p className="text-sm text-muted-foreground">
										Probability of Crossing
									</p>
									<p className="text-xl font-bold">
										{total > 0 ? ((crosses / total) * 100).toFixed(2) : "0.00"}%
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
										max={20}
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
								<p>Buffon's Needle problem (1777):</p>
								<p>1. Drop needles randomly on parallel lines</p>
								<p>2. Count how many cross a line</p>
								<p className="font-mono text-xs">π ≈ 2 × L × N / (d × C)</p>
								<p className="text-xs">
									L = needle length, d = line spacing, N = total drops, C =
									crossings
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
