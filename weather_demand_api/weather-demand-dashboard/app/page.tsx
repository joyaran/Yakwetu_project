"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, TrendingUp, TrendingDown, Cloud, Sun, CloudRain, Zap } from 'lucide-react'
import WeatherChart from "@/components/weather-chart"
import DemandChart from "@/components/demand-chart"
import PricingChart from "@/components/pricing-chart"
import MetricsGrid from "@/components/metrics-grid"
import LocationSelector from "@/components/location-selector"
import GenreRecommendations from "@/components/genre-recommendations"
import ContentStrategy from "@/components/content-strategy"

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

interface PredictionData {
  date: string
  predicted_demand: 'Low' | 'Medium' | 'High'
  prophet_forecast: number
  dynamic_price: number
  confidence: number
  weather_impact: number
  genre_boosts?: { [key: string]: number }
}

const locations = [
  { name: 'Nairobi', code: 'KE', lat: -1.2921, lon: 36.8219 },
  { name: 'Lagos', code: 'NG', lat: 6.5244, lon: 3.3792 },
  { name: 'Dubai', code: 'AE', lat: 25.2048, lon: 55.2708 },
  { name: 'New York', code: 'US', lat: 40.7128, lon: -74.0060 },
  { name: 'London', code: 'UK', lat: 51.5074, lon: -0.1278 },
  { name: 'Mumbai', code: 'IN', lat: 19.0760, lon: 72.8777 }
]

export default function WeatherDemandDashboard() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [predictions, setPredictions] = useState<PredictionData[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchWeatherData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lon,
          days: 7
        })
      })
      const data = await response.json()
      setWeatherData(data.weather)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching weather:', error)
    } finally {
      setLoading(false)
    }
  }

  const generatePredictions = async () => {
    if (weatherData.length === 0) return

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weatherData,
          location: selectedLocation
        })
      })
      const data = await response.json()
      setPredictions(data.predictions)
    } catch (error) {
      console.error('Error generating predictions:', error)
    }
  }

  useEffect(() => {
    fetchWeatherData()
  }, [selectedLocation])

  useEffect(() => {
    if (weatherData.length > 0) {
      generatePredictions()
    }
  }, [weatherData])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchWeatherData()
    }, 300000) // Refresh every 5 minutes

    return () => clearInterval(interval)
  }, [autoRefresh, selectedLocation])

  const getWeatherIcon = (weathercode: number) => {
    if (weathercode === 0 || weathercode === 1) return <Sun className="h-5 w-5 text-yellow-500" />
    if (weathercode >= 61 && weathercode <= 65) return <CloudRain className="h-5 w-5 text-blue-500" />
    if (weathercode >= 95) return <Zap className="h-5 w-5 text-purple-500" />
    return <Cloud className="h-5 w-5 text-gray-500" />
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'bg-red-500'
      case 'Medium': return 'bg-yellow-500'
      case 'Low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const currentWeather = weatherData[0]
  const todayPrediction = predictions[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">YAKWETU™ Climate-Based Variable Pricing Project</h1>
            <p className="text-gray-600 mt-1">Predicting Content Demand & Dynamic Pricing with Climate-Driven Analytics</p>
          </div>
          
          <div className="flex items-center gap-4">
            <LocationSelector
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
            />
            
            <Button
              onClick={fetchWeatherData}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button
              onClick={() => setAutoRefresh(!autoRefresh)}
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
            >
              Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
            </Button>
          </div>
        </div>

        {/* Current Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Current Weather</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{currentWeather?.temperature_2m_max.toFixed(1) || '--'}°C</div>
                  <div className="text-sm text-gray-500">{currentWeather?.weather_desc || 'Loading...'}</div>
                </div>
                {currentWeather && getWeatherIcon(currentWeather.weathercode)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Predicted Demand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Badge className={`${getDemandColor(todayPrediction?.predicted_demand || 'Medium')} text-white`}>
                    {todayPrediction?.predicted_demand || 'Loading...'}
                  </Badge>
                  <div className="text-sm text-gray-500 mt-1">
                    {todayPrediction?.confidence.toFixed(0) || '--'}% confidence
                  </div>
                </div>
                {todayPrediction?.predicted_demand === 'High' ? 
                  <TrendingUp className="h-5 w-5 text-red-500" /> : 
                  <TrendingUp className="h-5 w-5 text-green-500" />
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Dynamic Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                KSh {todayPrediction?.dynamic_price.toFixed(0) || '100'}
              </div>
              <div className="text-sm text-gray-500">
                Base: KSh 100
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Last Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">
                {lastUpdated?.toLocaleTimeString() || 'Never'}
              </div>
              <div className="text-sm text-gray-500">
                {selectedLocation.name}, {selectedLocation.code}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="forecast" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
            <TabsTrigger value="demand">Demand Analysis</TabsTrigger>
            <TabsTrigger value="pricing">Dynamic Pricing</TabsTrigger>
            <TabsTrigger value="content">Content Strategy</TabsTrigger>
            <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weather Forecast</CardTitle>
                  <CardDescription>7-day weather outlook for {selectedLocation.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <WeatherChart data={weatherData} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Demand Prediction</CardTitle>
                  <CardDescription>Prophet + XGBoost hybrid forecast</CardDescription>
                </CardHeader>
                <CardContent>
                  <DemandChart data={predictions} />
                </CardContent>
              </Card>
            </div>

            {/* Detailed Forecast Table */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed 7-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Weather</th>
                        <th className="text-left p-2">Temp (°C)</th>
                        <th className="text-left p-2">Rain (mm)</th>
                        <th className="text-left p-2">Demand</th>
                        <th className="text-left p-2">Price (KSh)</th>
                        <th className="text-left p-2">Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weatherData.map((weather, index) => {
                        const prediction = predictions[index]
                        return (
                          <tr key={weather.event_date} className="border-b hover:bg-gray-50">
                            <td className="p-2">{new Date(weather.event_date).toLocaleDateString()}</td>
                            <td className="p-2 flex items-center gap-2">
                              {getWeatherIcon(weather.weathercode)}
                              {weather.weather_desc}
                            </td>
                            <td className="p-2">{weather.temperature_2m_max.toFixed(1)}</td>
                            <td className="p-2">{weather.precipitation_sum.toFixed(1)}</td>
                            <td className="p-2">
                              <Badge className={`${getDemandColor(prediction?.predicted_demand || 'Medium')} text-white text-xs`}>
                                {prediction?.predicted_demand || 'Medium'}
                              </Badge>
                            </td>
                            <td className="p-2 font-medium">{prediction?.dynamic_price.toFixed(0) || '100'}</td>
                            <td className="p-2">{prediction?.confidence.toFixed(0) || '75'}%</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demand">
            <DemandChart data={predictions} detailed={true} />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingChart data={predictions} />
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GenreRecommendations weatherData={weatherData} predictions={predictions} />
              <ContentStrategy weatherData={weatherData} predictions={predictions} />
            </div>
          </TabsContent>

          <TabsContent value="metrics">
            <MetricsGrid predictions={predictions} weatherData={weatherData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
