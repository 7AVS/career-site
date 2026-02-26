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
  promotionPath?: string;
  startDate: string;
  endDate: string;
  bullets: BulletPoint[];
  aiContext: AIContext;
}

export type SkillLevel = "strong" | "moderate" | "gap";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  status: "completed" | "in-progress";
  note?: string;
}

export interface SuggestedQuestion {
  text: string;
}

export interface DemoJobDescription {
  label: string;
  title: string;
  description: string;
}

export interface CareerData {
  profile: CareerProfile;
  education: Education[];
  roles: Role[];
  skills: Skill[];
  suggestedQuestions: SuggestedQuestion[];
  demoJobDescriptions: DemoJobDescription[];
  footerTagline: string;
}

// --- Career Data ---

export const careerData: CareerData = {
  profile: {
    name: "Andre Dantas",
    initials: "AD",
    title: "Data & Analytics Leader",
    subtitle:
      "Enterprise governance, marketing measurement, and analytics engineering across global banking",
    statusBadge:
      "Open to Senior Manager / Director — Analytics, Governance, or Hybrid roles",
    tags: [
      "Financial Services",
      "Data Governance",
      "Marketing Analytics",
      "Automation & Engineering",
      "Trilingual",
    ],
    links: {
      linkedin: "https://linkedin.com/in/andre-v-santos",
      email: "avas.andre@gmail.com",
    },
    bio: "I've spent 14 years in global banking learning one thing: data only matters if you can trust it, and trusted data only matters if you use it.\n\nAt HSBC I built a data governance function from scratch — the policies, operating models, and quality controls that made an entire division's data reliable. At RBC I took that foundation mindset into marketing analytics, building automated measurement systems that turn campaign experiments into statistically rigorous business decisions.\n\nMost analytics professionals inherit clean data and never think about where it came from. Most governance professionals ensure quality but never touch the analysis. I do both — and that combination is where I want to lead next: building teams and systems at the intersection of trusted data and applied analytics, in organizations complex enough to need both.",
  },

  education: [
    {
      institution: "FGV — Fundação Getulio Vargas",
      degree: "MBA",
      field: "AI & Analytics Applied to Business",
      startYear: "2026",
      endYear: "2027",
      status: "in-progress",
      note: "Brazil's #1 ranked business school. Live program combining AI/ML methods with business strategy and analytics leadership.",
    },
  ],

  roles: [
    {
      id: "rbc",
      company: "RBC",
      title: "Marketing Analytics Manager",
      promotionPath: "Senior Data Quality Analyst → Marketing Analytics Manager",
      startDate: "2024",
      endDate: "Present",
      bullets: [
        {
          text: "Designed and built an automated vintage curve measurement engine integrating RBC's 4-layer semantic framework (SuperFact), producing daily test/control lift calculations with confidence intervals across 6 campaign types serving 5M+ clients",
        },
        {
          text: "Architected campaign measurement infrastructure with 59 documented configuration points, enabling scalable onboarding of new campaigns with clear data lineage from experiment setup through client outcome",
        },
        {
          text: "Built a standardized success metrics library — campaign taxonomy, measurement definitions, and cataloged data assets — establishing a single source of truth for payment products analytics",
        },
        {
          text: "Led data quality integration during the HSBC Canada acquisition — bridging two governance standards, evaluating enterprise tooling (Informatica, Ataccama), and building automated monitoring across merged data domains",
        },
      ],
      aiContext: {
        situation:
          "I arrived at RBC through the HSBC Canada acquisition — one of the largest bank mergers in recent Canadian history. My first months were spent in the Data Management Office, helping integrate the governance standards I had built at HSBC into RBC's enterprise framework. Within six months, I transitioned into Marketing Analytics, where the team was undergoing significant leadership turnover — new VP, new Senior Director, new Director. The mandate was shifting from ad-hoc deep-dive analysis toward building a repeatable, automated measurement capability. There was no existing framework for systematically measuring campaign performance across Visa payment product types, and the team needed someone who could figure out the data architecture independently.",
        approach:
          "I spent the first months learning RBC's data ecosystem on my own — mapping how experiment metadata, campaign definitions, success logic, and client journey data connected across the organization's SuperFact semantic framework. Once I understood the full picture, I volunteered to lead the vintage automation project: building a Python/PySpark engine that would consume all four data layers and produce daily measurement outputs with statistical rigor. I also applied governance thinking from my previous career to the analytics problem — documenting every configuration point, creating a campaign taxonomy, building a success metrics library. The goal was to make measurement systematic rather than artisanal.",
        keyDecision:
          "I chose to build the measurement engine as a self-sufficient system with dual delivery tracks: one feeding into the official Tableau/reporting channel, and one producing standalone HTML/Plotly outputs. This meant the work could demonstrate value immediately without waiting for infrastructure approvals, while still being designed for eventual integration into the enterprise reporting stack.",
        outcome:
          "The vintage automation engine is now the team's core measurement asset, covering six Visa payment campaign types. It produces daily vintage curves, lift calculations, and confidence intervals that feed directly into quarterly executive presentations. The 59-point configuration documentation I created became the foundation for the team's technical onboarding, enabling new members to contribute within their first week. The Director gave me the floor to present the architecture to the full team and began using the framework as the template for how measurement should work going forward.",
        lessonLearned:
          "Building something tangible changes conversations. When I had documentation and working code to show, the discussion shifted from \"what should we do?\" to \"how do we scale this?\" — letting the work speak made it easier to earn trust and influence direction without needing to claim authority. The acquisition transition also taught me that governance skills are immediately transferable — the people who understand data at the structural level become essential when systems merge.",
      },
    },
    {
      id: "hsbc-canada",
      company: "HSBC Canada",
      title: "Lead Data Analyst, Data Governance",
      promotionPath: "Data Quality Analyst → Lead Data Analyst",
      startDate: "2017",
      endDate: "2024",
      bullets: [
        {
          text: "Built HSBC Canada's enterprise data governance function from inception — frameworks, policies, standards, and monitoring controls aligned with global HSBC requirements, achieving 40% improvement in data quality scores",
        },
        {
          text: "Designed the operating model defining data ownership, stewardship, and accountability across Technology, Compliance, Risk, and Business — then secured executive buy-in for multi-million dollar transformation initiatives through C-level presentations",
        },
        {
          text: "Deployed Collibra for metadata management (catalog, glossary, lineage) serving 200+ stakeholders and implemented Informatica-based automated quality rules across customer, product, and transactional domains",
        },
      ],
      aiContext: {
        situation:
          "When I arrived at HSBC Canada, there was no data governance function. Not underdeveloped — nonexistent. The organization needed frameworks, policies, quality controls, ownership models, and tooling, all aligned with global HSBC standards. This was not a maintenance role. It was a build-from-scratch mandate that required convincing an entire organization to change how it related to its own data.",
        approach:
          "I started by defining what governance needed to look like for HSBC Canada specifically — not just copying a global template, but designing an operating model that fit the local organization's structure. That meant mapping data ownership and stewardship responsibilities across Technology, Compliance, Risk, and Business units, then building the frameworks and policies that made those responsibilities concrete. On the tooling side, I deployed Collibra as the metadata management platform — standing up the data catalog, business glossary, lineage documentation, and governance workflows. I implemented automated data quality rules through Informatica, defining critical data elements across customer, product, and transactional domains. The hardest part was organizational, not technical. I facilitated cross-functional governance councils, established training programs and centers of excellence for data stewardship, and learned to present the business case for governance to executives who needed to see ROI before committing multi-million dollar budgets.",
        keyDecision:
          "Early on, I had to decide whether to pursue a top-down approach (get executive mandate first, then implement) or a bottom-up approach (demonstrate value in one domain, then expand). I chose bottom-up — proving the impact of governance through measurable quality improvements in targeted data domains before asking for broader organizational commitment. This built credibility incrementally rather than asking people to take governance on faith.",
        outcome:
          "Over seven years, the function I built became a core part of how HSBC Canada managed its data. Quality scores improved by 40%. The Collibra platform served over 200 stakeholders. The governance council became an established cross-functional forum. And the executive presentations I developed became the model for how data initiatives were pitched internally — because I had learned that governance only survives if leadership understands why it matters in business terms, not just technical ones.",
        lessonLearned:
          "Building something from nothing teaches you that the technical work is maybe 30% of the challenge. The other 70% is organizational — getting people to care, aligning incentives, earning trust from teams that didn't ask for governance and aren't sure they want it. That skill — making an organization adopt something it doesn't yet know it needs — is transferable to almost any leadership context.",
      },
    },
    {
      id: "hsbc-brazil-pricing",
      company: "HSBC Brazil",
      title: "Pricing Analyst",
      startDate: "2013",
      endDate: "2016",
      bullets: [
        {
          text: "Led customer profitability analysis for lending products using statistical modeling, A/B testing, and scenario analysis across Brazilian and regional operations",
        },
        {
          text: "Developed automated executive dashboards tracking customer behavior and profitability trends, presenting monthly strategic recommendations to senior leadership",
        },
      ],
      aiContext: {
        situation:
          "This was my first role focused on quantitative analysis at scale — moving from business analysis into pricing strategy for HSBC's Brazilian lending portfolio. The challenge was turning raw customer data into pricing decisions that balanced profitability with risk across a complex product set.",
        approach:
          "I built profitability models and automated reporting that gave leadership a clear, recurring view of customer economics. This was where I first learned to bridge analytical work with executive communication — translating data into strategic recommendations that non-technical stakeholders could act on.",
        outcome:
          "The dashboards and analysis I built became part of the team's regular decision-making rhythm. More importantly, this role cemented two skills that have defined my career since: the ability to automate analytical workflows rather than doing everything manually each cycle, and the habit of presenting data as a story to senior leadership, not just as numbers.",
      },
    },
    {
      id: "hsbc-brazil-ba",
      company: "HSBC Brazil",
      title: "Business Analyst, Credit Card Products",
      startDate: "2011",
      endDate: "2013",
      bullets: [
        {
          text: "Owned customer lifecycle analytics for the credit card portfolio, developing segmentation models and retention strategies",
        },
        {
          text: "Designed tracking systems supporting marketing and product initiatives, building the analytical foundation for data-driven decision-making in the division",
        },
      ],
      aiContext: {
        situation:
          "This is where my career in data began. I entered HSBC Brazil's credit card division as a business analyst, responsible for understanding how customers moved through the product lifecycle — acquisition, activation, usage, retention, and attrition.",
        approach:
          "I built segmentation models that grouped customers by behavior rather than demographics, and designed the tracking systems that let the marketing and product teams measure whether their initiatives were actually working. It was foundational work — learning to think in data, learning what questions matter, learning how a bank actually operates from the inside.",
        outcome:
          "The segmentation and tracking work I built here became part of the team's operating toolkit. For me personally, this was the starting point of a career spent making organizational data more useful — a thread that runs from credit card analytics in Curitiba through data governance in Vancouver to marketing measurement engineering today.",
      },
    },
  ],

  skills: [
    // Strong
    { name: "Data Governance & Quality Frameworks", level: "strong" },
    { name: "SQL & Data Engineering", level: "strong" },
    { name: "Marketing Analytics & Campaign Measurement", level: "strong" },
    { name: "Python Automation & Pipelines", level: "strong" },
    { name: "Executive Communication & C-Level Presentations", level: "strong" },
    { name: "Cross-functional Leadership", level: "strong" },
    { name: "Framework & Operating Model Design", level: "strong" },
    { name: "Metadata Management (Collibra, Informatica)", level: "strong" },
    { name: "Financial Services Domain (14 yrs)", level: "strong" },
    // Moderate
    { name: "Machine Learning / AI", level: "moderate" },
    { name: "Cloud Platforms (Snowflake, GCP)", level: "moderate" },
    { name: "Experiment Design & Statistical Testing", level: "moderate" },
    { name: "Financial Services Compliance", level: "moderate" },
    { name: "Visualization (Tableau, Plotly)", level: "moderate" },
    // Gaps
    { name: "Advanced Statistical Methods", level: "gap" },
    { name: "Product Management", level: "gap" },
    { name: "Frontend Development", level: "gap" },
    { name: "People Management (10+ reports)", level: "gap" },
  ],

  suggestedQuestions: [
    {
      text: "How does Andre's governance background actually make his analytics work better?",
    },
    {
      text: "What did Andre actually build at RBC? Walk me through the vintage engine.",
    },
    {
      text: "How has working across Brazil and Canada shaped Andre's approach?",
    },
    {
      text: "Where are Andre's honest gaps, and what's he doing about them?",
    },
  ],

  demoJobDescriptions: [
    {
      label: "Strong Fit Example",
      title: "Senior Manager, Data Governance & Analytics — Major Canadian Bank",
      description:
        "We are looking for a Senior Manager to lead our Data Governance & Analytics function within the enterprise data office. This role combines strategic governance oversight with hands-on analytics capability.\n\nKey responsibilities:\n- Design and maintain enterprise data governance frameworks, policies, and standards\n- Lead data quality improvement initiatives across customer, product, and transactional data domains\n- Build and manage automated data quality monitoring and reporting\n- Partner with Marketing, Risk, and Technology to translate data governance into analytics-ready assets\n- Manage metadata platforms (Collibra or equivalent) including data catalog, business glossary, and lineage\n- Present governance and analytics outcomes to VP and C-level stakeholders quarterly\n- Define critical data elements and ownership models across business units\n\nRequirements:\n- 8+ years in data governance, data quality, or analytics in financial services\n- Experience building or significantly expanding a governance function\n- Hands-on SQL, Python, and familiarity with governance platforms (Collibra, Informatica, Ataccama)\n- Strong executive communication skills\n- Experience with marketing analytics or campaign measurement is a strong asset\n- Bachelor's degree required; Master's or MBA preferred\n- CDMP or equivalent certification preferred",
    },
    {
      label: "Weak Fit Example",
      title: "Director of Product, Consumer Fintech",
      description:
        "We're hiring a Director of Product to lead our consumer-facing financial wellness app. You'll own the product roadmap, drive user growth, and ship features that help millions of users manage their finances.\n\nKey responsibilities:\n- Define and own the product vision, strategy, and 18-month roadmap\n- Lead a team of 12+ product managers, designers, and researchers\n- Drive user acquisition and retention metrics (DAU, activation, NPS)\n- Ship consumer features using agile methodology with 2-week sprint cycles\n- Partner with engineering on mobile (iOS/Android) and web platform development\n- Conduct user research, A/B testing at scale (100K+ users), and data-driven prioritization\n- Report to the CPO and present to the board quarterly\n\nRequirements:\n- 10+ years in product management, with 5+ in consumer fintech or financial wellness\n- Track record of shipping consumer mobile products at scale (1M+ users)\n- Experience managing product teams of 10+\n- Deep understanding of consumer behavior, growth loops, and retention mechanics\n- Technical fluency with mobile development, API architecture, and data infrastructure\n- MBA from a top-20 program strongly preferred\n- Experience with regulatory compliance in consumer financial products",
    },
  ],

  footerTagline:
    "Built to show depth that resumes compress. The interface is the proof.",
};
