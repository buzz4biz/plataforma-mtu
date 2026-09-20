import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/useMobile";
import { 
  LayoutDashboard, 
  LogOut, 
  PanelLeft, 
  Target, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  Gift, 
  Bot, 
  Award,
  ChevronDown,
  ChevronRight,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from './DashboardLayoutSkeleton';
import { Button } from "./ui/button";
import { trpc } from "@/lib/trpc";

type SidebarSubItem = {
  label: string;
  path: string;
};

type SidebarModule = {
  icon: LucideIcon;
  label: string;
  path: string;
  description: string;
  subItems?: SidebarSubItem[];
};

const modules: SidebarModule[] = [
  { 
    icon: Target, 
    label: "Módulo 1: Diagnóstico", 
    path: "/modulo/1",
    description: "Diagnóstico de Invisibilidade"
  },
  { 
    icon: BookOpen, 
    label: "Módulo 2: Extração", 
    path: "/modulo/2",
    description: "Extração do Mecanismo"
  },
  { 
    icon: MessageSquare, 
    label: "Módulo 3: Scripts", 
    path: "/modulo/3",
    description: "Scripts de Comunicação"
  },
  { 
    icon: Calendar, 
    label: "Módulo 4: Implementação", 
    path: "/modulo/4",
    description: "Plano de 90 Dias"
  },
];

const bonuses = [
  { icon: Gift, label: "Análise de Concorrência", path: "/bonus/1" },
  { icon: Gift, label: "Gatilhos Mentais Éticos", path: "/bonus/2" },
  { icon: Gift, label: "Precificação Estratégica", path: "/bonus/3" },
];

const SIDEBAR_WIDTH_KEY = "sidebar-width";
const DEFAULT_WIDTH = 300;
const MIN_WIDTH = 260;
const MAX_WIDTH = 400;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  if (loading) {
    return <DashboardLayoutSkeleton />
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": `${sidebarWidth}px`,
        } as CSSProperties
      }
    >
      <DashboardLayoutContent setSidebarWidth={setSidebarWidth}>
        {children}
      </DashboardLayoutContent>
    </SidebarProvider>
  );
}

type DashboardLayoutContentProps = {
  children: React.ReactNode;
  setSidebarWidth: (width: number) => void;
};

