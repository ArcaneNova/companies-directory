'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface CompanyMapProps {
  address: string
  companyName: string
}

interface GeocodingResult {
  lat: number
  lon: number
}

export function CompanyMap({ address, companyName }: CompanyMapProps) {
  const [coordinates, setCoordinates] = useState<GeocodingResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function geocodeAddress() {
      try {
        setLoading(true)
        // Using OpenStreetMap Nominatim for geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
        )
        const data = await response.json()

        if (data && data[0]) {
          setCoordinates({
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
          })
        } else {
          setError('Location not found')
        }
      } catch (err) {
        setError('Failed to load map')
      } finally {
        setLoading(false)
      }
    }

    if (address) {
      geocodeAddress()
    }
  }, [address])

  if (loading) {
    return (
      <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
    )
  }

  if (error || !coordinates) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
        {error || 'Map unavailable'}
      </div>
    )
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[coordinates.lat, coordinates.lon]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.lat, coordinates.lon]} icon={icon}>
          <Popup>{companyName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
} 