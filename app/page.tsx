"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Cormorant_Garamond, Outfit, JetBrains_Mono } from "next/font/google";
import {
  profile,
  roles,
  skills,
  suggestedQuestions,
  demoJobDescriptions,
} from "@/lib/exploration-data";

/* ─── Fonts ─── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

/* ─── Design tokens as CSS variables ─── */
const vaultVars: Record<string, string> = {
  "--vault-bg": "#070B14",
  "--vault-surface": "#0E1320",
  "--vault-border": "#1A2035",
  "--vault-text": "#E8E4DF",
  "--vault-text-secondary": "#8B8A88",
  "--vault-text-muted": "#5A5957",
  "--vault-gold": "#C8A961",
  "--vault-gold-hover": "#D4BA7A",
  "--vault-gold-subtle": "rgba(200, 169, 97, 0.08)",
  "--vault-gold-glow": "rgba(200, 169, 97, 0.15)",
  "--vault-rose": "#C97373",
  "--vault-rose-subtle": "rgba(201, 115, 115, 0.08)",
};

/* ─── Animated gold divider ─── */
function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`vault-rule-wrapper ${className}`}>
      <div className="vault-rule" />
    </div>
  );
}

/* ─── Scroll-triggered fade-in wrapper ─── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   NAVBAR
   ════════════════════════════════════════════════════════════ */
