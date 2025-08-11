"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, Zap, Cloud, Sun, CloudRain } from 'lucide-react'

interface CalculatorInputs {
  basePrice: number
  temperature: number
  precipitation: number
  isRainy: boolean
  isWeekend: boolean
  weatherCode: number
}

interface CalculationStep {
  step: string
  description: string
  value: number
  formula: string
}

export default function PricingCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    basePrice: 100,
    temperature: 25,
    precipitation: 0,
    isRainy: false,
    isWeekend: false,
    weatherCode: 1
  })

  const [showCalculation, setShowCalculation] = useState(false)

  const calculateDynamicPricing = (): { steps: CalculationStep[], finalPrice: number, demandLevel: string, confidence: number } => {
    const steps: CalculationStep[] = []
    let demandScore = 0

    // Step 1: Base demand score
    steps.push({
      step: "1",
      description: "Initialize base demand score",
      value: 0,
      formula: "demandScore = 0"
    })

    // Step 2: Temperature impact
    let tempImpact = 0
    if (inputs.temperature > 30) {
      tempImpact = 0.3
      steps.push({
        step: "2",
        description: "Hot weather impact (>30°C increases indoor activity)",
        value: tempImpact,
        formula: `${inputs.temperature}°C > 30°C → +0.3`
      })
    } else if (inputs.temperature < 15) {
      tempImpact = 0.2
      steps.push({
        step: "2",
        description: "Cold weather impact (<15°C increases indoor activity)",
        value: tempImpact,
        formula: `${inputs.temperature}°C < 15°C → +0.2`
      })
    } else {
      tempImpact = 0.1
      steps.push({
        step: "2",
        description: "Mild weather impact (moderate effect)",
        value: tempImpact,
        formula: `15°C ≤ ${inputs.temperature}°C ≤ 30°C → +0.1`
      })
    }
    demandScore += tempImpact

    // Step 3: Rain impact
    let rainImpact = 0
    if (inputs.isRainy) {
      rainImpact = 0.4
      steps.push({
        step: "3",
        description: "Rainy weather impact (significantly increases indoor activity)",
        value: rainImpact,
        formula: `Rainy = true → +0.4`
      })
    } else {
      steps.push({
        step: "3",
        description: "No rain impact",
        value: 0,
        formula: `Rainy = false → +0.0`
      })
    }
    demandScore += rainImpact

    // Step 4: Weekend effect
    let weekendImpact = 0
    if (inputs.isWeekend) {
      weekendImpact = 0.2
      steps.push({
        step: "4",
        description: "Weekend effect (higher leisure consumption)",
        value: weekendImpact,
        formula: `Weekend = true → +0.2`
      })
    } else {
      steps.push({
        step: "4",
        description: "Weekday (no weekend bonus)",
        value: 0,
        formula: `Weekend = false → +0.0`
      })
    }
    demandScore += weekendImpact

    // Step 5: Total demand score
    steps.push({
      step: "5",
      description: "Calculate total demand score",
      value: demandScore,
      formula: `${tempImpact} + ${rainImpact} + ${weekendImpact} = ${demandScore.toFixed(2)}`
    })

    // Step 6: Classify demand level
    let demandLevel: string
    if (demandScore > 0.7) {
      demandLevel = 'High'
    } else if (demandScore > 0.4) {
      demandLevel = 'Medium'
    } else {
      demandLevel = 'Low'
    }

    steps.push({
      step: "6",
      description: "Classify demand level",
      value: 0,
      formula: `${demandScore.toFixed(2)} ${demandScore > 0.7 ? '> 0.7' : demandScore > 0.4 ? '> 0.4' : '≤ 0.4'} → ${demandLevel}`
    })

    // Step 7: Apply pricing multiplier
    let priceMultiplier = 1.0
    let finalPrice = inputs.basePrice

    if (demandLevel === 'High') {
      priceMultiplier = 1.2
      finalPrice = inputs.basePrice * 1.2
      steps.push({
        step: "7",
        description: "Apply High demand pricing (+20%)",
        value: priceMultiplier,
        formula: `KSh ${inputs.basePrice} × 1.2 = KSh ${finalPrice.toFixed(0)}`
      })
    } else if (demandLevel === 'Medium') {
      priceMultiplier = 1.1
      finalPrice = inputs.basePrice * 1.1
      steps.push({
        step: "7",
        description: "Apply Medium demand pricing (+10%)",
        value: priceMultiplier,
        formula: `KSh ${inputs.basePrice} × 1.1 = KSh ${finalPrice.toFixed(0)}`
      })
    } else {
      priceMultiplier = 0.85
      finalPrice = inputs.basePrice * 0.85
      steps.push({
        step: "7",
        description: "Apply Low demand pricing (-15%)",
        value: priceMultiplier,
        formula: `KSh ${inputs.basePrice} × 0.85 = KSh ${finalPrice.toFixed(0)}`
      })
    }

    // Calculate confidence
    const confidence = Math.min(95, 70 + Math.abs(inputs.temperature - 25) * 2 + inputs.precipitation * 5)

    return { steps, finalPrice, demandLevel, confidence }
  }

  const result = calculateDynamicPricing()

  const getWeatherIcon = (weatherCode: number) => {
    if (weatherCode === 0 || weatherCode === 1) return <Sun className="h-4 w-4 text-yellow-500" />
    if (weatherCode >= 61 && weatherCode <= 65) return <CloudRain className="h-4 w-4 text-blue-500" />
    if (weatherCode >= 95) return <Zap className="h-4 w-4 text-purple-500" />
    return <Cloud className="h-4 w-4 text-gray-500" />
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'bg-red-500'
      case 'Medium': return 'bg-yellow-500'
      case 'Low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Dynamic Pricing Calculator
          </CardTitle>
          <CardDescription>
            Adjust parameters to see how dynamic pricing is calculated step by step
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price (KSh)</Label>
              <Input
                id="basePrice"
                type="number"
                value={inputs.basePrice}
                onChange={(e) => setInputs({...inputs, basePrice: Number(e.target.value)})}
                min="1"
                max="1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                value={inputs.temperature}
                onChange={(e) => setInputs({...inputs, temperature: Number(e.target.value)})}
                min="-10"
                max="50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="precipitation">Precipitation (mm)</Label>
              <Input
                id="precipitation"
                type="number"
                value={inputs.precipitation}
                onChange={(e) => setInputs({...inputs, precipitation: Number(e.target.value)})}
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isRainy">Weather Condition</Label>
              <Select 
                value={inputs.isRainy ? "rainy" : "clear"} 
                onValueChange={(value) => setInputs({...inputs, isRainy: value === "rainy"})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clear">Clear/Cloudy</SelectItem>
                  <SelectItem value="rainy">Rainy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="isWeekend">Day Type</Label>
              <Select 
                value={inputs.isWeekend ? "weekend" : "weekday"} 
                onValueChange={(value) => setInputs({...inputs, isWeekend: value === "weekend"})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekday">Weekday</SelectItem>
                  <SelectItem value="weekend">Weekend</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Weather Code</Label>
              <Select 
                value={inputs.weatherCode.toString()} 
                onValueChange={(value) => setInputs({...inputs, weatherCode: Number(value)})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Clear Sky</SelectItem>
                  <SelectItem value="3">Partly Cloudy</SelectItem>
                  <SelectItem value="61">Light Rain</SelectItem>
                  <SelectItem value="63">Moderate Rain</SelectItem>
                  <SelectItem value="95">Thunderstorm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={() => setShowCalculation(!showCalculation)}
            className="w-full"
          >
            {showCalculation ? 'Hide' : 'Show'} Calculation Steps
          </Button>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Weather Input</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">{inputs.temperature}°C</div>
                <div className="text-sm text-gray-500">
                  {inputs.isRainy ? 'Rainy' : 'Clear'} • {inputs.isWeekend ? 'Weekend' : 'Weekday'}
                </div>
              </div>
              {getWeatherIcon(inputs.weatherCode)}
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
                <Badge className={`${getDemandColor(result.demandLevel)} text-white`}>
                  {result.demandLevel}
                </Badge>
                <div className="text-sm text-gray-500 mt-1">
                  {result.confidence.toFixed(0)}% confidence
                </div>
              </div>
              {result.demandLevel === 'High' ? 
                <TrendingUp className="h-5 w-5 text-red-500" /> : 
                <TrendingUp className="h-5 w-5 text-green-500" />
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Base Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {inputs.basePrice}</div>
            <div className="text-sm text-gray-500">Starting price</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Dynamic Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              KSh {result.finalPrice.toFixed(0)}
            </div>
            <div className="text-sm text-gray-500">
              {result.finalPrice > inputs.basePrice ? '+' : ''}{((result.finalPrice - inputs.basePrice) / inputs.basePrice * 100).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calculation Steps */}
      {showCalculation && (
        <Card>
          <CardHeader>
            <CardTitle>Step-by-Step Calculation</CardTitle>
            <CardDescription>How the dynamic price is calculated using the XGBoost model logic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{step.description}</div>
                    <div className="text-sm text-gray-600 mt-1 font-mono bg-gray-50 p-2 rounded">
                      {step.formula}
                    </div>
                    {step.value !== 0 && (
                      <div className="text-sm text-blue-600 mt-1">
                        Impact: {step.value > 0 ? '+' : ''}{step.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Rules Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Rules Reference</CardTitle>
          <CardDescription>YAKWETU™ dynamic pricing strategy based on weather-driven demand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-red-500 text-white">High Demand</Badge>
              </div>
              <div className="text-sm space-y-1">
                <div>• Demand Score {'>'} 0.7</div>
                <div>• Price: Base × 1.2 (+20%)</div>
                <div>• Conditions: Very hot/cold + rain + weekend</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-yellow-500 text-white">Medium Demand</Badge>
              </div>
              <div className="text-sm space-y-1">
                <div>• Demand Score 0.4 - 0.7</div>
                <div>• Price: Base × 1.1 (+10%)</div>
                <div>• Conditions: Moderate weather factors</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-500 text-white">Low Demand</Badge>
              </div>
              <div className="text-sm space-y-1">
                <div>• Demand Score ≤ 0.4</div>
                <div>• Price: Base × 0.85 (-15%)</div>
                <div>• Conditions: Mild weather, weekday</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
