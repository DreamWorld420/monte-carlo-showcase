import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutMonteCarloPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
			<div className="container mx-auto px-4 py-8 md:py-16">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-1">
						About Monte Carlo Methods
					</h1>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>What are Monte Carlo Methods?</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 text-muted-foreground">
								<p>
									Monte Carlo methods are a broad class of computational
									algorithms that rely on repeated random sampling to obtain
									numerical results. The underlying concept is to use randomness
									to solve problems that might be deterministic in principle.
								</p>
								<p>
									Named after the famous Monte Carlo Casino in Monaco, these
									methods were formalized during the Manhattan Project in the
									1940s by scientists including Stanislaw Ulam and John von
									Neumann, who used them to study neutron diffusion in nuclear
									weapons.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>How Do They Work?</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 text-muted-foreground">
								<p>The general principle involves:</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>Defining a domain of possible inputs</li>
									<li>
										Generating random inputs from the domain using a probability
										distribution
									</li>
									<li>Performing deterministic computations on the inputs</li>
									<li>
										Aggregating the results to produce estimates or statistical
										properties
									</li>
								</ul>
								<p>
									As the number of samples increases, the accuracy of the
									estimate typically improves, following the law of large
									numbers.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Applications</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 text-muted-foreground">
								<p>Monte Carlo methods are used across many fields:</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>
										<strong>Physics:</strong> Particle transport, quantum
										mechanics, statistical mechanics
									</li>
									<li>
										<strong>Finance:</strong> Option pricing, risk analysis,
										portfolio optimization
									</li>
									<li>
										<strong>Computer Graphics:</strong> Path tracing, global
										illumination, photon mapping
									</li>
									<li>
										<strong>Machine Learning:</strong> Bayesian inference,
										reinforcement learning
									</li>
									<li>
										<strong>Mathematics:</strong> Numerical integration,
										optimization problems
									</li>
									<li>
										<strong>Engineering:</strong> Reliability analysis, system
										design
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Our Simulations</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 text-muted-foreground">
								<p>
									This showcase includes several classic Monte Carlo
									simulations:
								</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>
										<strong>Pi Estimation:</strong> Estimating π by randomly
										sampling points in a square and determining if they fall
										within an inscribed circle
									</li>
									<li>
										<strong>Buffon's Needle:</strong> One of the oldest problems
										in geometric probability, estimating π by dropping needles
										on parallel lines
									</li>
									<li>
										<strong>PageRank:</strong> Simulating Google's algorithm by
										modeling a random web surfer to determine page importance
									</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
