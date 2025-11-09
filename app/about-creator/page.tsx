import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Linkedin, Github, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutCreatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-1">
            About the Creator
          </h1>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Kasra Bozorgmehr</CardTitle>
                <p className="text-muted-foreground">Front-End Developer</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="https://dreamworld-protfolio.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    Portfolio Website
                  </Link>
                  <Link
                    href="mailto:dreamworld420@protonmail.com"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    dreamworld420@protonmail.com
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/kasra-bozorgmehr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Link>
                  <Link
                    href="https://github.com/DreamWorld420"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Link>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Hi, I'm Kasra, a 25-year-old front-end developer who enjoys building clean and fast web apps with
                  Next.js, TypeScript, and React. I like turning old code into something simple and easy to work with.
                  Whether I'm working alone or with a team, I focus on writing clean code that everyone can understand
                  and improve. Outside of work, I love learning new things and sharing what I know with others.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experience Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">CanDo</h3>
                      <p className="text-sm text-muted-foreground">Front-End Developer</p>
                    </div>
                    <span className="text-sm text-muted-foreground">Jan 2025 - Present</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Refactored legacy panels, improving Lighthouse scores from 68 to 88</li>
                    <li>Implemented lazy loading, reducing LCP by ~40%</li>
                    <li>Established coding standards with custom ESLint and Prettier configuration</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">Nercidev</h3>
                      <p className="text-sm text-muted-foreground">Front-End Developer</p>
                    </div>
                    <span className="text-sm text-muted-foreground">Nov 2023 - Jan 2025</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Developed 12 CRM dashboards using Next.js and TypeScript</li>
                    <li>Improved load times by ~35% through optimization</li>
                    <li>Implemented centralized design system and reusable UI components</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">SeBuDA</h3>
                      <p className="text-sm text-muted-foreground">Front-End Developer</p>
                    </div>
                    <span className="text-sm text-muted-foreground">Jan 2022 - Nov 2023</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Implemented multi-language support for 6+ languages including RTL</li>
                    <li>Built WebSocket-based escrow system for real-time updates</li>
                    <li>Refactored codebase, enhancing performance by ~35%</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js",
                    "React",
                    "TypeScript",
                    "JavaScript",
                    "Tailwind CSS",
                    "HTML5",
                    "CSS3",
                    "Node.js",
                    "Git",
                    "Responsive Design",
                    "Performance Optimization",
                    "SEO",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
