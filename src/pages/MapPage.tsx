
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Navigation } from 'lucide-react';
import GoogleMap from '@/components/GoogleMap';
import { useToast } from '@/hooks/use-toast';

// Sample subscriber data with locations
const sampleSubscribers = [
  { id: 1, name: 'Jean Dupont', position: { lat: 48.8566, lng: 2.3522 }, status: 'active' },
  { id: 2, name: 'Marie Martin', position: { lat: 48.8606, lng: 2.3376 }, status: 'expired' },
  { id: 3, name: 'Pierre Bernard', position: { lat: 48.8529, lng: 2.3499 }, status: 'active' },
  { id: 4, name: 'Sophie Dubois', position: { lat: 48.8584, lng: 2.2945 }, status: 'pending' },
];

export default function MapPage() {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const { toast } = useToast();

  const handleConfigureMap = () => {
    if (!apiKey.trim()) {
      toast({
        title: 'API Key Required',
        description: 'Please enter your Google Maps API key',
        variant: 'destructive',
      });
      return;
    }
    setIsConfigured(true);
    toast({
      title: 'Map Configured',
      description: 'Google Maps has been initialized successfully',
    });
  };

  const handleLocationFound = (location: google.maps.LatLngLiteral) => {
    setUserLocation(location);
    toast({
      title: 'Location Found',
      description: `Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}`,
    });
  };

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#22c55e'; // green
      case 'expired':
        return '#ef4444'; // red
      case 'pending':
        return '#f59e0b'; // orange
      default:
        return '#6b7280'; // gray
    }
  };

  const markers = sampleSubscribers.map(sub => ({
    position: sub.position,
    title: `${sub.name} (${sub.status})`,
    color: getMarkerColor(sub.status),
  }));

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Carte des Abonnés</h1>
          <p className="text-muted-foreground mt-2">
            Visualisation géographique avec géolocalisation
          </p>
        </div>

        {!isConfigured ? (
          <Card>
            <CardHeader>
              <CardTitle>Configuration Google Maps</CardTitle>
              <CardDescription>
                Entrez votre clé API Google Maps pour activer la carte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Google Maps API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Obtenez votre clé API sur{' '}
                  <a
                    href="https://console.cloud.google.com/google/maps-apis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Cloud Console
                  </a>
                </p>
              </div>
              <Button onClick={handleConfigureMap}>
                <MapPin className="w-4 h-4 mr-2" />
                Activer la Carte
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Carte Interactive
                </CardTitle>
                <CardDescription>
                  Localisation en temps réel et marqueurs des abonnés
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[600px]">
                <GoogleMap
                  apiKey={apiKey}
                  center={{ lat: 48.8566, lng: 2.3522 }}
                  zoom={13}
                  markers={markers}
                  onLocationFound={handleLocationFound}
                />
              </CardContent>
            </Card>

            {userLocation && (
              <Card>
                <CardHeader>
                  <CardTitle>Votre Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Latitude</Label>
                      <p className="text-lg font-mono">{userLocation.lat.toFixed(6)}</p>
                    </div>
                    <div>
                      <Label>Longitude</Label>
                      <p className="text-lg font-mono">{userLocation.lng.toFixed(6)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Légende</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span className="text-sm">Actif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <span className="text-sm">Expiré</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500" />
                    <span className="text-sm">En attente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                    <span className="text-sm">Votre position</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
}