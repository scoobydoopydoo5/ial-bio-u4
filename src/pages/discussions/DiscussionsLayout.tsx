import { useState, useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { DiscussionAuthModal } from "@/components/discussions/DiscussionAuthModal";
import { ProfileButton } from "@/components/discussions/ProfileButton";
import {
  KawaiiMascot,
  getRandomCharacter,
} from "@/components/discussions/KawaiiMascot";
import "flag-icons/css/flag-icons.min.css";

import { Button } from "@/components/ui/button";
import {
  Home,
  Trophy,
  MessageSquare,
  ArrowLeft,
  Gamepad2,
  Menu,
  X,
} from "lucide-react";
import { ColorThemeSelector } from "../notes/_components/ColorThemeSelector";
import { ThemeToggle } from "../notes/ThemeToggle";

const DiscussionsLayout = () => {
  const { isAuthenticated, loading } = useDiscussionAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const mascotCharacter = useMemo(() => getRandomCharacter(), []);

  const navItems = [
    {
      path: "/discussions",
      label: "Discussions",
      icon: MessageSquare,
      exact: true,
    },
    { path: "/discussions/leaderboard", label: "Leaderboard", icon: Trophy },
    { path: "/game", label: "Quizzes", icon: Gamepad2 },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <KawaiiMascot character="ghost" mood="shocked" size={120} />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading...</p>
      </div>
    );
  }

  // Unauthenticated state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <KawaiiMascot character={mascotCharacter} mood="happy" size={150} />
        <h1 className="text-3xl font-bold mt-6 text-center">
          Welcome to Discussions
        </h1>
        <p className="text-muted-foreground mt-2 text-center max-w-md">
          Join our community to ask questions, share knowledge, and earn XP!
        </p>
        <div className="flex gap-4 mt-6">
          <Button onClick={() => setShowAuthModal(true)} size="lg">
            Launch
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back Home
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <ColorThemeSelector />
          <ThemeToggle />
        </div>
        <DiscussionAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-full flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Home + Discussions */}
          <div className="flex items-center gap-4 min-w-0">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity truncate"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm hidden sm:inline truncate">Home</span>
            </Link>

            {/* Desktop Discussions */}
            <div className="hidden md:flex items-center gap-2 min-w-0 truncate">
              <KawaiiMascot
                className="hidden sm:block"
                character="speechBubble"
                mood="happy"
                size={32}
              />
              <span className="font-bold hidden sm:inline truncate">
                Discussions
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 min-w-0 flex-1 justify-center overflow-hidden">
            {navItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link
                    className="flex items-center gap-1 truncate"
                    to={item.path}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden sm:inline truncate">
                      {item.label}
                    </span>
                  </Link>
                </Button>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Mobile smaller toggles */}
            <div className="flex gap-1 md:gap-2 items-center">
              <div className="md:hidden">
                <ColorThemeSelector size="sm" />
              </div>
              <div className="md:hidden">
                <ThemeToggle size="sm" />
              </div>
              <div className="hidden md:flex">
                <ColorThemeSelector />
                <ThemeToggle />
              </div>
            </div>

            <ProfileButton />

            {/* Mobile burger menu */}
            <Button
              className="md:hidden"
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <div className="flex flex-col p-2 space-y-1">
              {navItems.map((item) => {
                const isActive = item.exact
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      isActive ? "bg-primary/20" : "hover:bg-accent"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-full px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
        <Outlet />
      </main>

      {/* Floating Mascot */}
      <div className="fixed bottom-4 right-4 hidden lg:block opacity-50 hover:opacity-100 transition-opacity">
        <KawaiiMascot character={mascotCharacter} mood="blissful" size={60} />
      </div>
    </div>
  );
};

export default DiscussionsLayout;
