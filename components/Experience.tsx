"use client";

import { useState } from "react";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { careerData, type Role } from "@/lib/career-data";

function RoleCard({ role }: { role: Role }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-[#2a2a2a] rounded-2xl p-8 bg-[#141414]">
      {/* Header row: company + dates */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold font-display text-foreground">
            {role.company}
          </h3>
          <p className="text-sm text-teal mt-0.5">
            {role.promotionPath || role.title}
          </p>
        </div>
        <span className="text-sm font-mono text-muted-foreground whitespace-nowrap ml-4">
          {role.startDate}–{role.endDate}
        </span>
      </div>

      {/* Bullets */}
      <div className="mt-6 space-y-3">
        {role.bullets.map((bullet, i) => (
          <div key={i} className="flex items-start gap-3">
            <ArrowRight className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{bullet.text}</span>
          </div>
        ))}
      </div>

      {/* View AI Context toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 mt-6 text-sm text-teal hover:text-teal-hover transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        View AI Context
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded AI Context */}
      {expanded && (
        <div className="mt-4 pl-6 border-l-2 border-teal/20 space-y-4">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              Situation
            </h4>
            <p className="text-sm text-foreground/80">
              {role.aiContext.situation}
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              Approach
            </h4>
            <p className="text-sm text-foreground/80">
              {role.aiContext.approach}
            </p>
          </div>
          {role.aiContext.keyDecision && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Key Decision
              </h4>
              <p className="text-sm text-foreground/80">
                {role.aiContext.keyDecision}
              </p>
            </div>
          )}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              Outcome
            </h4>
            <p className="text-sm text-foreground/80">
              {role.aiContext.outcome}
            </p>
          </div>
          {role.aiContext.lessonLearned && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Lesson Learned
              </h4>
              <p className="text-sm text-foreground/80">
                {role.aiContext.lessonLearned}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">
        Experience
      </h2>
      <p className="text-muted-foreground mt-3 text-lg">
        Each role includes queryable AI context — the real story behind the
        bullet points.
      </p>

      <div className="mt-12 space-y-6">
        {careerData.roles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </section>
  );
}
