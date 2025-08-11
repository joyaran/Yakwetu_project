"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface WeatherData {
  event_date: string
  temperature_2m_max: number
  precipitation_sum: number
  weathercode: number
  weather_desc: string
  is_rainy: number
  city: string
  country_code: string
}

interface WeatherChartProps {
  data: WeatherData[]
}

export default function WeatherChart({ data }: WeatherChartProps) {
  const chartData = data.map(item => ({
    date: new Date(item.event_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    temperature: item.temperature_2m_max,
    precipitation: item.precipitation_sum,
    isRainy: item.is_rainy
  }))

  return (
    <ChartContainer
      config={{
        temperature: {
          label: "Temperature (°C)",
          color: "hsl(var(--chart-1))",
        },
        precipitation: {
          label: "Precipitation (mm)",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            yAxisId="temp"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            yAxisId="precip"
            orientation="right"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="temperature"
            stroke="var(--color-temperature)"
            strokeWidth={2}
            dot={{ fill: "var(--color-temperature)" }}
          />
          <Line
            yAxisId="precip"
            type="monotone"
            dataKey="precipitation"
            stroke="var(--color-precipitation)"
            strokeWidth={2}
            dot={{ fill: "var(--color-precipitation)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
