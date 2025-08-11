"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Film, Tv, HeadsetIcon as VrHeadset, Thermometer, CloudRain, Sun } from 'lucide-react'

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
}

interface GenreRecommendationsProps {
  weatherData: WeatherData[]
  predictions: PredictionData[]
}

// YAKWETU content categories and weather-based recommendations
const contentCategories = {
  Movies: {
    icon: Film,
    hot: {
      genres: ['Action', 'Adventure', 'Thriller', 'Sci-Fi'],
      reasoning: 'High-energy content for active indoor time during hot weather',
      boost: 1.3
    },
    mild: {
      genres: ['Drama', 'Romance', 'Comedy', 'Documentary'],
      reasoning: 'Comfortable viewing conditions favor diverse content',
      boost: 1.1
    },
    cold: {
      genres: ['Horror', 'Mystery', 'Fantasy', 'Animation'],
      reasoning: 'Cozy indoor atmosphere perfect for immersive storytelling',
      boost: 1.4
    },
    rainy: {
      genres: ['Drama', 'Romance', 'Mystery', 'Documentary'],
      reasoning: 'Rainy days encourage longer, contemplative viewing sessions',
      boost: 1.5
    }
  },
  Series: {
    icon: Tv,
    hot: {
      genres: ['Crime', 'Action', 'Thriller', 'Reality TV'],
      reasoning: 'Binge-worthy series for extended indoor cooling time',
      boost: 1.4
    },
    mild: {
      genres: ['Comedy', 'Drama', 'Lifestyle', 'Talk Shows'],
      reasoning: 'Pleasant weather allows for casual, episodic viewing',
      boost: 1.0
    },
    cold: {
      genres: ['Fantasy', 'Sci-Fi', 'Historical', 'Mystery'],
      reasoning: 'Cold weather perfect for immersive, long-form storytelling',
      boost: 1.6
    },
    rainy: {
      genres: ['Drama', 'Mystery', 'Documentary', 'Historical'],
      reasoning: 'Rainy atmosphere enhances mood for deep, engaging series',
      boost: 1.7
    }
  },
  Music: {
    icon: VrHeadset,
    hot: {
      genres: ['Afrobeats', 'Pop', 'Dance', 'Electronic'],
      reasoning: 'Upbeat music for hot weather energy',
      boost: 1.2
    },
    mild: {
      genres: ['Jazz', 'Folk', 'Indie', 'Classical'],
      reasoning: 'Relaxed listening for comfortable weather',
      boost: 1.0
    },
    cold: {
      genres: ['Soul', 'Blues', 'Acoustic', 'World Music'],
      reasoning: 'Warm, soulful music for cold days',
      boost: 1.3
    },
    rainy: {
      genres: ['Jazz', 'Classical', 'Ambient', 'Folk'],
      reasoning: 'Contemplative music for rainy moods',
      boost: 1.4
    }
  }
}

export default function GenreRecommendations({ weatherData, predictions }: GenreRecommendationsProps) {
  const getWeatherCondition = (temp: number, isRainy: boolean) => {
    if (isRainy) return 'rainy'
    if (temp > 25) return 'hot'
    if (temp < 15) return 'cold'
    return 'mild'
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'hot': return <Sun className="h-4 w-4 text-yellow-500" />
      case 'cold': return <Thermometer className="h-4 w-4 text-blue-500" />
      case 'rainy': return <CloudRain className="h-4 w-4 text-blue-600" />
      default: return <Sun className="h-4 w-4 text-green-500" />
    }
  }

  const todayWeather = weatherData[0]
  const todayCondition = todayWeather ? getWeatherCondition(todayWeather.temperature_2m_max, todayWeather.is_rainy === 1) : 'mild'

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Film className="h-5 w-5" />
          Weather-Based Content Recommendations
        </CardTitle>
        <CardDescription>
          Genre recommendations based on current weather conditions - {todayWeather?.city}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="today">Today's Recommendations</TabsTrigger>
            <TabsTrigger value="weekly">7-Day Strategy</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              {getWeatherIcon(todayCondition)}
              <span className="font-medium capitalize">{todayCondition} Weather</span>
              <Badge variant="outline">
                {todayWeather?.temperature_2m_max.toFixed(1)}°C
              </Badge>
              {todayWeather?.is_rainy === 1 && (
                <Badge variant="outline">
                  {todayWeather.precipitation_sum.toFixed(1)}mm rain
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(contentCategories).map(([category, config]) => {
                const IconComponent = config.icon
                const recommendation = config[todayCondition as keyof typeof config] as any
                
                return (
                  <Card key={category} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">{category}</h4>
                      <Badge variant="secondary" className="ml-auto">
                        +{((recommendation.boost - 1) * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {recommendation.genres.map((genre: string) => (
                          <Badge key={genre} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        {recommendation.reasoning}
                      </p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Weather</th>
                    <th className="text-left p-2">Top Category</th>
                    <th className="text-left p-2">Recommended Genres</th>
                    <th className="text-left p-2">Boost</th>
                  </tr>
                </thead>
                <tbody>
                  {weatherData.map((weather, index) => {
                    const condition = getWeatherCondition(weather.temperature_2m_max, weather.is_rainy === 1)
                    
                    // Find the category with highest boost for this condition
                    const topCategory = Object.entries(contentCategories).reduce((best, [category, config]) => {
                      const rec = config[condition as keyof typeof config] as any
                      const bestRec = contentCategories[best.category as keyof typeof contentCategories][condition as keyof typeof contentCategories] as any
                      return rec.boost > bestRec.boost ? { category, boost: rec.boost } : best
                    }, { category: 'Movies', boost: 1.0 })

                    const topRec = contentCategories[topCategory.category as keyof typeof contentCategories][condition as keyof typeof contentCategories] as any

                    return (
                      <tr key={weather.event_date} className="border-b hover:bg-gray-50">
                        <td className="p-2">{new Date(weather.event_date).toLocaleDateString()}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            {getWeatherIcon(condition)}
                            <span className="capitalize">{condition}</span>
                            <span className="text-xs text-muted-foreground">
                              {weather.temperature_2m_max.toFixed(1)}°C
                            </span>
                          </div>
                        </td>
                        <td className="p-2">
                          <Badge variant="default">{topCategory.category}</Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex flex-wrap gap-1">
                            {topRec.genres.slice(0, 2).map((genre: string) => (
                              <Badge key={genre} variant="outline" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-2 font-medium text-green-600">
                          +{((topCategory.boost - 1) * 100).toFixed(0)}%
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
