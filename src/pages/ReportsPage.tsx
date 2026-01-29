
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rapports et Statistiques</h1>
          <p className="text-muted-foreground mt-2">
            Analyses et exports
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Rapports</CardTitle>
            <CardDescription>À implémenter: Graphiques, exports, logs d'audit</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Fonctionnalité en cours de développement...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}