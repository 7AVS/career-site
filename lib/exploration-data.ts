// Career Data — Single source of truth for Andre's AI-powered career site.
// Components, system prompts, and API routes all read from this file.

export const profile = {
  name: "Andre Santos",
  initials: "AVS",
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
  bio: "I've spent 14 years in global banking learning one thing: data only matters if you can trust it, and trusted data only matters if you use it.",
  links: {
    linkedin: "https://linkedin.com/in/andre-v-santos",
    email: "avas.andre@gmail.com",
  },
};

export interface AIContext {
  situation: string;
  approach: string;
  keyDecision?: string;
  outcome: string;
  lesson: string;
}

export interface Role {
  company: string;
  title: string;
  dates: string;
  bullets: string[];
  aiContext: AIContext;
}

export const roles: Role[] = [
  {
    company: "RBC",
    title: "Marketing Analytics Manager",
    dates: "Oct 2024 – Present",
    bullets: [
      "Designed and built an automated vintage curve measurement engine integrating RBC's 4-layer semantic framework (SuperFact), producing daily test/control lift calculations with confidence intervals across 6 campaign types serving 5M+ clients",
      "Architected campaign measurement infrastructure with 59 documented configuration points, enabling scalable onboarding of new campaigns with clear data lineage from experiment setup through client outcome",
      "Built a standardized success metrics library — campaign taxonomy, measurement definitions, and cataloged data assets — establishing a single source of truth for payment products analytics",
    ],
    aiContext: {
      situation:
        "I joined RBC's marketing analytics team during a period of significant organizational change. The entire leadership chain above me was new — new VP, new Senior Director, new Director. The team's mandate was shifting from ad-hoc deep-dive analysis toward building a repeatable, automated measurement capability. There was no existing framework for systematically measuring campaign performance across different Visa payment product types.",
      approach:
        "Rather than waiting for direction, I spent the first months learning RBC's data ecosystem on my own — mapping how experiment metadata, campaign definitions, success logic, and client journey data connected across the organization's SuperFact semantic framework. Once I understood the full picture, I volunteered to lead the vintage automation project: building a Python/PySpark engine that would consume all four data layers and produce daily measurement outputs with statistical rigor.",
      keyDecision:
        "I chose to build the measurement engine as a self-sufficient system with dual delivery tracks: one feeding into the official Tableau/reporting channel, and one producing standalone HTML/Plotly outputs. This meant the work could demonstrate value immediately without waiting for infrastructure approvals, while still being designed for eventual integration into the enterprise reporting stack.",
      outcome:
        "The vintage automation engine is now the team's core measurement asset, covering six Visa payment campaign types. It produces daily vintage curves, lift calculations, and confidence intervals that feed directly into quarterly executive presentations. The 59-point configuration documentation I created became the foundation for the team's technical onboarding, enabling new members to contribute within their first week.",
      lesson:
        'Building something tangible changes conversations. When I had documentation and working code to show, the discussion shifted from "what should we do?" to "how do we scale this?" — letting the work speak made it easier to earn trust and influence direction without needing to claim authority.',
    },
  },
  {
    company: "RBC",
    title: "Senior Data Quality Analyst",
    dates: "Apr 2024 – Oct 2024",
    bullets: [
      "Designed data quality frameworks across enterprise systems during the post-acquisition integration of HSBC Canada into RBC, bridging two distinct governance standards",
      "Evaluated governance tooling through proof-of-concept assessments (Informatica, Ataccama) with documented scoring criteria to inform enterprise platform decisions",
      "Built automated monitoring and executive reporting linking data quality metrics to business impact across merged data domains",
    ],
    aiContext: {
      situation:
        "When RBC completed its acquisition of HSBC Canada, the two organizations had fundamentally different data governance infrastructures. I was absorbed into RBC's Data Management Office with a clear challenge: help integrate the data quality standards I had built at HSBC into RBC's existing enterprise framework — without disrupting either system during the transition.",
      approach:
        "I leveraged my deep knowledge of HSBC's governance architecture (which I had built from scratch over 7 years) to map where the two systems aligned and where they conflicted. I ran structured POC evaluations of quality tooling platforms, creating scoring criteria that gave leadership an objective basis for platform decisions.",
      outcome:
        "The framework I designed allowed the integration to proceed without degrading data quality on either side. The tooling evaluation informed platform strategy decisions at the enterprise level. More personally, this role confirmed that my governance skills were immediately transferable to a new organization.",
      lesson:
        "Transitions are where governance proves its value most clearly. When two systems merge, the people who understand data at the structural level — not just the surface — become essential.",
    },
  },
  {
    company: "HSBC Canada",
    title: "Lead Data Analyst, Data Governance",
    dates: "Feb 2017 – Apr 2024",
    bullets: [
      "Built HSBC Canada's enterprise data governance function from inception — frameworks, policies, standards, and monitoring controls aligned with global HSBC requirements, achieving 40% improvement in data quality scores",
      "Designed the operating model defining data ownership, stewardship, and accountability across Technology, Compliance, Risk, and Business — then secured executive buy-in for multi-million dollar transformation initiatives through C-level presentations",
      "Deployed Collibra for metadata management (catalog, glossary, lineage) serving 200+ stakeholders and implemented Informatica-based automated quality rules across customer, product, and transactional domains",
    ],
    aiContext: {
      situation:
        "When I arrived at HSBC Canada, there was no data governance function. Not underdeveloped — nonexistent. The organization needed frameworks, policies, quality controls, ownership models, and tooling, all aligned with global HSBC standards. This was not a maintenance role. It was a build-from-scratch mandate.",
      approach:
        "I started by defining what governance needed to look like for HSBC Canada specifically — not just copying a global template, but designing an operating model that fit the local organization's structure. On the tooling side, I deployed Collibra as the metadata management platform and implemented automated data quality rules through Informatica. The hardest part was organizational, not technical — facilitating cross-functional governance councils and learning to present the business case to executives who needed to see ROI.",
      keyDecision:
        "Early on, I had to decide whether to pursue a top-down approach (get executive mandate first, then implement) or a bottom-up approach (demonstrate value in one domain, then expand). I chose bottom-up — proving the impact of governance through measurable quality improvements in targeted data domains before asking for broader organizational commitment.",
      outcome:
        "Over seven years, the function I built became a core part of how HSBC Canada managed its data. Quality scores improved by 40%. The Collibra platform served over 200 stakeholders. The governance council became an established cross-functional forum.",
      lesson:
        "Building something from nothing teaches you that the technical work is maybe 30% of the challenge. The other 70% is organizational — getting people to care, aligning incentives, earning trust from teams that didn't ask for governance and aren't sure they want it.",
    },
  },
  {
    company: "HSBC Brazil",
    title: "Pricing Analyst",
    dates: "Oct 2013 – Dec 2016",
    bullets: [
      "Led customer profitability analysis for lending products using statistical modeling, A/B testing, and scenario analysis across Brazilian and regional operations",
      "Developed automated executive dashboards tracking customer behavior and profitability trends, presenting monthly strategic recommendations to senior leadership",
      "Collaborated with Finance, Risk, and Product teams on pricing strategies that balanced growth targets with risk appetite",
    ],
    aiContext: {
      situation:
        "This was my first role focused on quantitative analysis at scale — moving from business analysis into pricing strategy for HSBC's Brazilian lending portfolio.",
      approach:
        "I built profitability models and automated reporting that gave leadership a clear, recurring view of customer economics. This was where I first learned to bridge analytical work with executive communication.",
      outcome:
        "The dashboards and analysis I built became part of the team's regular decision-making rhythm. This role cemented two skills that have defined my career since: the ability to automate analytical workflows and the habit of presenting data as a story to senior leadership.",
      lesson:
        "Automation isn't about replacing people — it's about freeing them to think instead of compute. Once the reporting ran itself, the conversations shifted to strategy.",
    },
  },
  {
    company: "HSBC Brazil",
    title: "Business Analyst, Credit Card Products",
    dates: "Nov 2011 – Oct 2013",
    bullets: [
      "Owned customer lifecycle analytics for the credit card portfolio, developing segmentation models and retention strategies",
      "Designed tracking systems supporting marketing and product initiatives, building the analytical foundation for data-driven decision-making in the division",
    ],
    aiContext: {
      situation:
        "This is where my career in data began. I entered HSBC Brazil's credit card division as a business analyst, responsible for understanding how customers moved through the product lifecycle.",
      approach:
        "I built segmentation models that grouped customers by behavior rather than demographics, and designed the tracking systems that let marketing and product teams measure whether their initiatives were actually working.",
      outcome:
        "The segmentation and tracking work I built here became part of the team's operating toolkit. For me personally, this was the starting point of a career spent making organizational data more useful.",
      lesson:
        "The best analytics work doesn't just answer questions — it changes which questions people think to ask.",
    },
  },
];

