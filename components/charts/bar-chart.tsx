"use client"

import { useEffect, useRef } from "react"

interface BarChartProps {
  className?: string
  stacked?: boolean
}

export default function BarChart({ className, stacked = false }: BarChartProps) {
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

    // Chart data
    const data = stacked
      ? [
          { label: "Ene", values: [500, 300] },
          { label: "Feb", values: [600, 400] },
          { label: "Mar", values: [400, 200] },
          { label: "Abr", values: [700, 300] },
          { label: "May", values: [800, 400] },
          { label: "Jun", values: [900, 500] },
        ]
      : [
          { label: "Aceptadas", value: 65 },
          { label: "Rechazadas", value: 35 },
        ]

    const colors = stacked
      ? [
          ["#3b82f6", "#93c5fd"], // Blue shades
          ["#10b981", "#6ee7b7"], // Green shades
        ]
      : ["#3b82f6", "#ef4444"] // Blue and red

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

    if (stacked) {
      // Draw stacked bar chart
      const maxValue = Math.max(...data.map((d) => d.values.reduce((a, b) => a + b, 0))) * 1.1
      const barWidth = chartWidth / data.length / 1.5
      const barSpacing = chartWidth / data.length

      // Draw bars
      data.forEach((item, index) => {
        let yOffset = 0
        item.values.forEach((value, valueIndex) => {
          const x = padding.left + index * barSpacing + barSpacing / 2 - barWidth / 2
          const height = (chartHeight * value) / maxValue
          const y = rect.height - padding.bottom - height - yOffset

          ctx.fillStyle = colors[valueIndex % colors.length]
          ctx.fillRect(x, y, barWidth, height)

          yOffset += height
        })
      })

      // Draw x-axis labels
      ctx.textAlign = "center"
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      data.forEach((item, index) => {
        const x = padding.left + index * barSpacing + barSpacing / 2
        ctx.fillText(item.label, x, rect.height - padding.bottom + 15)
      })

      // Draw y-axis labels
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      const ySteps = 5
      for (let i = 0; i <= ySteps; i++) {
        const value = (maxValue * i) / ySteps
        const y = rect.height - padding.bottom - (chartHeight * i) / ySteps
        ctx.fillText(`$${Math.round(value).toLocaleString()}`, padding.left - 10, y)

        // Draw horizontal grid lines
        ctx.beginPath()
        ctx.strokeStyle = "#e2e8f0"
        ctx.setLineDash([2, 2])
        ctx.moveTo(padding.left, y)
        ctx.lineTo(rect.width - padding.right, y)
        ctx.stroke()
        ctx.setLineDash([])
      }
    } else {
      // Draw simple bar chart
      const total = data.reduce((sum, item) => sum + item.value, 0)
      const barWidth = chartWidth / data.length / 1.5
      const barSpacing = chartWidth / data.length

      // Draw bars
      data.forEach((item, index) => {
        const x = padding.left + index * barSpacing + barSpacing / 2 - barWidth / 2
        const height = (chartHeight * item.value) / 100
        const y = rect.height - padding.bottom - height

        ctx.fillStyle = colors[index % colors.length]
        ctx.fillRect(x, y, barWidth, height)

        // Draw value on top of bar
        ctx.textAlign = "center"
        ctx.fillStyle = "#64748b"
        ctx.font = "bold 12px sans-serif"
        ctx.fillText(`${item.value}%`, x + barWidth / 2, y - 10)
      })

      // Draw x-axis labels
      ctx.textAlign = "center"
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      data.forEach((item, index) => {
        const x = padding.left + index * barSpacing + barSpacing / 2
        ctx.fillText(item.label, x, rect.height - padding.bottom + 15)
      })
    }
  }, [stacked])

  return <canvas ref={canvasRef} className={className} />
}
