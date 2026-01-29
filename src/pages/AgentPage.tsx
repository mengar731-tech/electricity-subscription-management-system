
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AgentPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interface Agent Terrain</h1>
          <p className="text-muted-foreground mt-2">
            Audit technique et enregistrement des abonnés
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Formulaire d'Audit</CardTitle>
            <CardDescription>À implémenter: Checklist d'appareils, GPS, impression</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Fonctionnalité en cours de développement...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}