"use client"

import { useEffect, useRef } from "react"

interface LineChartProps {
  className?: string
}

export default function LineChart({ className }: LineChartProps) {
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

    // Draw line chart
    const data = [1200, 1900, 3000, 5000, 4000, 3000, 5000, 6000, 3000, 4000, 2000, 3000]
    const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    const maxValue = Math.max(...data) * 1.1
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

    // Draw data line
    ctx.beginPath()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    data.forEach((value, index) => {
      const x = padding.left + (chartWidth * index) / (data.length - 1)
      const y = padding.top + chartHeight - (chartHeight * value) / maxValue
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(padding.left + chartWidth, rect.height - padding.bottom)
    ctx.lineTo(padding.left, rect.height - padding.bottom)
    ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
    ctx.fill()

    // Draw data points
    data.forEach((value, index) => {
      const x = padding.left + (chartWidth * index) / (data.length - 1)
      const y = padding.top + chartHeight - (chartHeight * value) / maxValue
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
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
    labels.forEach((label, index) => {
      if (index % 2 === 0 || rect.width > 500) {
        const x = padding.left + (chartWidth * index) / (data.length - 1)
        ctx.fillText(label, x, rect.height - padding.bottom + 15)
      }
    })

    // Draw y-axis labels
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    const ySteps = 5
    for (let i = 0; i <= ySteps; i++) {
      const value = (maxValue * i) / ySteps
      const y = padding.top + chartHeight - (chartHeight * i) / ySteps
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
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
