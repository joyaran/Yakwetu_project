"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Location {
  name: string
  code: string
  lat: number
  lon: number
}

interface LocationSelectorProps {
  locations: Location[]
  selectedLocation: Location
  onLocationChange: (location: Location) => void
}

export default function LocationSelector({ locations, selectedLocation, onLocationChange }: LocationSelectorProps) {
  return (
    <Select
      value={selectedLocation.code}
      onValueChange={(code) => {
        const location = locations.find(l => l.code === code)
        if (location) onLocationChange(location)
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select location" />
      </SelectTrigger>
      <SelectContent>
        {locations.map((location) => (
          <SelectItem key={location.code} value={location.code}>
            {location.name}, {location.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
