import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Dashboard from "./pages/Dashboard";
import Module from "./pages/Module";
import Bonus from "./pages/Bonus";
import Conquistas from "./pages/Conquistas";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Legacy pages (Assistente IA - mantido para compatibilidade)
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";

function Router() {
  return (
    <Switch>
      {/* Plataforma MTU */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/modulo/:id" component={Module} />
      <Route path="/bonus/:id" component={Bonus} />
      <Route path="/conquistas" component={Conquistas} />
      
      {/* Auth pages (criadas mas não obrigatórias por enquanto) */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      
      {/* Assistente IA (legacy) */}
      <Route path="/assistente" component={Home} />
      <Route path="/faq" component={FAQ} />
      
      {/* Redirect root to dashboard */}
      <Route path="/">
        <Redirect to="/dashboard" />
      </Route>
      
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