function Navbar({ onAskAI }: { onAskAI: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on navigation
  const handleNavClick = () => setMobileOpen(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled || mobileOpen
          ? "rgba(7, 11, 20, 0.92)"
          : "transparent",
        backdropFilter: scrolled || mobileOpen ? "blur(16px)" : "none",
        borderBottom: scrolled || mobileOpen
          ? "1px solid rgba(26, 32, 53, 0.6)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Initials */}
        <a
          href="#top"
          className="font-serif text-xl tracking-wide"
          style={{ color: "var(--vault-gold)", fontFamily: "var(--font-cormorant)" }}
        >
          {profile.initials}
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          <a
            href="#experience"
            className="text-sm tracking-wide transition-colors duration-300 hover:opacity-100"
            style={{
              color: "var(--vault-text-secondary)",
              fontFamily: "var(--font-outfit)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--vault-text)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--vault-text-secondary)")
            }
          >
            Experience
          </a>
          <a
            href="#fit"
            className="text-sm tracking-wide transition-colors duration-300"
            style={{
              color: "var(--vault-text-secondary)",
              fontFamily: "var(--font-outfit)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--vault-text)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--vault-text-secondary)")
            }
          >
            Fit Check
          </a>
          <button
            onClick={onAskAI}
            className="text-sm font-medium px-5 py-2 rounded-full transition-all duration-300"
            style={{
              background: "var(--vault-gold)",
              color: "var(--vault-bg)",
              fontFamily: "var(--font-outfit)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--vault-gold-hover)";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(200, 169, 97, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--vault-gold)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Ask AI
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: "var(--vault-gold)",
              transform: mobileOpen ? "rotate(45deg) translateY(3.5px)" : "none",
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: "var(--vault-gold)",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: "var(--vault-gold)",
              transform: mobileOpen ? "rotate(-45deg) translateY(-3.5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className="sm:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? "280px" : "0",
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div
          className="px-6 pb-6 pt-2 flex flex-col gap-5"
          style={{ borderTop: "1px solid rgba(26, 32, 53, 0.4)" }}
        >
          <a
            href="#experience"
            onClick={handleNavClick}
            className="text-sm tracking-wide py-1"
            style={{
              color: "var(--vault-text-secondary)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            Experience
          </a>
          <a
            href="#fit"
            onClick={handleNavClick}
            className="text-sm tracking-wide py-1"
            style={{
              color: "var(--vault-text-secondary)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            Fit Check
          </a>
          <button
            onClick={() => {
              handleNavClick();
              onAskAI();
            }}
            className="text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 self-start"
            style={{
              background: "var(--vault-gold)",
              color: "var(--vault-bg)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            Ask AI
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════ */
function Hero({ onAskAI }: { onAskAI: () => void }) {
  return (
    <section
      id="top"
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ paddingTop: "6rem", paddingBottom: "4rem" }}
    >
      <div className="max-w-3xl w-full text-center">
        {/* Status badge */}
        <Reveal>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-wider mb-12"
            style={{
              border: "1px solid rgba(200, 169, 97, 0.3)",
              color: "var(--vault-gold)",
              fontFamily: "var(--font-outfit)",
              fontWeight: 400,
              letterSpacing: "0.08em",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--vault-gold)" }}
            />
            {profile.statusBadge}
          </div>
        </Reveal>

        {/* Name */}
        <Reveal delay={120}>
          <h1
            className="leading-none mb-6"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(3.5rem, 8vw, 6rem)",
              color: "var(--vault-text)",
              letterSpacing: "-0.02em",
            }}
          >
            {profile.name}
          </h1>
        </Reveal>

        {/* Title */}
        <Reveal delay={240}>
          <p
            className="text-xl mb-4"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 500,
              color: "var(--vault-gold)",
              letterSpacing: "0.02em",
              fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
            }}
          >
            {profile.title}
          </p>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={360}>
          <p
            className="max-w-xl mx-auto mb-10 leading-relaxed"
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              color: "var(--vault-text-secondary)",
              fontSize: "1.05rem",
            }}
          >
            {profile.subtitle}
          </p>
        </Reveal>

        {/* Tags */}
        <Reveal delay={480}>
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {profile.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-xs tracking-wide transition-all duration-300"
                style={{
                  border: "1px solid rgba(200, 169, 97, 0.2)",
                  color: "var(--vault-text-secondary)",
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200, 169, 97, 0.5)";
                  e.currentTarget.style.color = "var(--vault-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200, 169, 97, 0.2)";
                  e.currentTarget.style.color = "var(--vault-text-secondary)";
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={600}>
          <button
            onClick={onAskAI}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              background: "var(--vault-gold)",
              color: "var(--vault-bg)",
              fontFamily: "var(--font-outfit)",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--vault-gold-hover)";
              e.currentTarget.style.boxShadow =
                "0 0 32px rgba(200, 169, 97, 0.25)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--vault-gold)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span>✦</span>
            Ask AI About Me
          </button>
        </Reveal>

        {/* Scroll indicator */}
        <Reveal delay={800}>
          <div className="mt-20 flex flex-col items-center gap-3">
            <span
              className="text-xs tracking-widest uppercase"
              style={{
                color: "var(--vault-text-muted)",
                fontFamily: "var(--font-outfit)",
                fontWeight: 300,
              }}
            >
              Scroll
            </span>
            <div className="vault-scroll-line" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   EXPERIENCE
   ════════════════════════════════════════════════════════════ */
function Experience({
  expandedRoles,
  toggleRole,
}: {
  expandedRoles: Set<number>;
  toggleRole: (index: number) => void;
}) {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              color: "var(--vault-text)",
              letterSpacing: "-0.01em",
            }}
          >
            Experience
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <GoldRule className="mb-16" />
        </Reveal>

        <div className="space-y-6">
          {roles.map((role, index) => (
            <Reveal key={index} delay={index * 80}>
              <RoleCard
                role={role}
                expanded={expandedRoles.has(index)}
                onToggle={() => toggleRole(index)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoleCard({
  role,
  expanded,
  onToggle,
}: {
  role: (typeof roles)[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-lg p-6 sm:p-8 transition-all duration-500 vault-card"
      style={{
        background: "var(--vault-surface)",
        border: "1px solid var(--vault-border)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
        <h3
          className="text-lg"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 600,
            color: "var(--vault-text)",
            fontSize: "1.35rem",
          }}
        >
          {role.company}
        </h3>
        <span
          className="text-xs tracking-wider shrink-0"
          style={{
            fontFamily: "var(--font-jetbrains)",
            color: "var(--vault-gold)",
            opacity: 0.8,
            fontWeight: 400,
          }}
        >
          {role.dates}
        </span>
      </div>

      <p
        className="mb-5"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontWeight: 500,
          color: "var(--vault-gold)",
          fontSize: "1.05rem",
        }}
      >
        {role.title}
      </p>

      {/* Bullets */}
      <ul className="space-y-3 mb-6">
        {role.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed">
            <span
              className="shrink-0 mt-0.5"
              style={{ color: "var(--vault-gold)", opacity: 0.6 }}
            >
              →
            </span>
            <span
              style={{
                color: "var(--vault-text-secondary)",
                fontFamily: "var(--font-outfit)",
                fontWeight: 300,
              }}
            >
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      {/* AI Context toggle */}
      <button
        onClick={onToggle}
        className="inline-flex items-center gap-2 text-sm transition-all duration-300 group"
        style={{
          color: "var(--vault-gold)",
          fontFamily: "var(--font-outfit)",
          fontWeight: 400,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--vault-gold-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--vault-gold)")
        }
      >
        <span className="text-xs">✦</span>
        <span>View AI Context</span>
        <span
          className="text-xs transition-transform duration-300"
          style={{
            display: "inline-block",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▾
        </span>
      </button>

      {/* Expandable AI Context */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: expanded ? "800px" : "0",
          opacity: expanded ? 1 : 0,
        }}
      >
        <div
          className="mt-6 pt-6 space-y-5"
          style={{
            borderTop: "1px solid rgba(200, 169, 97, 0.1)",
          }}
        >
          <AIContextBlock label="Situation" text={role.aiContext.situation} />
          <AIContextBlock label="Approach" text={role.aiContext.approach} />
          {role.aiContext.keyDecision && (
            <AIContextBlock
              label="Key Decision"
              text={role.aiContext.keyDecision}
            />
          )}
          <AIContextBlock label="Outcome" text={role.aiContext.outcome} />
          <AIContextBlock label="Lesson" text={role.aiContext.lesson} />
        </div>
      </div>
    </div>
  );
}

function AIContextBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p
        className="text-xs tracking-wider uppercase mb-2"
        style={{
          color: "var(--vault-gold)",
          fontFamily: "var(--font-outfit)",
          fontWeight: 500,
          letterSpacing: "0.1em",
          opacity: 0.7,
        }}
      >
        {label}
      </p>
      <p
        className="text-sm leading-relaxed"
        style={{
          color: "var(--vault-text-secondary)",
          fontFamily: "var(--font-outfit)",
          fontWeight: 300,
        }}
      >
        {text}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SKILLS MATRIX
   ════════════════════════════════════════════════════════════ */
function SkillsMatrix() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              color: "var(--vault-text)",
            }}
          >
            Skills
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <GoldRule className="mb-16" />
        </Reveal>

        <Reveal delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--vault-border)" }}>
            {/* Strong */}
            <div
              className="p-6"
              style={{
                background: "var(--vault-gold-subtle)",
              }}
            >
              <h3
                className="text-xs tracking-widest uppercase mb-6 text-center"
                style={{
                  color: "var(--vault-gold)",
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                }}
              >
                Strong
              </h3>
              <ul className="space-y-3">
                {skills.strong.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-start gap-2.5 text-sm"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontWeight: 300,
                    }}
                  >
                    <span
                      className="shrink-0 mt-0.5 text-xs"
                      style={{ color: "var(--vault-gold)" }}
                    >
                      ✓
                    </span>
                    <span style={{ color: "var(--vault-text)" }}>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Moderate */}
            <div
              className="p-6"
              style={{
                background: "var(--vault-surface)",
              }}
            >
              <h3
                className="text-xs tracking-widest uppercase mb-6 text-center"
                style={{
                  color: "var(--vault-text)",
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                }}
              >
                Moderate
              </h3>
              <ul className="space-y-3">
                {skills.moderate.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-start gap-2.5 text-sm"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontWeight: 300,
                    }}
                  >
                    <span
                      className="shrink-0 mt-0.5 text-xs"
                      style={{ color: "var(--vault-text-muted)" }}
                    >
                      ○
                    </span>
                    <span style={{ color: "var(--vault-text-secondary)" }}>
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gaps */}
            <div
              className="p-6"
              style={{
                background: "var(--vault-rose-subtle)",
              }}
            >
              <h3
                className="text-xs tracking-widest uppercase mb-6 text-center"
                style={{
                  color: "var(--vault-rose)",
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                }}
              >
                {"Gaps (I'll Tell You)"}
              </h3>
              <ul className="space-y-3">
                {skills.gaps.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-start gap-2.5 text-sm"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontWeight: 300,
                    }}
                  >
                    <span
                      className="shrink-0 mt-0.5 text-xs"
                      style={{ color: "var(--vault-rose)", opacity: 0.7 }}
                    >
                      ✕
                    </span>
                    <span style={{ color: "var(--vault-text-secondary)" }}>
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FIT ASSESSMENT RESULT — parses structured response
   ════════════════════════════════════════════════════════════ */
function FitResult({ text }: { text: string }) {
  // Parse fit level for badge color
  const fitLevelMatch = text.match(/\*\*Fit Level:\*\*\s*(.+)/);
  const fitLevel = fitLevelMatch?.[1]?.trim() || "";
  const isStrong = /strong/i.test(fitLevel);
  const isWeak = /weak|not a fit/i.test(fitLevel);

  // Split into sections by **Header:** pattern
  const sections = text.split(/(?=\*\*(?:Fit Level|What Aligns|What Doesn't Align|What Transfers|Recommendation):\*\*)/).filter(Boolean);

  return (
    <div
      className="rounded-xl p-6 space-y-5 vault-fade-in"
      style={{
        background: "var(--vault-bg)",
        border: "1px solid var(--vault-border)",
      }}
    >
      {sections.map((section, i) => {
        const headerMatch = section.match(/^\*\*(.+?):\*\*\s*([\s\S]*)/);
        if (!headerMatch) return null;
        const header = headerMatch[1];
        const body = headerMatch[2].trim();

        // Fit Level gets a colored badge
        if (header === "Fit Level") {
          const badgeBg = isStrong
            ? "var(--vault-gold-subtle)"
            : isWeak
              ? "var(--vault-rose-subtle)"
              : "rgba(139, 138, 136, 0.1)";
          const badgeColor = isStrong
            ? "var(--vault-gold)"
            : isWeak
              ? "var(--vault-rose)"
              : "var(--vault-text-secondary)";
          const badgeBorder = isStrong
            ? "rgba(200, 169, 97, 0.3)"
            : isWeak
              ? "rgba(201, 115, 115, 0.3)"
              : "rgba(139, 138, 136, 0.2)";

          return (
            <div key={i} className="flex items-center gap-3">
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{
                  color: "var(--vault-text-muted)",
                  fontFamily: "var(--font-outfit)",
                }}
              >
                Fit Level
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: badgeBg,
                  color: badgeColor,
                  border: `1px solid ${badgeBorder}`,
                  fontFamily: "var(--font-outfit)",
                }}
              >
                {body}
              </span>
            </div>
          );
        }

        // Parse bullet lists
        const lines = body.split("\n").filter((l) => l.trim());
        const hasBullets = lines.some((l) => l.trim().startsWith("- "));

        return (
          <div key={i} className="space-y-2">
            <h4
              className="text-xs font-medium uppercase tracking-wider"
              style={{
                color: "var(--vault-text-muted)",
                fontFamily: "var(--font-outfit)",
                letterSpacing: "0.08em",
              }}
            >
              {header}
            </h4>
            {hasBullets ? (
              <ul className="space-y-1.5">
                {lines
                  .filter((l) => l.trim().startsWith("- "))
                  .map((l, j) => (
                    <li
                      key={j}
                      className="text-sm leading-relaxed pl-4"
                      style={{
                        color: "var(--vault-text-secondary)",
                        fontFamily: "var(--font-outfit)",
                        fontWeight: 300,
                        position: "relative",
                      }}
                    >
                      <span
                        className="absolute left-0"
                        style={{ color: "var(--vault-gold)", opacity: 0.5 }}
                      >
                        ›
                      </span>
                      {l.trim().slice(2)}
                    </li>
                  ))}
              </ul>
            ) : (
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--vault-text-secondary)",
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 300,
                }}
              >
                {body}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FIT ASSESSMENT
   ════════════════════════════════════════════════════════════ */
function FitAssessment() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const demoJDs = demoJobDescriptions;

  const handleAnalyze = useCallback(async () => {
    if (!jd.trim() || loading) return;
    setLoading(true);
    setError(null);
    setAssessment(null);
    try {
      const res = await fetch("/api/fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jd }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Failed to analyze fit");
      }
      const data = await res.json();
      setAssessment(data.assessment);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [jd, loading]);

  const handleReset = () => {
    setAssessment(null);
    setError(null);
    setJd("");
  };

  return (
    <section id="fit" className="px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              color: "var(--vault-text)",
            }}
          >
            Honest Fit Assessment
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <GoldRule className="mb-6" />
        </Reveal>

        <Reveal delay={200}>
          <p
            className="text-center text-sm mb-12 max-w-lg mx-auto leading-relaxed"
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              color: "var(--vault-text-secondary)",
              fontStyle: "italic",
            }}
          >
            {profile.bio}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="space-y-5">
            {/* Show form when no assessment yet */}
            {!assessment && (
              <>
                <textarea
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  placeholder="Paste a job description here..."
                  rows={6}
                  maxLength={5000}
                  disabled={loading}
                  className="w-full rounded-lg p-5 text-sm leading-relaxed resize-none transition-all duration-300 outline-none"
                  style={{
                    background: "var(--vault-surface)",
                    border: "1px solid var(--vault-border)",
                    color: "var(--vault-text)",
                    fontFamily: "var(--font-outfit)",
                    fontWeight: 300,
                    opacity: loading ? 0.6 : 1,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--vault-gold)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 1px rgba(200, 169, 97, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--vault-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                {jd.length > 4000 && (
                  <p
                    className="text-xs text-right"
                    style={{
                      color: jd.length >= 5000 ? "var(--vault-rose)" : "var(--vault-text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {jd.length.toLocaleString()} / 5,000
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="text-xs"
                    style={{
                      color: "var(--vault-text-muted)",
                      fontFamily: "var(--font-outfit)",
                      fontWeight: 400,
                    }}
                  >
                    Try:
                  </span>
                  {demoJDs.map((demo) => (
                    <button
                      key={demo.label}
                      onClick={() => setJd(demo.title + "\n\n" + demo.description)}
                      disabled={loading}
                      className="px-3.5 py-1.5 rounded-full text-xs transition-all duration-300"
                      style={{
                        border: "1px solid var(--vault-border)",
                        color: "var(--vault-text-secondary)",
                        fontFamily: "var(--font-outfit)",
                        fontWeight: 400,
                        background: "transparent",
                        opacity: loading ? 0.5 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.currentTarget.style.borderColor =
                            "rgba(200, 169, 97, 0.4)";
                          e.currentTarget.style.color = "var(--vault-gold)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--vault-border)";
                        e.currentTarget.style.color =
                          "var(--vault-text-secondary)";
                      }}
                    >
                      {demo.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={!jd.trim() || loading}
                  className="w-full py-3.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background:
                      jd.trim() && !loading
                        ? "var(--vault-gold)"
                        : "var(--vault-surface)",
                    color:
                      jd.trim() && !loading
                        ? "var(--vault-bg)"
                        : "var(--vault-text-muted)",
                    border:
                      jd.trim() && !loading
                        ? "1px solid var(--vault-gold)"
                        : "1px solid var(--vault-border)",
                    fontFamily: "var(--font-outfit)",
                    fontWeight: 500,
                    cursor: jd.trim() && !loading ? "pointer" : "default",
                  }}
                  onMouseEnter={(e) => {
                    if (jd.trim() && !loading) {
                      e.currentTarget.style.background =
                        "var(--vault-gold-hover)";
                      e.currentTarget.style.boxShadow =
                        "0 0 24px rgba(200, 169, 97, 0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (jd.trim() && !loading) {
                      e.currentTarget.style.background = "var(--vault-gold)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  {loading && (
                    <span
                      className="inline-block w-4 h-4 rounded-full border-2 animate-spin"
                      style={{
                        borderColor: "rgba(7, 11, 20, 0.3)",
                        borderTopColor: "var(--vault-bg)",
                      }}
                    />
                  )}
                  {loading ? "Analyzing..." : "Analyze Fit"}
                </button>
              </>
            )}

            {/* Error message */}
            {error && (
              <div
                className="rounded-lg p-4 text-sm flex items-center justify-between"
                style={{
                  background: "var(--vault-rose-subtle)",
                  border: "1px solid rgba(201, 115, 115, 0.2)",
                  color: "var(--vault-rose)",
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 400,
                }}
              >
                <span>{error}</span>
                <button
                  onClick={handleAnalyze}
                  className="text-xs underline underline-offset-2 ml-3 shrink-0"
                  style={{ color: "var(--vault-rose)" }}
                >
                  Try again
                </button>
              </div>
            )}

            {/* Assessment result */}
            {assessment && (
              <div className="space-y-5">
                <FitResult text={assessment} />
                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-lg text-sm transition-all duration-300"
                  style={{
                    background: "transparent",
                    border: "1px solid var(--vault-border)",
                    color: "var(--vault-text-secondary)",
                    fontFamily: "var(--font-outfit)",
                    fontWeight: 400,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(200, 169, 97, 0.4)";
                    e.currentTarget.style.color = "var(--vault-gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--vault-border)";
                    e.currentTarget.style.color =
                      "var(--vault-text-secondary)";
                  }}
                >
                  Try Another
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   TYPING INDICATOR — three pulsing dots
   ════════════════════════════════════════════════════════════ */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-2 px-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            background: "var(--vault-gold)",
            opacity: 0.5,
            animation: `vault-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ASK AI MODAL
   ════════════════════════════════════════════════════════════ */
function AskAIModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      const userMsg = { role: "user" as const, content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          throw new Error(errData?.error || "Failed to get response");
        }
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  if (!open) return null;

  const hasMessages = messages.length > 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: "rgba(4, 6, 12, 0.88)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full sm:max-w-lg sm:rounded-xl overflow-hidden vault-modal-enter flex flex-col max-h-full sm:max-h-[85vh]"
        style={{
          background: "var(--vault-surface)",
          border: "1px solid rgba(200, 169, 97, 0.2)",
          boxShadow: "0 0 60px rgba(200, 169, 97, 0.06)",
          height: "100dvh",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 shrink-0"
          style={{ borderBottom: "1px solid rgba(200, 169, 97, 0.1)" }}
        >
          <div className="flex items-center gap-2.5">
            <span style={{ color: "var(--vault-gold)", fontSize: "0.875rem" }}>
              ✦
            </span>
            <h3
              className="text-base"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 600,
                color: "var(--vault-text)",
                fontSize: "1.2rem",
              }}
            >
              Ask AI About Me
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-lg leading-none p-1 transition-colors duration-200"
            style={{ color: "var(--vault-text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--vault-text)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--vault-text-muted)")
            }
          >
            ✕
          </button>
        </div>

        {/* Body — scrollable */}
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 sm:py-6 space-y-4"
        >
          {/* Suggested questions — shown only when no messages */}
          {!hasMessages && (
            <>
              <p
                className="text-xs tracking-wider uppercase mb-4"
                style={{
                  color: "var(--vault-text-muted)",
                  fontFamily: "var(--font-outfit)",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                }}
              >
                Suggested Questions
              </p>
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="w-full text-left p-3.5 sm:p-4 rounded-lg text-sm transition-all duration-300"
                  style={{
                    background: "var(--vault-bg)",
                    border: "1px solid var(--vault-border)",
                    color: "var(--vault-text-secondary)",
                    fontFamily: "var(--font-outfit)",
                    fontWeight: 300,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(200, 169, 97, 0.4)";
                    e.currentTarget.style.color = "var(--vault-text)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--vault-border)";
                    e.currentTarget.style.color =
                      "var(--vault-text-secondary)";
                  }}
                >
                  {q}
                </button>
              ))}
            </>
          )}

          {/* Chat messages */}
          {hasMessages &&
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="rounded-xl px-4 py-3 text-sm leading-relaxed max-w-[85%]"
                  style={{
                    background:
                      msg.role === "user"
                        ? "rgba(200, 169, 97, 0.12)"
                        : "var(--vault-bg)",
                    border:
                      msg.role === "user"
                        ? "1px solid rgba(200, 169, 97, 0.2)"
                        : "1px solid var(--vault-border)",
                    color: "var(--vault-text-secondary)",
                    fontFamily: "var(--font-outfit)",
                    fontWeight: 300,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.content.split("\n\n").map((para, j) => (
                    <p key={j} className={j > 0 ? "mt-3" : ""}>
                      {/* Bold text rendering */}
                      {para.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong
                            key={k}
                            style={{
                              color: "var(--vault-text)",
                              fontWeight: 500,
                            }}
                          >
                            {part.slice(2, -2)}
                          </strong>
                        ) : (
                          <span key={k}>{part}</span>
                        )
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div
                className="rounded-xl px-4 py-2"
                style={{
                  background: "var(--vault-bg)",
                  border: "1px solid var(--vault-border)",
                }}
              >
                <TypingIndicator />
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div
              className="rounded-lg p-3 text-sm flex items-center justify-between"
              style={{
                background: "var(--vault-rose-subtle)",
                border: "1px solid rgba(201, 115, 115, 0.2)",
                color: "var(--vault-rose)",
                fontFamily: "var(--font-outfit)",
                fontWeight: 400,
              }}
            >
              <span>{error}</span>
              <button
                onClick={() => {
                  setError(null);
                  // Retry last message if available
                  const lastUser = [...messages]
                    .reverse()
                    .find((m) => m.role === "user");
                  if (lastUser) {
                    // Remove the failed user message and resend
                    setMessages((prev) => prev.slice(0, -1));
                    sendMessage(lastUser.content);
                  }
                }}
                className="text-xs underline underline-offset-2 ml-3 shrink-0"
                style={{ color: "var(--vault-rose)" }}
              >
                Try again
              </button>
            </div>
          )}
        </div>

        {/* Input — pinned to bottom */}
        <div
          className="px-5 sm:px-6 py-4 sm:py-5 flex gap-3 shrink-0"
          style={{
            borderTop: "1px solid rgba(200, 169, 97, 0.1)",
            paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          }}
        >
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about my background..."
              maxLength={1000}
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-300"
              style={{
                background: "var(--vault-bg)",
                border: "1px solid var(--vault-border)",
                color: "var(--vault-text)",
                fontFamily: "var(--font-outfit)",
                fontWeight: 300,
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--vault-gold)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--vault-border)";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim() && !loading) {
                  sendMessage(input);
                }
              }}
            />
            {input.length > 800 && (
              <span
                className="absolute right-2 -top-5 text-xs"
                style={{
                  color: input.length >= 1000 ? "var(--vault-rose)" : "var(--vault-text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {input.length} / 1,000
              </span>
            )}
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
            style={{
              background: input.trim() && !loading
                ? "var(--vault-gold)"
                : "var(--vault-border)",
              color: input.trim() && !loading
                ? "var(--vault-bg)"
                : "var(--vault-text-muted)",
              fontFamily: "var(--font-outfit)",
              fontWeight: 500,
              cursor: input.trim() && !loading ? "pointer" : "default",
            }}
            onMouseEnter={(e) => {
              if (input.trim() && !loading) {
                e.currentTarget.style.background = "var(--vault-gold-hover)";
              }
            }}
            onMouseLeave={(e) => {
              if (input.trim() && !loading) {
                e.currentTarget.style.background = "var(--vault-gold)";
              }
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════════════════════ */
function FooterSection() {
  return (
    <footer className="px-6 pt-8 pb-16">
      <div className="max-w-3xl mx-auto">
        <GoldRule className="mb-12" />

        <div className="text-center">
          <p
            className="mb-2"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 400,
              fontSize: "1.5rem",
              color: "var(--vault-text)",
            }}
          >
            {profile.name}
          </p>
          <p
            className="text-sm mb-8"
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
              color: "var(--vault-text-secondary)",
            }}
          >
            {profile.title}
          </p>

          {/* Social links */}
          <div className="flex justify-center gap-4 mb-10">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300"
              style={{
                border: "1px solid rgba(200, 169, 97, 0.3)",
                color: "var(--vault-gold)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--vault-gold)";
                e.currentTarget.style.background = "var(--vault-gold-subtle)";
                e.currentTarget.style.boxShadow =
                  "0 0 16px rgba(200, 169, 97, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(200, 169, 97, 0.3)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
              aria-label="LinkedIn"
            >
              ↗
            </a>
            <a
              href={`mailto:${profile.links.email}`}
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300"
              style={{
                border: "1px solid rgba(200, 169, 97, 0.3)",
                color: "var(--vault-gold)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--vault-gold)";
                e.currentTarget.style.background = "var(--vault-gold-subtle)";
                e.currentTarget.style.boxShadow =
                  "0 0 16px rgba(200, 169, 97, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(200, 169, 97, 0.3)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
              aria-label="Email"
            >
              ✉
            </a>
          </div>

          <p
            className="text-xs"
            style={{
              color: "var(--vault-text-muted)",
              fontFamily: "var(--font-outfit)",
              fontWeight: 300,
            }}
          >
            Designed to let the work speak for itself.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE (root)
   ════════════════════════════════════════════════════════════ */
export default function VaultPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [expandedRoles, setExpandedRoles] = useState<Set<number>>(new Set());

  const toggleRole = (index: number) => {
    setExpandedRoles((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div
      className={`${cormorant.variable} ${outfit.variable} ${jetbrains.variable} min-h-screen`}
      style={{
        ...vaultVars,
        background: "var(--vault-bg)",
        color: "var(--vault-text)",
        fontFamily: "var(--font-outfit)",
      }}
    >
      {/* Inline keyframe styles */}
      <style>{`
        /* Gold rule animation */
        .vault-rule-wrapper {
          display: flex;
          justify-content: center;
          padding: 0 1rem;
        }
        .vault-rule {
          height: 1px;
          width: 0;
          background: linear-gradient(
            90deg,
            transparent,
            var(--vault-gold) 20%,
            var(--vault-gold) 80%,
            transparent
          );
          animation: vault-rule-expand 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0.4;
        }
        @keyframes vault-rule-expand {
          to {
            width: 100%;
          }
        }

        /* Scroll indicator line */
        .vault-scroll-line {
          width: 1px;
          height: 0;
          background: var(--vault-gold);
          opacity: 0.3;
          animation: vault-scroll-line-grow 1.5s cubic-bezier(0.22, 1, 0.36, 1) 1s forwards;
        }
        @keyframes vault-scroll-line-grow {
          to {
            height: 48px;
          }
        }

        /* Card hover */
        .vault-card {
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .vault-card:hover {
          border-color: rgba(200, 169, 97, 0.25) !important;
          box-shadow: 0 0 24px rgba(200, 169, 97, 0.04);
        }

        /* Modal entrance */
        .vault-modal-enter {
          animation: vault-modal-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes vault-modal-in {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Modal: full-screen on mobile, auto on desktop */
        @media (min-width: 640px) {
          .vault-modal-enter {
            height: auto !important;
          }
        }

        /* Gold shimmer on hover for buttons */
        @keyframes vault-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* Typing indicator pulse */
        @keyframes vault-pulse {
          0%, 60%, 100% { opacity: 0.2; transform: scale(0.8); }
          30% { opacity: 0.8; transform: scale(1); }
        }

        /* Fade-in for result cards */
        .vault-fade-in {
          animation: vault-fade-in 0.4s ease-out forwards;
        }
        @keyframes vault-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Textarea placeholder */
        textarea::placeholder,
        input::placeholder {
          color: var(--vault-text-muted);
          font-family: var(--font-outfit);
          font-weight: 300;
        }

        /* Selection color */
        ::selection {
          background: rgba(200, 169, 97, 0.25);
          color: var(--vault-text);
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: var(--vault-bg);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--vault-border);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(200, 169, 97, 0.3);
        }
      `}</style>

      <Navbar onAskAI={() => setChatOpen(true)} />

      <main>
        <Hero onAskAI={() => setChatOpen(true)} />
        <Experience expandedRoles={expandedRoles} toggleRole={toggleRole} />
        <SkillsMatrix />
        <FitAssessment />
      </main>

      <FooterSection />

      <AskAIModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
