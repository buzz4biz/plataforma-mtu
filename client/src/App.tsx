import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
      {/* Auth pages - public */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      
      {/* Plataforma MTU - protected routes */}
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/modulo/:id">
        <ProtectedRoute>
          <Module />
        </ProtectedRoute>
      </Route>
      <Route path="/bonus/:id">
        <ProtectedRoute>
          <Bonus />
        </ProtectedRoute>
      </Route>
      <Route path="/conquistas">
        <ProtectedRoute>
          <Conquistas />
        </ProtectedRoute>
      </Route>
      
      {/* Assistente IA (legacy) - protected */}
      <Route path="/assistente">
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </Route>
      <Route path="/faq">
        <ProtectedRoute>
          <FAQ />
        </ProtectedRoute>
      </Route>
      
      {/* Redirect root to login (users will be redirected to dashboard after auth) */}
      <Route path="/">
        <Redirect to="/login" />
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
