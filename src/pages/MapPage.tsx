
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MapPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Carte des Abonnés</h1>
          <p className="text-muted-foreground mt-2">
            Visualisation géographique avec statuts
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Carte Interactive</CardTitle>
            <CardDescription>À implémenter: Leaflet/Google Maps, marqueurs colorés, filtres</CardDescription>
          </CardHeader>
          <CardContent className="h-96 bg-muted rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Carte à intégrer...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}