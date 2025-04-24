"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LineChart from "@/components/charts/line-chart"
import BarChart from "@/components/charts/bar-chart"
import { ChartWrapper } from "@/components/chart-wrapper"

export function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Actividad de Proyectos</CardTitle>
          <CardDescription>Proyectos publicados por mes</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartWrapper
            content={<LineChart className="h-[300px] w-full" />}
            className="h-[300px]"
            title="Actividad de proyectos"
          />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Estadísticas de Propuestas</CardTitle>
          <CardDescription>Propuestas aceptadas vs rechazadas</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartWrapper
            content={<BarChart className="h-[300px] w-full" />}
            className="h-[300px]"
            title="Estadísticas de propuestas"
          />
        </CardContent>
      </Card>
    </div>
  )
}
