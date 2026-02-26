"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Loader2 } from "lucide-react";
import { careerData } from "@/lib/career-data";

export function FitAssessment() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });

      if (!res.ok) throw new Error("Failed to analyze");

      const data = await res.json();
      setResult(data.assessment);
    } catch {
      setResult(
        "Unable to analyze right now. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadDemo = (index: number) => {
    const demo = careerData.demoJobDescriptions[index];
    if (demo) {
      setJobDescription(`${demo.title}\n\n${demo.description}`);
      setResult(null);
    }
  };

  return (
    <section id="fit-check" className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground">
          Honest Fit Assessment
        </h2>
        <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
          Paste a job description. Get an honest assessment of whether I'm the
          right person — including when I'm not.
        </p>
      </div>

      {/* Demo buttons */}
      <div className="flex justify-center gap-3 mb-8">
        {careerData.demoJobDescriptions.map((demo, i) => (
          <Button
            key={demo.label}
            variant={i === 0 ? "default" : "outline"}
            onClick={() => loadDemo(i)}
            className={
              i === 0
                ? "bg-teal hover:bg-teal-hover text-[#0a0a0a]"
                : "border-[#2a2a2a] text-muted-foreground hover:text-foreground"
            }
          >
            {demo.label}
          </Button>
        ))}
      </div>

      {/* JD Input */}
      <div className="border border-[#2a2a2a] rounded-2xl p-6 bg-[#141414]">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-teal" />
          <span className="text-sm text-muted-foreground">
            Job description to analyze
          </span>
        </div>
        <Textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste a job description here..."
          className="min-h-[120px] bg-[#1a1a1a] border-[#2a2a2a] text-foreground placeholder:text-neutral-600 font-mono text-sm resize-none"
        />
        <Button
          onClick={handleAnalyze}
          disabled={!jobDescription.trim() || loading}
          className="mt-4 bg-teal hover:bg-teal-hover text-[#0a0a0a] font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Fit"
          )}
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-8 border border-[#2a2a2a] rounded-2xl p-6 bg-[#141414]">
          <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}

      {/* Tagline */}
      <div className="mt-12 text-center border border-[#2a2a2a] rounded-2xl p-6 max-w-lg mx-auto">
        <p className="text-muted-foreground text-sm">
          This signals something completely different than &quot;please consider
          my resume.&quot;
        </p>
        <p className="text-foreground font-medium mt-2">
          You&apos;re qualifying them. Your time is valuable too.
        </p>
      </div>
    </section>
  );
}
