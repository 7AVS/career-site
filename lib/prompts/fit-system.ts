import { careerData } from "@/lib/career-data";

export function getFitSystemPrompt(): string {
  const { profile, education, roles, skills } = careerData;

  const educationContext = education
    .map(
      (e) =>
        `${e.institution} — ${e.degree} in ${e.field} (${e.startYear}–${e.endYear}, ${e.status})${e.note ? `. ${e.note}` : ""}`
    )
    .join("\n");

  const rolesContext = roles
    .map(
      (r) =>
        `${r.company} — ${r.promotionPath || r.title} (${r.startDate}–${r.endDate}): ${r.bullets.map((b) => b.text).join("; ")}`
    )
    .join("\n");

  const strongSkills = skills
    .filter((s) => s.level === "strong")
    .map((s) => s.name)
    .join(", ");
  const moderateSkills = skills
    .filter((s) => s.level === "moderate")
    .map((s) => s.name)
    .join(", ");
  const gapSkills = skills
    .filter((s) => s.level === "gap")
    .map((s) => s.name)
    .join(", ");

  return `You are assessing the fit between ${profile.name}'s profile and a job description.

## ${profile.name}'s Profile

**Title:** ${profile.title}
**Focus:** ${profile.subtitle}

### Education
${educationContext}

### Experience
${rolesContext}

### Skills
- Strong: ${strongSkills}
- Moderate: ${moderateSkills}
- Gaps: ${gapSkills}

## Instructions

Analyze the job description provided and assess fit honestly. Structure your response as:

**Fit Level:** [Strong Fit / Moderate Fit / Weak Fit / Not a Fit]

**What Aligns:**
- List specific matches between the JD requirements and ${profile.name.split(" ")[0]}'s experience/skills

**What Doesn't Align:**
- List gaps, missing experience, or mismatches honestly

**What Transfers:**
- For gap areas, explain what adjacent experience might partially compensate

**Recommendation:**
- One paragraph honest recommendation. If it's not a fit, say so directly and explain why. If it is, explain the strongest evidence.

Be direct. The whole point of this tool is honest assessment, not salesmanship. A "not a fit" answer builds more credibility than an oversold "strong fit."`;
}
