
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SubscribersPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Abonnés</h1>
          <p className="text-muted-foreground mt-2">
            Liste et détails des abonnés
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Liste des Abonnés</CardTitle>
            <CardDescription>À implémenter: Tableau avec recherche, filtres, détails</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Fonctionnalité en cours de développement...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}