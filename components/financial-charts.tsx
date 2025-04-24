"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LineChart from "@/components/charts/line-chart"
import PieChart from "@/components/charts/pie-chart"
import { ChartWrapper } from "@/components/chart-wrapper"

export function FinancialCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Ingresos Mensuales</CardTitle>
          <CardDescription>Ingresos generados por la plataforma (5% por proyecto)</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartWrapper
            content={<LineChart className="h-[300px] w-full" />}
            className="h-[300px]"
            title="Ingresos mensuales"
          />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Distribución de Ingresos</CardTitle>
          <CardDescription>Comisiones vs pagos a freelancers</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartWrapper
            content={<PieChart className="h-[300px] w-full" />}
            className="h-[300px]"
            title="Distribución de ingresos"
          />
        </CardContent>
      </Card>
    </div>
  )
}