function DashboardLayoutContent({
  children,
  setSidebarWidth,
}: DashboardLayoutContentProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Fetch real progress data
  const { data: statsData } = trpc.progress.getStats.useQuery(undefined, {
    enabled: !!user,
  });

  const progress = statsData?.progressPercentage || 0;
  const completedModules = statsData?.completedModules || 0;
  const totalModules = 7;

  useEffect(() => {
    if (isCollapsed) {
      setIsResizing(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  const isActive = (path: string) => location === path;
  const isModuleActive = (path: string) => location.startsWith(path);

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar
          collapsible="icon"
          className="border-r border-sidebar-border bg-sidebar"
          disableTransition={isResizing}
        >
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3 transition-all w-full">
              <button
                onClick={toggleSidebar}
                className="h-10 w-10 flex items-center justify-center bg-primary rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
                aria-label="Toggle navigation"
              >
                {isCollapsed ? (
                  <PanelLeft className="h-5 w-5 text-primary-foreground" />
                ) : (
                  <span className="text-primary-foreground font-display font-bold text-sm">MTU</span>
                )}
              </button>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-display font-bold text-sidebar-foreground truncate">
                    Protocolo MTU™
                  </span>
                  <span className="text-xs text-sidebar-foreground/60 truncate">
                    Mecanismo Terapêutico Único
                  </span>
                </div>
              )}
            </div>
          </SidebarHeader>

          {/* Progress Section */}
          {!isCollapsed && (
            <div className="p-4 border-b border-sidebar-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-sidebar-foreground/70">Seu progresso</span>
                <span className="text-xs font-semibold text-primary">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-sidebar-foreground/60 mt-2">
                {completedModules} de {totalModules} módulos
              </p>
            </div>
          )}

          <SidebarContent className="gap-0">
            <SidebarMenu className="px-2 py-2">
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive('/dashboard')}
                  onClick={() => setLocation('/dashboard')}
                  tooltip="Dashboard"
                  className="h-10"
                >
                  <LayoutDashboard className={`h-5 w-5 ${isActive('/dashboard') ? 'text-primary' : ''}`} />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Modules Section */}
              {!isCollapsed && (
                <div className="px-3 pt-4 pb-2">
                  <span className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                    Módulos
                  </span>
                </div>
              )}

              {modules.map((module) => (
                <div key={module.path}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={isModuleActive(module.path)}
                      onClick={() => {
                        if (module.subItems) {
                          setExpandedModule(expandedModule === module.path ? null : module.path);
                        } else {
                          setLocation(module.path);
                        }
                      }}
                      tooltip={module.label}
                      className="h-10"
                    >
                      <module.icon className={`h-5 w-5 ${isModuleActive(module.path) ? 'text-primary' : ''}`} />
                      <span className="flex-1 truncate">{module.label}</span>
                      {module.subItems && !isCollapsed && (
                        expandedModule === module.path 
                          ? <ChevronDown className="h-4 w-4" />
                          : <ChevronRight className="h-4 w-4" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* Sub-items */}
                  {module.subItems && expandedModule === module.path && !isCollapsed && (
                    <div className="ml-6 space-y-1 mb-2">
                      {module.subItems.map((sub) => (
                        <SidebarMenuItem key={sub.path}>
                          <SidebarMenuButton
                            isActive={isActive(sub.path)}
                            onClick={() => setLocation(sub.path)}
                            className="h-9 text-sm"
                          >
                            <span className="truncate">{sub.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Bonuses Section */}
              {!isCollapsed && (
                <div className="px-3 pt-4 pb-2">
                  <span className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                    Bônus Exclusivos
                  </span>
                </div>
              )}

              {bonuses.map((bonus) => (
                <SidebarMenuItem key={bonus.path}>
                  <SidebarMenuButton
                    isActive={isActive(bonus.path)}
                    onClick={() => setLocation(bonus.path)}
                    tooltip={bonus.label}
                    className="h-10"
                  >
                    <bonus.icon className={`h-5 w-5 ${isActive(bonus.path) ? 'text-primary' : 'text-primary/70'}`} />
                    <span className="truncate">{bonus.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Tools Section */}
              {!isCollapsed && (
                <div className="px-3 pt-4 pb-2">
                  <span className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                    Ferramentas
                  </span>
                </div>
              )}

              {/* AI Assistant */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => window.open('https://plataforma-mtu.onrender.com/assistente', '_blank')}
                  tooltip="Assistente IA"
                  className="h-10"
                >
                  <Bot className="h-5 w-5 text-primary" />
                  <span className="flex-1">Assistente IA</span>
                  {!isCollapsed && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Novo</span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* FAQ */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive('/faq')}
                  onClick={() => setLocation('/faq')}
                  tooltip="FAQ"
                  className="h-10"
                >
                  <HelpCircle className="h-5 w-5" />
                  <span className="flex-1">FAQ</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Badges */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive('/conquistas')}
                  onClick={() => setLocation('/conquistas')}
                  tooltip="Minhas Conquistas"
                  className="h-10"
                >
                  <Award className={`h-5 w-5 ${isActive('/conquistas') ? 'text-primary' : ''}`} />
                  <span>Minhas Conquistas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-3 border-t border-sidebar-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-sidebar-accent/10 transition-colors w-full text-left group-data-[collapsible=icon]:justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="h-9 w-9 border border-sidebar-border shrink-0">
                    <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate leading-none text-sidebar-foreground">
                        {user?.name || "-"}
                      </p>
                      <p className="text-xs text-sidebar-foreground/60 truncate mt-1">
                        {user?.email || "-"}
                      </p>
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/20 transition-colors ${isCollapsed ? "hidden" : ""}`}
          onMouseDown={() => {
            if (isCollapsed) return;
            setIsResizing(true);
          }}
          style={{ zIndex: 50 }}
        />
      </div>

      <SidebarInset className="bg-background">
        {isMobile && (
          <div className="flex border-b border-border h-14 items-center justify-between bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:backdrop-blur sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="h-9 w-9 rounded-lg" />
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-display font-semibold text-foreground">
                  Protocolo MTU™
                </span>
              </div>
            </div>
          </div>
        )}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </>
  );
}
