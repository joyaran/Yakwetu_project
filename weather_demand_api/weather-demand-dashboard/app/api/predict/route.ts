import { NextRequest, NextResponse } from 'next/server'

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

interface Location {
  name: string
  code: string
  lat: number
  lon: number
}

interface PredictRequest {
  weatherData: WeatherData[]
  location: Location
}

export async function POST(request: NextRequest) {
  try {
    const { weatherData, location }: PredictRequest = await request.json()

    // Use a seed based on the first date to ensure consistent predictions
    const seed = new Date(weatherData[0]?.event_date || Date.now()).getTime()
    const seededRandom = (index: number) => {
      const x = Math.sin(seed + index) * 10000
      return x - Math.floor(x)
    }

    // Simulate XGBoost and Prophet predictions with consistent results
    const predictions = weatherData.map((weather, index) => {
      // Simulate XGBoost demand prediction based on weather features
      let demandScore = 0
      
      // Temperature impact - based on YAKWETU model findings
      if (weather.temperature_2m_max > 30) demandScore += 0.3 // Hot weather increases indoor activity
      else if (weather.temperature_2m_max < 15) demandScore += 0.2 // Cold weather increases indoor activity
      else demandScore += 0.1 // Mild weather has less impact
      
      // Rain impact - significant factor from YAKWETU research
      if (weather.is_rainy === 1) demandScore += 0.4 // Rainy weather increases indoor activity
      
      // Weekend effect (simplified)
      const date = new Date(weather.event_date)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      if (isWeekend) demandScore += 0.2
      
      // Consistent random variation using seeded random
      demandScore += (seededRandom(index) - 0.5) * 0.2
      
      // Classify demand
      let predicted_demand: 'Low' | 'Medium' | 'High'
      if (demandScore > 0.7) predicted_demand = 'High'
      else if (demandScore > 0.4) predicted_demand = 'Medium'
      else predicted_demand = 'Low'
      
      // Simulate Prophet forecast (baseline trend) with consistent results
      const baseViews = 50 + Math.sin(index * 0.5) * 10 + seededRandom(index + 100) * 20
      
      // Calculate dynamic price
      const basePrice = 100
      let dynamic_price = basePrice
      if (predicted_demand === 'High') dynamic_price = basePrice * 1.2
      else if (predicted_demand === 'Medium') dynamic_price = basePrice * 1.1
      else dynamic_price = basePrice * 0.85
      
      // Calculate confidence (higher for extreme weather conditions)
      const confidence = Math.min(95, 70 + Math.abs(weather.temperature_2m_max - 25) * 2 + weather.precipitation_sum * 5)
      
      // Weather impact score
      const weather_impact = Math.abs(weather.temperature_2m_max - 25) / 25 + weather.precipitation_sum / 10
      
      // Genre-specific boost calculations based on YAKWETU model research
      const getGenreBoosts = (temp: number, isRainy: boolean) => {
        const boosts: { [key: string]: number } = {}
        
        if (isRainy) {
          // Rainy weather preferences from YAKWETU research
          boosts['Drama'] = 1.8
          boosts['Romance'] = 1.7
          boosts['Comedy'] = 1.6
          boosts['Series'] = 1.7
          boosts['Audiobooks'] = 1.8
          boosts['Podcasts'] = 1.6
          boosts['Music'] = 1.4
        } else if (temp > 25) { // Hot weather
          // Hot weather preferences
          boosts['Games'] = 1.4
          boosts['VR'] = 1.3
          boosts['Movies'] = 1.3
          boosts['Music'] = 1.2
          boosts['Action'] = 1.4
          boosts['Adventure'] = 1.3
          boosts['Sci-Fi'] = 1.2
        } else if (temp < 15) { // Cold weather
          // Cold weather preferences
          boosts['Series'] = 1.6
          boosts['Audiobooks'] = 1.7
          boosts['Movies'] = 1.4
          boosts['Games'] = 1.6
          boosts['Fantasy'] = 1.5
          boosts['Mystery'] = 1.4
          boosts['Thriller'] = 1.5
        } else { // Mild weather
          // Mild weather preferences
          boosts['Movies'] = 1.1
          boosts['Music'] = 1.0
          boosts['Podcasts'] = 1.0
          boosts['Series'] = 1.0
          boosts['Mystery'] = 1.1
          boosts['Documentary'] = 1.2
          boosts['Kenyan Favourites'] = 1.3
        }
        
        return boosts
      }

      const genre_boosts = getGenreBoosts(weather.temperature_2m_max, weather.is_rainy === 1)

      return {
        date: weather.event_date,
        predicted_demand,
        prophet_forecast: Math.round(baseViews),
        dynamic_price: Math.round(dynamic_price),
        confidence: Math.round(confidence),
        weather_impact: Math.round(weather_impact * 100) / 100,
        genre_boosts
      }
    })

    return NextResponse.json({ predictions })
  } catch (error) {
    console.error('Prediction error:', error)
    return NextResponse.json(
      { error: 'Failed to generate predictions' },
      { status: 500 }
    )
  }
}
