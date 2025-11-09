"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { ModeToggle } from "@/components/mode-toggle"

type Point = {
  x: number
  y: number
  inside: boolean
}

export default function PiEstimationPage() {
  const [points, setPoints] = useState<Point[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(10)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark")

  const inside = points.filter((p) => p.inside).length
  const total = points.length
  const piEstimate = total > 0 ? (4 * inside) / total : 0

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = canvas.width

    ctx.fillStyle = isDark ? "#2d3748" : "#ffffff"
    ctx.fillRect(0, 0, size, size)

    ctx.strokeStyle = isDark ? "#718096" : "#FFFF00"
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, size, size)

    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI)
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.stroke()

    points.forEach((point) => {
      const x = point.x * size
      const y = point.y * size

      ctx.beginPath()
      ctx.arc(x, y, 2, 0, 2 * Math.PI)
      ctx.fillStyle = point.inside ? "#10b981" : "#ef4444"
      ctx.fill()
    })
  }, [points, isDark])

  useEffect(() => {
    if (!isRunning) return

    const addPoint = () => {
      const x = Math.random()
      const y = Math.random()
      const distance = Math.sqrt((x - 0.5) ** 2 + (y - 0.5) ** 2)
      const inside = distance <= 0.5

      setPoints((prev) => [...prev, { x, y, inside }])
    }

    const interval = setInterval(() => {
      for (let i = 0; i < speed; i++) {
        addPoint()
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isRunning, speed])

  const reset = () => {
    setPoints([])
    setIsRunning(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-chart-2/10 p-4 md:p-8">
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
              <CardTitle className="text-2xl md:text-3xl">Pi Estimation</CardTitle>
              <CardDescription>Using Monte Carlo method with random points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-card rounded-lg border border-border p-2 md:p-4">
                <canvas ref={canvasRef} width={400} height={400} className="w-full h-auto" />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-accent/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Points Inside</p>
                    <p className="text-2xl font-bold text-chart-2">{inside.toLocaleString()}</p>
                  </div>
                  <div className="bg-accent/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Total Points</p>
                    <p className="text-2xl font-bold">{total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Estimated π</p>
                  <p className="text-4xl font-bold text-primary font-mono">{piEstimate.toFixed(6)}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Actual π: {Math.PI.toFixed(6)} (Error: {Math.abs(piEstimate - Math.PI).toFixed(6)})
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
                  <Button onClick={() => setIsRunning(!isRunning)} className="flex-1">
                    {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isRunning ? "Pause" : "Start"}
                  </Button>
                  <Button onClick={reset} variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Speed: {speed}x</label>
                  <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} min={1} max={50} step={1} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How it works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>1. Generate random points in a square</p>
                <p>2. Count points inside the inscribed circle</p>
                <p>3. π ≈ 4 × (points inside / total points)</p>
                <p className="pt-2 text-xs">The more points generated, the more accurate the estimation becomes.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
