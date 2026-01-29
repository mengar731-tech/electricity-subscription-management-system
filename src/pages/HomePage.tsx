
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Zap, DollarSign, MapPin, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const stats = [
    {
      name: 'Abonnés Actifs',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'text-success',
    },
    {
      name: 'Consommation Totale',
      value: '45,678 kWh',
      change: '+8%',
      icon: Zap,
      color: 'text-primary',
    },
    {
      name: 'Revenus du Mois',
      value: '12,345,678 XAF',
      change: '+15%',
      icon: DollarSign,
      color: 'text-accent',
    },
    {
      name: 'Abonnements Expirés',
      value: '87',
      change: '-5%',
      icon: AlertCircle,
      color: 'text-destructive',
    },
  ];

  const quickActions = [
    {
      title: 'Nouvel Audit',
      description: 'Enregistrer un nouvel abonné',
      icon: Zap,
      href: '/agent',
      color: 'bg-primary',
    },
    {
      title: 'Paiement',
      description: 'Traiter un paiement',
      icon: DollarSign,
      href: '/cashier',
      color: 'bg-success',
    },
    {
      title: 'Carte',
      description: 'Voir les abonnés sur la carte',
      icon: MapPin,
      href: '/map',
      color: 'bg-accent',
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de Bord</h1>
          <p className="text-muted-foreground mt-2">
            Gestion des abonnements électriques au forfait
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </CardTitle>
                  <Icon className={cn('h-4 w-4', stat.color)} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                      {stat.change}
                    </span>{' '}
                    par rapport au mois dernier
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Actions Rapides</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} to={action.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center mb-4', action.color)}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle>{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
            <CardDescription>Dernières transactions et événements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Paiement reçu</p>
                      <p className="text-xs text-muted-foreground">Abonné #{1000 + i}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">25,000 XAF</p>
                    <p className="text-xs text-muted-foreground">Il y a {i}h</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}