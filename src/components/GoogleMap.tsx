
import { useEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';

interface GoogleMapProps {
  apiKey: string;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  markers?: Array<{
    position: google.maps.LatLngLiteral;
    title: string;
    color?: string;
  }>;
  onLocationFound?: (location: google.maps.LatLngLiteral) => void;
}

export default function GoogleMap({ 
  apiKey, 
  center = { lat: 0, lng: 0 }, 
  zoom = 13,
  markers = [],
  onLocationFound 
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Load Google Maps script
  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key is required');
      setLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setLoading(false);
    };
    
    script.onerror = () => {
      setError('Failed to load Google Maps');
      setLoading(false);
    };

    if (!document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      document.head.appendChild(script);
    } else {
      setLoading(false);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [apiKey]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || loading || !window.google) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
    });

    setMap(mapInstance);

    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          mapInstance.setCenter(userLocation);
          
          // Add user location marker
          new google.maps.Marker({
            position: userLocation,
            map: mapInstance,
            title: 'Your Location',
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          });

          if (onLocationFound) {
            onLocationFound(userLocation);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, [loading, center, zoom, onLocationFound]);

  // Update markers
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach(({ position, title, color }) => {
      const marker = new google.maps.Marker({
        position,
        map,
        title,
        icon: color ? {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: color,
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        } : undefined,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 8px;"><strong>${title}</strong></div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      markersRef.current.push(marker);
    });
  }, [map, markers]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-md">
        <div className="flex flex-col items-center gap-2">
          <Loader className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-md">
        <div className="text-center">
          <p className="text-destructive font-medium">{error}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please check your API key configuration
          </p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-md" />;
}