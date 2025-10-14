import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CheckSquare,
  ArrowRight,
  MessageCircle,
  FileText,
  Timer,
} from "lucide-react";
import { ThemeControls } from "@/components/ThemeControls";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <StarsBackground className="pointer-events-none" />
      <ShootingStars className="pointer-events-none" />
      <div className="text-center space-y-8 p-8 max-w-3xl">
        <div className="flex justify-end mb-4">
          <ThemeControls />
        </div>
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 mb-6 animate-pulse">
          <CheckSquare className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 bg-clip-text">
          U4 Bio Checklists+
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mb-10 leading-relaxed">
          Master Edexcel Unit 4 IAL Biology with interactive checklists, past
          papers, and collaborative discussion forums (soon)
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/timer">
            <Button
              variant="outline"
              className="gap-2 text-lg px-8 py-6 w-full sm:w-auto"
            >
              <Timer className="w-5 h-5" />
              Countdown
            </Button>
          </Link>{" "}
          <Link to="/checklist">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-lg px-8 py-6 w-full sm:w-auto">
              Syllabus Checklist
              <CheckSquare className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/pastpapers-checklist">
            <Button
              variant="outline"
              className="gap-2 text-lg px-8 py-6 w-full sm:w-auto"
            >
              <FileText className="w-5 h-5" />
              Past Papers
            </Button>
          </Link>
          {/* 
          <Link to="/threads">
            <Button variant="outline" className="gap-2 text-lg px-8 py-6 w-full sm:w-auto">
              <MessageCircle className="w-5 h-5" />
              Community
            </Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
