"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { careerData } from "@/lib/career-data";

interface NavbarProps {
  onAskAI: () => void;
}

export function Navbar({ onAskAI }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#2a2a2a]"
          : "bg-transparent"
      }`}
    >
      {/* Teal accent line at top */}
      <div className="h-[2px] bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500" />

      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-bold text-foreground">
          {careerData.profile.initials}
        </span>

        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollTo("experience")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Experience
          </button>
          <button
            onClick={() => scrollTo("fit-check")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Fit Check
          </button>
          <Button
            onClick={onAskAI}
            size="sm"
            className="bg-teal hover:bg-teal-hover text-[#0a0a0a] font-medium rounded-full px-4"
          >
            <MessageSquare className="w-4 h-4 mr-1.5" />
            Ask AI
          </Button>
        </div>
      </div>
    </nav>
  );
}
