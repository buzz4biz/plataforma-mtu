import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { 
  Award,
  Star,
  Trophy,
  Target,
  BookOpen,
  MessageSquare,
  Calendar,
  Sparkles,
  Lock
} from "lucide-react";

const badges = [
  {
    id: "iniciante",
    name: "Iniciante MTU",
    description: "Começou sua jornada no Protocolo MTU",
    icon: Star,
    color: "bg-amber-500"
  },
  {
    id: "diagnostico",
    name: "Diagnóstico Completo",
    description: "Completou o Módulo 1 - Diagnóstico de Invisibilidade",
    icon: Target,
    color: "bg-emerald-500"
  },
  {
    id: "mecanismo",
    name: "Mecanismo Extraído",
    description: "Completou o Módulo 2 - Extração do Mecanismo",
    icon: BookOpen,
    color: "bg-blue-500"
  },
  {
    id: "comunicador",
    name: "Comunicador MTU",
    description: "Completou o Módulo 3 - Scripts de Comunicação",
    icon: MessageSquare,
    color: "bg-purple-500"
  },
  {
    id: "implementador",
    name: "Implementador",
    description: "Completou o Módulo 4 - Plano de 90 Dias",
    icon: Calendar,
    color: "bg-rose-500"
  },
  {
    id: "mestre",
    name: "Mestre MTU",
    description: "Completou todos os módulos do Protocolo MTU",
    icon: Trophy,
    color: "bg-gradient-to-r from-amber-500 to-yellow-400"
  },
  {
    id: "explorador",
    name: "Explorador de Bônus",
    description: "Acessou todos os 3 bônus exclusivos",
    icon: Sparkles,
    color: "bg-cyan-500"
  },
  {
    id: "ia-user",
    name: "Parceiro da IA",
    description: "Usou o Assistente IA do Protocolo MTU",
    icon: Award,
    color: "bg-indigo-500"
  }
];

export default function Conquistas() {
  const { data: earnedBadgeIds = [] } = trpc.badges.getAll.useQuery();
  
  const earnedBadges = badges.filter(b => earnedBadgeIds.some(eb => eb.badgeId === b.id));
  const lockedBadges = badges.filter(b => !earnedBadgeIds.some(eb => eb.badgeId === b.id));
  const progress = badges.length > 0 ? Math.round((earnedBadges.length / badges.length) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-display font-bold">Minhas Conquistas</h1>
          </div>
          <p className="text-muted-foreground">
            Acompanhe seu progresso e desbloqueie badges ao completar os módulos.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 border-t-4 border-t-primary">
          <CardContent className="py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-lg">Progresso Geral</h3>
                <p className="text-sm text-muted-foreground">
                  {earnedBadges.length} de {badges.length} conquistas desbloqueadas
                </p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-bold text-primary">{progress}%</span>
              </div>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Earned Badges */}
        <div className="mb-8">
          <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Conquistas Desbloqueadas
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {earnedBadges.map((badge) => (
              <Card key={badge.id} className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl ${badge.color} flex items-center justify-center shrink-0 shadow-lg`}>
                      <badge.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-lg">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Locked Badges */}
        <div>
          <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            Próximas Conquistas
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {lockedBadges.map((badge) => (
              <Card key={badge.id} className="opacity-60">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-lg text-muted-foreground">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
