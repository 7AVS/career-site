// =============================================================================
// Career Data — All content for Andre's AI-powered career site
// =============================================================================
// This is the SINGLE SOURCE OF TRUTH for all career content.
// Components read from here. AI system prompts serialize this into context.
// Andre edits this file to update his career info.
// =============================================================================

// --- Type Definitions ---

export interface CareerProfile {
  name: string;
  initials: string;
  title: string;
  subtitle: string;
  statusBadge: string;
  tags: string[];
  links: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
  bio: string;
}

export interface BulletPoint {
  text: string;
}

export interface AIContext {
  situation: string;
  approach: string;
  keyDecision?: string;
  outcome: string;
  lessonLearned?: string;
}

export interface Role {
  id: string;
  company: string;
  title: string;
  promotionPath?: string; // e.g., "Senior Data Quality Analyst → Marketing Analytics Manager"
  startDate: string;
  endDate: string; // "Present" for current role
  bullets: BulletPoint[];
  aiContext: AIContext;
}

export type SkillLevel = "strong" | "moderate" | "gap";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SuggestedQuestion {
  text: string;
}

export interface DemoJobDescription {
  label: string; // "Strong Fit Example" or "Weak Fit Example"
  title: string;
  description: string;
}

export interface CareerData {
  profile: CareerProfile;
  roles: Role[];
  skills: Skill[];
  suggestedQuestions: SuggestedQuestion[];
  demoJobDescriptions: DemoJobDescription[];
  footerTagline: string;
}

// --- Placeholder Data (Andre fills this in during Phase 2) ---

export const careerData: CareerData = {
  profile: {
    name: "Andre Dantas",
    initials: "AD",
    title: "Marketing Analytics Manager",
    subtitle:
      "Data strategy, analytics engineering, and governance across banking",
    statusBadge: "Open to Senior Manager / Analytics Lead roles",
    tags: ["RBC", "HSBC", "Data Governance", "Marketing Analytics"],
    links: {
      linkedin: "", // Andre fills in
      github: "", // Andre fills in
      email: "", // Andre fills in
    },
    bio: "", // Andre fills in — a paragraph or two about his career thesis
  },

  roles: [
    {
      id: "rbc-mam",
      company: "RBC",
      title: "Marketing Analytics Manager",
      startDate: "2024",
      endDate: "Present",
      bullets: [
        { text: "Placeholder — Andre fills in bullet 1" },
        { text: "Placeholder — Andre fills in bullet 2" },
        { text: "Placeholder — Andre fills in bullet 3" },
      ],
      aiContext: {
        situation: "Placeholder — the context when Andre joined this role",
        approach: "Placeholder — what Andre did and how",
        outcome: "Placeholder — what happened as a result",
        lessonLearned: "Placeholder — the insight from this experience",
      },
    },
    {
      id: "rbc-sdqa",
      company: "RBC",
      title: "Senior Data Quality Analyst",
      startDate: "2024",
      endDate: "2024",
      bullets: [
        { text: "Placeholder — Andre fills in bullet 1" },
        { text: "Placeholder — Andre fills in bullet 2" },
        { text: "Placeholder — Andre fills in bullet 3" },
      ],
      aiContext: {
        situation: "Placeholder",
        approach: "Placeholder",
        outcome: "Placeholder",
      },
    },
    {
      id: "hsbc",
      company: "HSBC Canada",
      title: "Lead Data Analyst, Data Governance",
      startDate: "2017",
      endDate: "2024",
      bullets: [
        { text: "Placeholder — Andre fills in bullet 1" },
        { text: "Placeholder — Andre fills in bullet 2" },
        { text: "Placeholder — Andre fills in bullet 3" },
      ],
      aiContext: {
        situation: "Placeholder",
        approach: "Placeholder",
        outcome: "Placeholder",
      },
    },
  ],

  skills: [
    // Strong
    { name: "Data Governance & Quality", level: "strong" },
    { name: "Marketing Analytics", level: "strong" },
    { name: "SQL & Data Engineering", level: "strong" },
    { name: "Cross-functional Leadership", level: "strong" },
    { name: "Process Automation (Python)", level: "strong" },
    { name: "Stakeholder Management", level: "strong" },
    // Moderate
    { name: "Machine Learning / AI", level: "moderate" },
    { name: "Cloud Platforms (AWS/GCP)", level: "moderate" },
    { name: "Financial Services Compliance", level: "moderate" },
    // Gaps — being honest about these signals self-awareness
    { name: "Product Management", level: "gap" },
    { name: "Frontend Development", level: "gap" },
    { name: "People Management (10+ reports)", level: "gap" },
  ],

  suggestedQuestions: [
    { text: "What kind of leadership style does Andre have?" },
    {
      text: "How did Andre handle the transition from HSBC to RBC?",
    },
    { text: "Tell me about a time Andre failed or struggled." },
    {
      text: "What makes Andre different from other analytics managers?",
    },
  ],

  demoJobDescriptions: [
    {
      label: "Strong Fit Example",
      title: "Senior Manager, Marketing Analytics — Major Bank",
      description:
        "Placeholder — Andre provides a JD that closely matches his background",
    },
    {
      label: "Weak Fit Example",
      title: "Head of Product, Consumer Fintech",
      description:
        "Placeholder — Andre provides a JD that doesn't match well, showing honest assessment",
    },
  ],

  footerTagline:
    "This site demonstrates AI-queryable professional presentation. The interface is the proof.",
};
