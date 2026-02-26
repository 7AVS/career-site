"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { FitAssessment } from "@/components/FitAssessment";
import { AskAIModal } from "@/components/AskAIModal";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Navbar onAskAI={() => setChatOpen(true)} />
      <main>
        <Hero onAskAI={() => setChatOpen(true)} />
        <Experience />
        <SkillsMatrix />
        <FitAssessment />
      </main>
      <Footer />
      <AskAIModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
