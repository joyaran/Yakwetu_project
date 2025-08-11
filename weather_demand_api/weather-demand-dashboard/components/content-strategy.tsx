"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, Calendar, Zap, Star } from 'lucide-react'

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

interface ContentStrategyProps {
  weatherData: WeatherData[]
  predictions: PredictionData[]
}

export default function ContentStrategy({ weatherData, predictions }: ContentStrategyProps) {
  // Calculate content strategy metrics based on YAKWETU model research
  const hotDays = weatherData.filter(w => w.temperature_2m_max > 25).length
  const coldDays = weatherData.filter(w => w.temperature_2m_max < 15).length
  const rainyDays = weatherData.filter(w => w.is_rainy === 1).length
  const mildDays = 7 - hotDays - coldDays - rainyDays

  // Extract genre recommendations from predictions based on YAKWETU research
  const getTopGenreRecommendations = () => {
    const genreScores: { [key: string]: number } = {}
    
    predictions.forEach((prediction, index) => {
      if (prediction.genre_boosts) {
        Object.entries(prediction.genre_boosts).forEach(([genre, boost]) => {
          genreScores[genre] = (genreScores[genre] || 0) + boost
        })
      }
    })

    return Object.entries(genreScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([genre, score]) => ({
        genre,
        averageBoost: score / predictions.length,
        totalScore: score
      }))
  }

  const topGenres = getTopGenreRecommendations()

  // Content category priorities based on weather patterns and YAKWETU findings
  const getContentPriorities = () => {
    const priorities = []
    
    if (rainyDays >= 2) {
      priorities.push({
        category: 'Drama & Romance',
        priority: 'High',
        reason: `${rainyDays} rainy days favor emotional content`,
        boost: 1.8,
        genres: ['Drama', 'Romance', 'Comedy', 'Series']
      })
    }
    
    if (coldDays >= 2) {
      priorities.push({
        category: 'Binge-Worthy Content',
        priority: 'High',
        reason: `${coldDays} cold days increase series consumption`,
        boost: 1.6,
        genres: ['Series', 'Audiobooks', 'Fantasy', 'Mystery']
      })
    }
    
    if (hotDays >= 2) {
      priorities.push({
        category: 'Interactive & Action',
        priority: 'Medium',
        reason: `${hotDays} hot days drive indoor entertainment`,
        boost: 1.4,
        genres: ['Games', 'Action', 'Adventure', 'VR']
      })
    }
    
    if (mildDays >= 2) {
      priorities.push({
        category: 'Diverse Content Mix',
        priority: 'Medium',
        reason: `${mildDays} mild days favor varied content`,
        boost: 1.2,
        genres: ['Documentary', 'Kenyan Favourites', 'Mystery', 'Movies']
      })
    }
    
    return priorities.sort((a, b) => b.boost - a.boost)
  }

  const contentPriorities = getContentPriorities()

  // Calculate optimal content scheduling with genre-specific recommendations
  const getOptimalScheduling = () => {
    return weatherData.map((weather, index) => {
      const prediction = predictions[index]
      const temp = weather.temperature_2m_max
      const isRainy = weather.is_rainy === 1
      
      let primaryContent = 'Movies'
      let secondaryContent = 'Series'
      let strategy = 'Standard'
      let topGenresForDay: string[] = []
      
      if (prediction?.genre_boosts) {
        topGenresForDay = Object.entries(prediction.genre_boosts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([genre]) => genre)
      }
      
      if (isRainy) {
        primaryContent = 'Drama & Romance'
        secondaryContent = 'Comedy & Series'
        strategy = 'Cozy Indoor'
      } else if (temp > 25) {
        primaryContent = 'Action & Games'
        secondaryContent = 'Adventure & Sci-Fi'
        strategy = 'Interactive Entertainment'
      } else if (temp < 15) {
        primaryContent = 'Series & Fantasy'
        secondaryContent = 'Mystery & Audiobooks'
        strategy = 'Binge-Watch'
      } else {
        primaryContent = 'Mixed Content'
        secondaryContent = 'Kenyan Favourites'
        strategy = 'Balanced Discovery'
      }
      
      return {
        date: weather.event_date,
        primaryContent,
        secondaryContent,
        strategy,
        demand: prediction?.predicted_demand || 'Medium',
        weatherDesc: weather.weather_desc,
        topGenres: topGenresForDay,
        confidence: prediction?.confidence || 75
      }
    })
  }

  const scheduling = getOptimalScheduling()

  // Revenue impact calculation with genre-specific boosts
  const baseRevenue = predictions.reduce((sum, p) => sum + (499 * p.prophet_forecast * 0.01), 0)
  const optimizedRevenue = predictions.reduce((sum, p, index) => {
    const weather = weatherData[index]
    const temp = weather?.temperature_2m_max || 20
    const isRainy = weather?.is_rainy === 1
    
    let boost = 1.0
    if (p.genre_boosts) {
      const avgBoost = Object.values(p.genre_boosts).reduce((a, b) => a + b, 0) / Object.values(p.genre_boosts).length
      boost = avgBoost
    } else {
      if (isRainy) boost = 1.8
      else if (temp < 15) boost = 1.6
      else if (temp > 25) boost = 1.4
      else boost = 1.1
    }
    
    return sum + (p.dynamic_price * p.prophet_forecast * 0.01 * boost)
  }, 0)

  const revenueIncrease = ((optimizedRevenue - baseRevenue) / baseRevenue) * 100

  return (
    <div className="space-y-6">
      {/* Strategy Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            YAKWETU™ Content Strategy Overview
          </CardTitle>
          <CardDescription>
            7-day weather-driven content optimization based on ML predictions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{rainyDays}</div>
              <div className="text-sm text-muted-foreground">Rainy Days</div>
              <div className="text-xs">Drama, Romance, Comedy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{coldDays}</div>
              <div className="text-sm text-muted-foreground">Cold Days</div>
              <div className="text-xs">Series, Fantasy, Mystery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{hotDays}</div>
              <div className="text-sm text-muted-foreground">Hot Days</div>
              <div className="text-xs">Games, Action, Adventure</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{mildDays}</div>
              <div className="text-sm text-muted-foreground">Mild Days</div>
              <div className="text-xs">Documentary, Kenyan Favourites</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Genre Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Top Genre Recommendations
          </CardTitle>
          <CardDescription>Based on weather-driven ML predictions for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {topGenres.map((item, index) => (
              <div key={item.genre} className="text-center p-3 border rounded-lg">
                <div className="text-lg font-bold">#{index + 1}</div>
                <div className="font-medium text-sm">{item.genre}</div>
                <div className="text-xs text-green-600">
                  +{((item.averageBoost - 1) * 100).toFixed(0)}% boost
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Priorities */}
      <Card>
        <CardHeader>
          <CardTitle>Content Category Priorities</CardTitle>
          <CardDescription>Recommended focus areas based on YAKWETU weather analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {contentPriorities.map((priority, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-lg font-bold text-muted-foreground">#{index + 1}</div>
                <div>
                  <div className="font-medium">{priority.category}</div>
                  <div className="text-sm text-muted-foreground">{priority.reason}</div>
                  <div className="text-xs text-blue-600 mt-1">
                    Focus: {priority.genres.join(', ')}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={priority.priority === 'High' ? 'default' : 'secondary'}>
                  {priority.priority}
                </Badge>
                <div className="text-sm font-medium text-green-600 mt-1">
                  +{((priority.boost - 1) * 100).toFixed(0)}% boost
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Revenue Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Revenue Impact Projection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-lg font-bold">KSh {baseRevenue.toFixed(0)}</div>
              <div className="text-sm text-muted-foreground">Base Revenue</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-lg font-bold">KSh {optimizedRevenue.toFixed(0)}</div>
              <div className="text-sm text-muted-foreground">Optimized Revenue</div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-green-50">
              <div className="text-lg font-bold text-green-600">
                +{revenueIncrease.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Revenue Increase</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Content Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Optimal Content Scheduling
          </CardTitle>
          <CardDescription>Day-by-day strategy with genre-specific recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Weather</th>
                  <th className="text-left p-2">Strategy</th>
                  <th className="text-left p-2">Primary Content</th>
                  <th className="text-left p-2">Top Genres</th>
                  <th className="text-left p-2">Demand</th>
                  <th className="text-left p-2">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {scheduling.map((schedule, index) => (
                  <tr key={schedule.date} className="border-b hover:bg-gray-50">
                    <td className="p-2">{new Date(schedule.date).toLocaleDateString()}</td>
                    <td className="p-2 text-xs">{schedule.weatherDesc}</td>
                    <td className="p-2">
                      <Badge variant="outline" className="text-xs">
                        {schedule.strategy}
                      </Badge>
                    </td>
                    <td className="p-2 font-medium">{schedule.primaryContent}</td>
                    <td className="p-2 text-xs text-blue-600">
                      {schedule.topGenres.slice(0, 2).join(', ') || 'Mixed'}
                    </td>
                    <td className="p-2">
                      <Badge 
                        variant={schedule.demand === 'High' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {schedule.demand}
                      </Badge>
                    </td>
                    <td className="p-2 text-xs">{schedule.confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rainyDays >= 2 && (
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Boost Drama & Romance Content</div>
                  <div className="text-sm text-muted-foreground">
                    {rainyDays} rainy days detected. Increase Drama, Romance & Comedy visibility by 80% based on YAKWETU research.
                  </div>
                </div>
              </div>
            )}
            
            {coldDays >= 2 && (
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Promote Series & Fantasy Content</div>
                  <div className="text-sm text-muted-foreground">
                    {coldDays} cold days ahead. Feature complete series, fantasy, and audiobook collections.
                  </div>
                </div>
              </div>
            )}
            
            {hotDays >= 2 && (
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Highlight Interactive & Action Content</div>
                  <div className="text-sm text-muted-foreground">
                    {hotDays} hot days expected. Push games, VR, action, and adventure content for indoor entertainment.
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div className="font-medium">Implement Dynamic Pricing Strategy</div>
                <div className="text-sm text-muted-foreground">
                  Weather-based pricing with genre optimization could increase revenue by {revenueIncrease.toFixed(1)}% this week.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
