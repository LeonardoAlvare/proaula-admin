"use client"

import { useEffect, useRef } from "react"

interface ScatterChartProps {
  className?: string
}

export default function ScatterChart({ className }: ScatterChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Chart data - [x, y] pairs
    const data = [
      [10, 40],
      [20, 30],
      [30, 60],
      [40, 40],
      [50, 70],
      [60, 50],
      [70, 80],
      [80, 60],
      [90, 90],
    ]

    const padding = { top: 20, right: 20, bottom: 30, left: 40 }
    const chartWidth = rect.width - padding.left - padding.right
    const chartHeight = rect.height - padding.top - padding.bottom

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, rect.height - padding.bottom)
    ctx.lineTo(rect.width - padding.right, rect.height - padding.bottom)
    ctx.stroke()

    // Draw data points
    data.forEach(([x, y]) => {
      const pointX = padding.left + (chartWidth * x) / 100
      const pointY = padding.top + chartHeight - (chartHeight * y) / 100

      // Draw point
      ctx.beginPath()
      ctx.arc(pointX, pointY, 6, 0, Math.PI * 2)
      ctx.fillStyle = "#3b82f6"
      ctx.fill()
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Draw x-axis labels
    ctx.textAlign = "center"
    ctx.fillStyle = "#64748b"
    ctx.font = "10px sans-serif"
    for (let i = 0; i <= 10; i += 2) {
      const value = i * 10
      const x = padding.left + (chartWidth * value) / 100
      ctx.fillText(value.toString(), x, rect.height - padding.bottom + 15)
    }

    // Draw y-axis labels
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    for (let i = 0; i <= 10; i += 2) {
      const value = i * 10
      const y = padding.top + chartHeight - (chartHeight * value) / 100
      ctx.fillText(value.toString(), padding.left - 10, y)

      // Draw horizontal grid lines
      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.setLineDash([2, 2])
      ctx.moveTo(padding.left, y)
      ctx.lineTo(rect.width - padding.right, y)
      ctx.stroke()
      ctx.setLineDash([])
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
