import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  BookOpen,
  MessageSquare,
  Calendar,
  Gift,
  Bot,
  ArrowRight,
  CheckCircle2,
  Circle,
  Play,
  Loader2,
  RotateCcw
} from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const moduleDefinitions = [
  {
    id: "modulo-1",
    num: 1,
    title: "Diagnóstico de Invisibilidade",
    description: "Descubra por que você está invisível no mercado e como isso está afetando seus resultados.",
    icon: Target,
    path: "/modulo/1",
    duration: "45 min",
    lessons: 5,
  },
  {
    id: "modulo-2",
    num: 2,
    title: "Extração do Mecanismo",
    description: "Use o Framework de 7 Perguntas para extrair e nomear seu Mecanismo Terapêutico Único.",
    icon: BookOpen,
    path: "/modulo/2",
    duration: "120 min",
    lessons: 3,
  },
  {
    id: "modulo-3",
    num: 3,
    title: "Scripts de Comunicação",
    description: "Scripts prontos para comunicar seu MTU em diferentes contextos e plataformas.",
    icon: MessageSquare,
    path: "/modulo/3",
    duration: "90 min",
    lessons: 5,
  },
  {
    id: "modulo-4",
    num: 4,
    title: "Plano de Implementação",
    description: "Plano detalhado de 90 dias para implementar seu MTU e ver resultados concretos.",
    icon: Calendar,
    path: "/modulo/4",
    duration: "30 min",
    lessons: 4,
  },
];

const bonuses = [
  {
    id: "bonus-1",
    title: "Planilha de Análise de Concorrência",
    description: "Analise seus concorrentes e encontre seu diferencial único.",
    path: "/bonus/1",
  },
  {
    id: "bonus-2",
    title: "Biblioteca de Gatilhos Mentais Éticos",
    description: "20 gatilhos mentais para usar em sua comunicação de forma ética.",
    path: "/bonus/2",
  },
  {
    id: "bonus-3",
    title: "Guia de Precificação Estratégica",
    description: "Como precificar seus serviços de forma estratégica usando seu MTU.",
    path: "/bonus/3",
  },
];

