"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, ChevronDown } from "lucide-react";
import { careerData } from "@/lib/career-data";

interface HeroProps {
  onAskAI: () => void;
}

export function Hero({ onAskAI }: HeroProps) {
  const { profile } = careerData;

  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-start max-w-3xl mx-auto px-6 py-32">
      {/* Status badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2a2a2a] mb-8">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-sm text-muted-foreground">
          {profile.statusBadge}
        </span>
      </div>

      {/* Name */}
      <h1 className="text-6xl md:text-7xl font-bold font-display text-foreground leading-tight">
        {profile.name}
      </h1>

      {/* Title */}
      <p className="text-xl md:text-2xl font-medium text-teal mt-3">
        {profile.title}
      </p>

      {/* Subtitle */}
      <p className="text-base md:text-lg text-muted-foreground mt-2">
        {profile.subtitle}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-6">
        {profile.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-[#1a1a1a] text-muted-foreground border border-[#2a2a2a] hover:bg-[#222] px-4 py-1.5"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* CTA */}
      <Button
        onClick={onAskAI}
        size="lg"
        className="bg-teal hover:bg-teal-hover text-[#0a0a0a] font-medium rounded-lg mt-8 px-6"
      >
        <MessageSquare className="w-5 h-5 mr-2" />
        Ask AI About Me
      </Button>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center w-full mt-16">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Scroll to explore
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
}
