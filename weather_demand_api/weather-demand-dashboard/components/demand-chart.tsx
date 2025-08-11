"use client"

import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PredictionData {
  date: string
  predicted_demand: 'Low' | 'Medium' | 'High'
  prophet_forecast: number
  dynamic_price: number
  confidence: number
  weather_impact: number
}

interface DemandChartProps {
  data: PredictionData[]
  detailed?: boolean
}

export default function DemandChart({ data, detailed = false }: DemandChartProps) {
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    demand: item.predicted_demand === 'High' ? 3 : item.predicted_demand === 'Medium' ? 2 : 1,
    forecast: item.prophet_forecast,
    confidence: item.confidence,
    weatherImpact: item.weather_impact,
    demandLabel: item.predicted_demand
  }))

  if (detailed) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Demand Level Prediction</CardTitle>
            <CardDescription>XGBoost classification results</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                demand: {
                  label: "Demand Level",
                  color: "hsl(var(--chart-1))",
                },
                confidence: {
                  label: "Confidence %",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-3 border rounded shadow">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm">Demand: <span className="font-medium">{data.demandLabel}</span></p>
                            <p className="text-sm">Confidence: <span className="font-medium">{data.confidence.toFixed(1)}%</span></p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="demand" fill="var(--color-demand)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prophet Time Series Forecast</CardTitle>
            <CardDescription>Baseline trend prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                forecast: {
                  label: "Forecast Views",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="var(--color-forecast)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-forecast)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ChartContainer
      config={{
        demand: {
          label: "Demand Level",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} domain={[0, 4]} />
          <ChartTooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-white p-3 border rounded shadow">
                    <p className="font-medium">{label}</p>
                    <p className="text-sm">Demand: <span className="font-medium">{data.demandLabel}</span></p>
                    <p className="text-sm">Confidence: <span className="font-medium">{data.confidence.toFixed(1)}%</span></p>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="demand" fill="var(--color-demand)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
