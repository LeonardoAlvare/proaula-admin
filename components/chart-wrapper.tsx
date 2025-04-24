"use client"

import type { ReactNode } from "react"

interface ChartWrapperProps {
  content: ReactNode
  className?: string
  title?: string
}

export function ChartWrapper({ content, className, title }: ChartWrapperProps) {
  return (
    <div className={className}>
      {content}
      {title && <span className="sr-only">{title}</span>}
    </div>
  )
}
