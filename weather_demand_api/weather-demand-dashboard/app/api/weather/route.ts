import { NextRequest, NextResponse } from 'next/server'

interface WeatherRequest {
  latitude: number
  longitude: number
  days: number
}

export async function POST(request: NextRequest) {
  try {
    const { latitude, longitude, days }: WeatherRequest = await request.json()

    // Simulate weather data for the demo
    // In a real implementation, you would call a weather API like OpenWeatherMap
    const weatherData = []
    const today = new Date()
    
    for (let i = 0; i < days; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Generate realistic weather data based on location
      const baseTemp = latitude > 0 ? 15 : 25 // Northern vs Southern hemisphere
      const temp = baseTemp + Math.sin(i * 0.5) * 10 + (Math.random() - 0.5) * 8
      const precipitation = Math.random() * 15
      const isRainy = precipitation > 5 ? 1 : 0
      
      // Weather codes: 0-1 clear, 2-3 cloudy, 61-65 rain, 95+ storms
      let weathercode = 1
      let weather_desc = 'Clear sky'
      
      if (isRainy) {
        if (precipitation > 10) {
          weathercode = 63
          weather_desc = 'Moderate rain'
        } else {
          weathercode = 61
          weather_desc = 'Light rain'
        }
      } else if (temp < 10) {
        weathercode = 3
        weather_desc = 'Overcast'
      } else if (Math.random() > 0.7) {
        weathercode = 2
        weather_desc = 'Partly cloudy'
      }

      weatherData.push({
        event_date: date.toISOString().split('T')[0],
        temperature_2m_max: Math.round(temp * 10) / 10,
        temperature_2m_min: Math.round((temp - 5) * 10) / 10,
        precipitation_sum: Math.round(precipitation * 10) / 10,
        weathercode,
        weather_desc,
        is_rainy: isRainy,
        city: 'Demo City',
        country_code: 'XX'
      })
    }

    return NextResponse.json({ weather: weatherData })
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}
