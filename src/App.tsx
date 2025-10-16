import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { StyleProvider } from "./contexts/StyleContext";
import { ThreadAuthProvider } from "./contexts/ThreadAuthContext";
import Index from "./pages/Index";
import Checklist from "./pages/Checklist";
import PastPapersChecklist from "./pages/PastPapersChecklist";
import Threads from "./pages/Threads";
import Community from "./pages/Community";
import ThreadDetail from "./pages/ThreadDetail";
import NotFound from "./pages/NotFound";
import MouseParticles from "react-mouse-particles";
import NoOldSyllabus from "./pages/NoOldSyllabus";
import Planner from "./pages/Timer";
import NotesRouter from "./pages/NotesRouter";
import { ThemeProviderer } from "./hooks/useTheme";
import CrispChat from "./components/CrispChat";
import Chat from "./pages/Chat";
import Whatsapp from "./pages/Whatsapp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {" "}
    <ThemeProvider>
      {" "}
      <MouseParticles
        g={1}
        color="random"
        cull="MuiSvgIcon-root,MuiButton-root"
        level={6}
      />{" "}
      <ThemeProviderer>
        <StyleProvider>
          <ThreadAuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <CrispChat />

              <BrowserRouter>
                <Routes>
                  <Route path="/notes/*" element={<NotesRouter />} />
                  <Route path="/" element={<Index />} />
                  <Route path="/checklist" element={<Checklist />} />{" "}
                  <Route path="/timer" element={<Planner />} />{" "}
                  <Route path="/no-old-syllabus" element={<NoOldSyllabus />} />
                  <Route
                    path="/pastpapers-checklist"
                    element={<PastPapersChecklist />}
                  />{" "}
                  <Route path="/whatsapp" element={<Whatsapp />} />{" "}
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/threads" element={<Threads />} />
                  <Route path="/threads/:slug" element={<ThreadDetail />} />
                  <Route path="/community/:slug" element={<Community />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ThreadAuthProvider>
        </StyleProvider>
      </ThemeProviderer>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