export default function Dashboard() {
  const { data: user } = trpc.auth.getCurrentUser.useQuery();
  const { data: progressData, isLoading: progressLoading } = trpc.progress.getAll.useQuery(undefined, {
    enabled: !!user,
  });
  const { data: statsData, isLoading: statsLoading } = trpc.progress.getStats.useQuery(undefined, {
    enabled: !!user,
  });
  const utils = trpc.useUtils();
  const resetProgressMutation = trpc.progress.reset.useMutation();

  const completedModuleIds = progressData
    ?.filter(p => p.lessonId === "_module_complete" && p.completed === 1)
    .map(p => p.moduleId) || [];

  const getModuleInProgress = () => {
    if (!progressData) return null;

    for (const mod of moduleDefinitions) {
      const moduleProgress = progressData.filter(p =>
        p.moduleId === mod.id &&
        p.lessonId !== "_module_complete" &&
        p.completed === 1
      );

      const isModuleComplete = completedModuleIds.includes(mod.id);
      if (moduleProgress.length > 0 && !isModuleComplete) {
        return mod;
      }
    }
    return null;
  };

  const getNextModule = () => {
    const inProgress = getModuleInProgress();
    if (inProgress) return inProgress;

    for (const mod of moduleDefinitions) {
      if (!completedModuleIds.includes(mod.id)) {
        return mod;
      }
    }

    return moduleDefinitions[0];
  };

  const handleResetProgress = async () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja resetar todo o seu progresso? Essa ação apagará as perguntas respondidas e não poderá ser desfeita."
    );

    if (!confirmed) return;

    try {
      await resetProgressMutation.mutateAsync();
      await Promise.all([
        utils.progress.getAll.invalidate(),
        utils.progress.getStats.invalidate(),
      ]);
      toast.success("Seu progresso foi resetado. Você voltou ao estado inicial.");
    } catch (error) {
      console.error("Erro ao resetar progresso:", error);
      toast.error("Não foi possível resetar seu progresso. Tente novamente.");
    }
  };

  const nextModule = getNextModule();
  const progress = statsData?.progressPercentage || 0;
  const completedModules = statsData?.completedModules || 0;
  const totalModules = 7;
  const isLoading = progressLoading || statsLoading;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
              Bem-vindo ao Protocolo MTU™
            </h1>
            <p className="text-muted-foreground mt-2">
              Sua jornada para descobrir e comunicar seu Mecanismo Terapêutico Único começa aqui.
            </p>
          </div>
          <div className="flex gap-2">
            {user?.role === "admin" && (
              <Button asChild variant="outline" className="gap-2">
                <Link href="/admin">
                  <Target className="h-4 w-4" />
                  Dashboard Admin
                </Link>
              </Button>
            )}
            <Button asChild className="bg-primary hover:bg-primary/90 gap-2">
              <Link href={nextModule.path}>
                <Play className="h-4 w-4" />
                Continuar de onde parou
              </Link>
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="font-display">Seu Progresso</CardTitle>
                <CardDescription>Continue sua jornada para se tornar um Mestre MTU</CardDescription>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={handleResetProgress}
                  disabled={resetProgressMutation.isPending}
                >
                  {resetProgressMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RotateCcw className="h-4 w-4" />
                  )}
                  {resetProgressMutation.isPending ? "Resetando..." : "Resetar progresso"}
                </Button>
              </div>
              <div className="text-left sm:text-right">
                {isLoading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                ) : (
                  <>
                    <span className="text-3xl font-bold text-primary">{progress}%</span>
                    <p className="text-sm text-muted-foreground">completo</p>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-3 mb-4" />
            <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
              <span className="text-muted-foreground">{completedModules} de {totalModules} módulos completos</span>
              <span className="text-primary font-medium">Próximo: {nextModule.title}</span>
            </div>
          </CardContent>
        </Card>

        {/* AI Assistant CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <Bot className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-foreground">Assistente IA do Protocolo MTU™</h3>
                <p className="text-muted-foreground mt-1">Use nosso assistente de IA para extrair seu Mecanismo Terapêutico Único de forma guiada e personalizada.</p>
              </div>
              <Button asChild className="bg-primary hover:bg-primary/90 gap-2 whitespace-nowrap">
                <a href="https://plataforma-mtu.onrender.com/assistente" target="_blank" rel="noopener noreferrer">
                  <Bot className="h-4 w-4" />
                  Acessar Assistente IA
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">Módulos do Protocolo</h2>
            <span className="text-sm text-muted-foreground">{completedModuleIds.filter(id => id.startsWith("modulo")).length}/4 completos</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {moduleDefinitions.map((module) => {
              const isCompleted = completedModuleIds.includes(module.id);
              const isCurrent = module.id === nextModule.id && !isCompleted;

              return (
                <Link key={module.id} href={module.path}>
                  <Card className={`h-full transition-all hover:shadow-lg cursor-pointer ${isCurrent ? 'ring-2 ring-primary' : ''} ${isCompleted ? 'bg-primary/5' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-primary' : 'bg-muted'}`}>
                          <module.icon className={`h-6 w-6 ${isCompleted ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                        </div>
                        {isCompleted ? <CheckCircle2 className="h-6 w-6 text-primary" /> : isCurrent ? <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Em andamento</span> : <Circle className="h-6 w-6 text-muted-foreground/30" />}
                      </div>
                      <CardTitle className="font-display text-lg mt-3">Módulo {module.num}: {module.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{module.lessons} lições</span>
                        <span>{module.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bonuses Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Gift className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-display font-bold">Bônus Exclusivos</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {bonuses.map((bonus) => (
              <Link key={bonus.id} href={bonus.path}>
                <Card className="h-full transition-all hover:shadow-lg cursor-pointer hover:border-primary/50">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><Gift className="h-5 w-5 text-primary" /></div>
                    <CardTitle className="font-display text-base">{bonus.title}</CardTitle>
                    <CardDescription className="text-sm">{bonus.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-primary text-sm font-medium">Acessar bônus<ArrowRight className="h-4 w-4 ml-1" /></div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
