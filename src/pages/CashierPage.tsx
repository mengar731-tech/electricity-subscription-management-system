
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CashierPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interface Guichet</h1>
          <p className="text-muted-foreground mt-2">
            Traitement des paiements et génération de reçus
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recherche et Paiement</CardTitle>
            <CardDescription>À implémenter: Recherche abonnés, validation paiement, historique</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Fonctionnalité en cours de développement...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}