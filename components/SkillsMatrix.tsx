"use client";

import { Check, Circle, X } from "lucide-react";
import { careerData } from "@/lib/career-data";

export function SkillsMatrix() {
  const strong = careerData.skills.filter((s) => s.level === "strong");
  const moderate = careerData.skills.filter((s) => s.level === "moderate");
  const gaps = careerData.skills.filter((s) => s.level === "gap");

  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Strong */}
        <div className="rounded-2xl p-6 bg-teal-subtle border border-teal/20">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-teal mb-6">
            Strong
          </h3>
          <div className="space-y-3">
            {strong.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-teal flex-shrink-0" />
                <span className="text-foreground">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Moderate */}
        <div className="rounded-2xl p-6 bg-[#141414] border border-[#2a2a2a]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
            Moderate
          </h3>
          <div className="space-y-3">
            {moderate.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <Circle className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gaps */}
        <div className="rounded-2xl p-6 bg-amber-500/10 border border-amber-500/20">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-6">
            {"Gaps (I'll Tell You)"}
          </h3>
          <div className="space-y-3">
            {gaps.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <X className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-foreground">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
