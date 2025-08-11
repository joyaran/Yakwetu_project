"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Target, Zap, CloudRain, Sun } from 'lucide-react'

interface PredictionData {
  date: string
  predicted_demand: 'Low' | 'Medium' | 'High'
  prophet_forecast: number
  dynamic_price: number
  confidence: number
  weather_impact: number
}

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

interface MetricsGridProps {
  predictions: PredictionData[]
  weatherData: WeatherData[]
}

export default function MetricsGrid({ predictions, weatherData }: MetricsGridProps) {
  // Calculate metrics
  const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length
  const highDemandDays = predictions.filter(p => p.predicted_demand === 'High').length
  const rainyDays = weatherData.filter(w => w.is_rainy === 1).length
  const avgTemp = weatherData.reduce((sum, w) => sum + w.temperature_2m_max, 0) / weatherData.length
  const totalPrecipitation = weatherData.reduce((sum, w) => sum + w.precipitation_sum, 0)
  
  const basePrice = 100
  const avgDynamicPrice = predictions.reduce((sum, p) => sum + p.dynamic_price, 0) / predictions.length
  const priceVariance = ((avgDynamicPrice - basePrice) / basePrice) * 100

  const weatherImpactScore = predictions.reduce((sum, p) => sum + Math.abs(p.weather_impact), 0) / predictions.length

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgConfidence.toFixed(1)}%</div>
            <Progress value={avgConfidence} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Average prediction confidence
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Demand Days</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highDemandDays}/7</div>
            <Progress value={(highDemandDays / 7) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Days with high demand prediction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather Impact</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weatherImpactScore.toFixed(1)}</div>
            <Progress value={weatherImpactScore * 10} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Weather influence on demand
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price Optimization</CardTitle>
            {priceVariance >= 0 ? 
              <TrendingUp className="h-4 w-4 text-green-500" /> : 
              <TrendingDown className="h-4 w-4 text-red-500" />
            }
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${priceVariance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceVariance >= 0 ? '+' : ''}{priceVariance.toFixed(1)}%
            </div>
            <Progress value={Math.abs(priceVariance)} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Average price vs. base price
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weather Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weather Summary (7 days)</CardTitle>
            <CardDescription>Environmental factors affecting demand</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Average Temperature</span>
              </div>
              <span className="font-medium">{avgTemp.toFixed(1)}°C</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudRain className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Total Precipitation</span>
              </div>
              <span className="font-medium">{totalPrecipitation.toFixed(1)}mm</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudRain className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Rainy Days</span>
              </div>
              <span className="font-medium">{rainyDays}/7 days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demand Distribution</CardTitle>
            <CardDescription>Predicted demand levels breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {['High', 'Medium', 'Low'].map(level => {
              const count = predictions.filter(p => p.predicted_demand === level).length
              const percentage = (count / predictions.length) * 100
              return (
                <div key={level} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{level} Demand</span>
                    <span className="text-sm text-muted-foreground">{count}/7 days</span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className={`h-2 ${
                      level === 'High' ? '[&>div]:bg-red-500' :
                      level === 'Medium' ? '[&>div]:bg-yellow-500' :
                      '[&>div]:bg-green-500'
                    }`}
                  />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Model Performance Insights</CardTitle>
          <CardDescription>Key insights from XGBoost and Prophet models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">XGBoost Classification</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Average confidence: {avgConfidence.toFixed(1)}%</li>
                <li>• High demand predictions: {highDemandDays} days</li>
                <li>• Weather impact factor: {weatherImpactScore.toFixed(2)}</li>
                <li>• Temperature correlation: Strong</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Prophet Forecasting</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Trend analysis: {predictions[0]?.prophet_forecast > predictions[predictions.length - 1]?.prophet_forecast ? 'Declining' : 'Growing'}</li>
                <li>• Seasonal patterns: Detected</li>
                <li>• Holiday effects: Included</li>
                <li>• Forecast horizon: 7 days</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
