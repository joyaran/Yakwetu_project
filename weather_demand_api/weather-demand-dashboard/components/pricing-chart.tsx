"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PricingCalculator from "./pricing-calculator"

interface PredictionData {
  date: string
  predicted_demand: 'Low' | 'Medium' | 'High'
  prophet_forecast: number
  dynamic_price: number
  confidence: number
  weather_impact: number
}

interface PricingChartProps {
  data: PredictionData[]
}

export default function PricingChart({ data }: PricingChartProps) {
  const basePrice = 100
  
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    dynamicPrice: item.dynamic_price,
    basePrice: basePrice,
    priceChange: ((item.dynamic_price - basePrice) / basePrice) * 100,
    demand: item.predicted_demand
  }))

  const totalRevenue = data.reduce((sum, item) => sum + (item.dynamic_price * item.prophet_forecast * 0.01), 0)
  const baseRevenue = data.reduce((sum, item) => sum + (basePrice * item.prophet_forecast * 0.01), 0)
  const revenueIncrease = ((totalRevenue - baseRevenue) / baseRevenue) * 100

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Pricing Overview</TabsTrigger>
        <TabsTrigger value="calculator">Pricing Calculator</TabsTrigger>
        <TabsTrigger value="breakdown">Strategy Breakdown</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {/* Revenue Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Base Revenue (7 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSh {baseRevenue.toFixed(0)}</div>
              <div className="text-sm text-gray-500">Fixed pricing @ KSh 100</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Dynamic Revenue (7 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSh {totalRevenue.toFixed(0)}</div>
              <div className="text-sm text-gray-500">Weather-adjusted pricing</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Revenue Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${revenueIncrease >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {revenueIncrease >= 0 ? '+' : ''}{revenueIncrease.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">vs. fixed pricing</div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Dynamic Pricing Strategy</CardTitle>
            <CardDescription>Price adjustments based on weather-driven demand predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                dynamicPrice: {
                  label: "Dynamic Price (KSh)",
                  color: "hsl(var(--chart-1))",
                },
                basePrice: {
                  label: "Base Price (KSh)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} domain={[70, 130]} />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-3 border rounded shadow">
                            <p className="font-medium">{label}</p>
                            <p className="text-sm">Dynamic Price: <span className="font-medium">KSh {data.dynamicPrice.toFixed(0)}</span></p>
                            <p className="text-sm">Base Price: <span className="font-medium">KSh {data.basePrice}</span></p>
                            <p className="text-sm">Change: <span className={`font-medium ${data.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {data.priceChange >= 0 ? '+' : ''}{data.priceChange.toFixed(1)}%
                            </span></p>
                            <p className="text-sm">Demand: <span className="font-medium">{data.demand}</span></p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <ReferenceLine y={basePrice} stroke="#666" strokeDasharray="5 5" label="Base Price" />
                  <Line
                    type="monotone"
                    dataKey="dynamicPrice"
                    stroke="var(--color-dynamicPrice)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-dynamicPrice)", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="basePrice"
                    stroke="var(--color-basePrice)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="calculator">
        <PricingCalculator />
      </TabsContent>

      <TabsContent value="breakdown" className="space-y-6">
        {/* Pricing Strategy Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Strategy Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Demand Level</th>
                    <th className="text-left p-2">Base Price</th>
                    <th className="text-left p-2">Dynamic Price</th>
                    <th className="text-left p-2">Price Change</th>
                    <th className="text-left p-2">Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.demand === 'High' ? 'bg-red-100 text-red-800' :
                          item.demand === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.demand}
                        </span>
                      </td>
                      <td className="p-2">KSh {item.basePrice}</td>
                      <td className="p-2 font-medium">KSh {item.dynamicPrice.toFixed(0)}</td>
                      <td className={`p-2 font-medium ${item.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.priceChange >= 0 ? '+' : ''}{item.priceChange.toFixed(1)}%
                      </td>
                      <td className="p-2 text-xs">
                        {item.demand === 'High' ? 'Premium pricing (+20%)' :
                         item.demand === 'Medium' ? 'Standard pricing (+10%)' :
                         'Promotional pricing (-15%)'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