export const skills = {
  strong: [
    "Data Governance & Quality Frameworks",
    "SQL & Data Engineering (PySpark, Spark, Teradata)",
    "Marketing Analytics & Campaign Measurement",
    "Python Automation & Pipeline Development",
    "Executive Communication & C-Level Presentations",
    "Cross-functional Leadership & Stakeholder Alignment",
    "Framework & Operating Model Design",
    "Metadata Management (Collibra, Informatica)",
    "Financial Services Domain (14 years)",
  ],
  moderate: [
    "Machine Learning / AI (Vector Institute bootcamp)",
    "Cloud Platforms (Snowflake, GCP)",
    "Experiment Design & Statistical Testing",
    "Financial Services Compliance (FINTRAC, PIPEDA)",
    "Visualization (Tableau, Plotly, Qlik)",
  ],
  gaps: [
    "Advanced Statistical Methods (Bayesian, causal inference)",
    "Product Management",
    "Frontend Development",
    "People Management at Scale (10+ direct reports)",
  ],
};

export const education = [
  {
    institution: "FGV — Fundação Getulio Vargas",
    degree: "MBA",
    field: "AI & Analytics Applied to Business",
    startYear: "2026",
    endYear: "2027",
    status: "in-progress" as const,
    note: "Brazil's #1 ranked business school. Live program combining AI/ML methods with business strategy and analytics leadership.",
  },
];

export const suggestedQuestions = [
  "What's the thread connecting Andre's career — governance to analytics?",
  "Tell me about building HSBC Canada's governance function from scratch.",
  "What did Andre actually build at RBC? Walk me through the vintage engine.",
  "Where are Andre's honest gaps, and what's he doing about them?",
];

export const demoJobDescriptions = [
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
];

export const footerTagline =
  "Built to show depth that resumes compress. The interface is the proof.";
