import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import SplashScreen from "@/pages/splash";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ProjectsPage from "@/pages/projects";
import SkillsPage from "@/pages/skills";
import ResumePage from "@/pages/resume";
import ContactPage from "@/pages/contact";
import HireMePage from "@/pages/hire-me";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import FloatingResumeButton from "@/components/ui/floating-resume-button";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";

function Router() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/skills" component={SkillsPage} />
          <Route path="/resume" component={ResumePage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/hire-me" component={HireMePage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingResumeButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
