import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const simulations = [
	{
		id: "pi-estimation",
		title: "Pi Estimation",
		description:
			"Estimate π using random points in a circle inscribed in a square",
		image: "/abstract-mathematical-visualization-with-circle-an.jpg",
		color: "from-blue-500/20 to-cyan-500/20",
	},
	{
		id: "buffon-needle",
		title: "Buffon's Needle",
		description: "Estimate π by dropping needles on parallel lines",
		image: "/abstract-visualization-of-needles-falling-on-paral.jpg",
		color: "from-orange-500/20 to-yellow-500/20",
	},
	{
		id: "pagerank",
		title: "PageRank",
		description:
			"Simulate Google's PageRank algorithm using random web surfing",
		image: "/abstract-path-visualization-showing-random-walk-tr.jpg",
		color: "from-purple-500/20 to-pink-500/20",
	},
];

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
			<div className="container mx-auto px-4 py-8 md:py-16">
				<div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
					<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-chart-1 to-primary text-balance">
						Monte Carlo Simulations
					</h1>
					<p className="text-base md:text-lg lg:text-xl text-muted-foreground text-balance">
						Explore the power of randomness through interactive visualizations
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
					{simulations.map((sim) => (
						<Link
							key={sim.id}
							href={`/simulations/${sim.id}`}
							className="h-full"
						>
							<Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-border/50 !pt-0">
								<div className="relative h-40 md:h-48 overflow-hidden">
									<div
										className={`absolute inset-0 bg-gradient-to-br ${sim.color} opacity-50`}
									/>
									<img
										src={sim.image || "/placeholder.svg"}
										alt={sim.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<CardContent className="p-4 md:p-6">
									<div className="flex items-start justify-between mb-2">
										<h2 className="text-xl md:text-2xl font-semibold group-hover:text-primary transition-colors">
											{sim.title}
										</h2>
										<ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
									</div>
									<p className="text-sm md:text-base text-muted-foreground">
										{sim.description}
									</p>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
