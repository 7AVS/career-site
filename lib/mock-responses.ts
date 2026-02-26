// Mock responses for testing AI features without API calls.
// Used when OPENROUTER_API_KEY is not set.

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ── Fit Assessment Mocks ──

const fitResponses: Record<string, string> = {
  "Senior Manager, Data Governance & Analytics": `**Fit Level:** Strong Fit

**What Aligns:**
- 7 years building HSBC Canada's data governance function from scratch — frameworks, policies, quality controls, ownership models — maps directly to the core mandate
- Hands-on Collibra deployment (catalog, glossary, lineage) serving 200+ stakeholders matches the metadata platform requirement exactly
- Informatica-based automated quality rules across customer, product, and transactional domains is a direct match
- C-level presentation experience securing multi-million dollar buy-in demonstrates the executive communication requirement
- Marketing analytics work at RBC (vintage curves, campaign measurement) provides the analytics capability the hybrid role needs
- 14 years in financial services, entirely in banking, exceeds the 8+ year requirement
- Python automation, SQL/PySpark engineering, and pipeline development cover the technical requirements
- Currently pursuing MBA at FGV (AI & Analytics focus) addresses the "Master's or MBA preferred" qualification

**What Doesn't Align:**
- No formal CDMP certification (listed as preferred, not required)
- Direct report management has been informal/project-based rather than formal team leadership of 10+
- The role asks for defining critical data elements — Andre has done this, but at a single-entity scale (HSBC Canada), not multi-entity enterprise

**What Transfers:**
- The cross-functional governance council facilitation at HSBC demonstrates stakeholder management skills that transfer directly to the partnership requirements with Marketing, Risk, and Technology
- Building the governance function bottom-up (proving value first, then scaling) shows the change management capability implied by the role

**Recommendation:**
This is the closest thing to a role designed for Andre's exact background. The combination of governance-from-scratch experience, enterprise tooling deployment, executive communication, and now marketing analytics capability maps to every major requirement. The main gap (formal people management at scale) is real but manageable — the organizational influence and cross-functional leadership track record partially compensates. Andre should be a top-tier candidate for this role.`,

  "Director of Product, Consumer Fintech": `**Fit Level:** Weak Fit

**What Aligns:**
- Data-driven decision-making experience — Andre understands how to use data to inform strategy, which is relevant to product decisions
- Financial services domain knowledge (14 years in banking) provides context for fintech products
- Executive communication skills transfer to board presentations and CPO reporting
- Experience with A/B testing and experiment design at RBC (campaign measurement) partially maps to product experimentation

**What Doesn't Align:**
- No product management experience — this is a Director-level PM role requiring 10+ years in product, with 5+ in consumer fintech
- No experience shipping consumer mobile products (iOS/Android) or managing product roadmaps
- No experience managing teams of 10+ product managers, designers, and researchers
- No consumer-facing product experience — Andre's career has been entirely in internal enterprise banking functions
- No experience with user acquisition, retention mechanics, growth loops, or DAU/NPS metrics
- No mobile development or API architecture technical fluency from the product side
- The role requires MBA from a top-20 program — Andre's MBA is in-progress at FGV (top in Brazil, but not on the typical North American top-20 list)

**What Transfers:**
- The governance-to-analytics career arc shows Andre can learn new domains and build things from scratch, but the distance to consumer product management is significant
- Statistical testing and measurement skills transfer conceptually but not at the consumer product scale (100K+ users)
- Dashboard and reporting experience provides some data literacy overlap, but the product management skillset is fundamentally different

**Recommendation:**
This is not a realistic fit. The role requires deep consumer product management experience that Andre simply doesn't have. His strengths are in data governance, analytics engineering, and enterprise measurement — all valuable, but in a completely different domain. Applying here would be a career pivot, not a natural next step, and at the Director level, companies expect domain expertise, not potential. Andre should focus on roles that leverage his governance + analytics combination rather than attempting to enter product management at a senior level.`,
};

function matchFitResponse(jobDescription: string): string {
  // Check if the JD contains one of our demo titles
  for (const [title, response] of Object.entries(fitResponses)) {
    if (jobDescription.includes(title)) {
      return response;
    }
  }

  // Generic moderate-fit response for any other JD
  return `**Fit Level:** Moderate Fit

**What Aligns:**
- 14 years of progressive experience in financial services data roles demonstrates deep domain expertise
- Strong analytical and data engineering skills (SQL, Python/PySpark, automated pipelines) are broadly applicable
- Executive communication experience — presenting to C-level stakeholders and securing buy-in for initiatives
- Cross-functional leadership across Technology, Compliance, Risk, and Business units
- Track record of building things from scratch (governance function at HSBC, measurement engine at RBC)

**What Doesn't Align:**
- The specific domain requirements of this role may not align perfectly with Andre's governance + analytics combination
- Formal people management experience at scale (10+ direct reports) is limited
- Some technical requirements may fall outside Andre's core toolkit depending on the specific stack

**What Transfers:**
- Andre's ability to enter unfamiliar environments and build structured systems is well-documented across multiple roles
- The governance mindset — understanding data at the structural level — provides a foundation that transfers across data-adjacent roles
- Campaign measurement and statistical testing experience at RBC adds analytical credibility beyond pure governance

**Recommendation:**
There are meaningful overlaps between Andre's experience and this role, particularly in data leadership and analytical capability. The fit depends heavily on how much weight the hiring team places on the specific domain experience versus transferable skills. Andre's strongest positioning is at the intersection of trusted data and applied analytics — roles that value both governance rigor and hands-on measurement capability will see the clearest match. Worth exploring if the team values a builder who can work across data quality and analytics.`;
}

export async function getMockFitAssessment(
  jobDescription: string
): Promise<string> {
  await delay(800);
  return matchFitResponse(jobDescription);
}

// ── Chat Mocks ──

const chatResponses: Record<string, string> = {
  "What's the thread connecting Andre's career — governance to analytics?": `The connecting thread is that Andre has always been focused on making organizational data actually useful — not just available, but trustworthy and actionable. The expression of that focus has evolved, but the core hasn't changed.

It started in Brazil with customer lifecycle analytics at HSBC — building segmentation models and tracking systems for credit card products. Then he moved into pricing analysis, where he learned to automate analytical workflows and present data as strategy to senior leadership. Those early roles taught him that data only matters if you can trust it and use it.

That insight led naturally to data governance at HSBC Canada, where he spent seven years building the governance function from scratch — the frameworks, policies, quality controls, and tooling (Collibra, Informatica) that made an entire division's data reliable. And now at RBC, he's taken that structural understanding of data and applied it to marketing analytics — building automated measurement systems that produce statistically rigorous campaign results. Most analytics people inherit clean data and never think about where it came from. Most governance people ensure quality but never touch the analysis. Andre does both, and that combination is where he wants to lead next.`,

  "Tell me about building HSBC Canada's governance function from scratch.": `When Andre arrived at HSBC Canada in 2017, there was no data governance function. Not underdeveloped — nonexistent. The organization needed everything: frameworks, policies, quality controls, ownership models, and tooling, all aligned with global HSBC standards.

Andre started by designing what governance needed to look like for HSBC Canada specifically — not copying a global template, but building an operating model that fit the local organization's structure. He mapped data ownership and stewardship responsibilities across Technology, Compliance, Risk, and Business units. On the technical side, he deployed Collibra as the metadata management platform (data catalog, business glossary, lineage documentation) and implemented Informatica-based automated quality rules across customer, product, and transactional data domains. He also had to make a strategic choice early on: top-down (get executive mandate first) versus bottom-up (prove value in one domain, then expand). He chose bottom-up — demonstrating measurable quality improvements in targeted domains before asking for broader commitment.

Over seven years, quality scores improved by 40%, the Collibra platform served over 200 stakeholders, and the governance council became an established cross-functional forum. Andre's key takeaway was that building from nothing taught him the technical work is about 30% of the challenge — the other 70% is organizational: getting people to care, aligning incentives, and earning trust from teams that didn't ask for governance.`,

  "What did Andre actually build at RBC? Walk me through the vintage engine.": `Andre joined RBC through the HSBC Canada acquisition — one of the largest bank mergers in recent Canadian history. After a few months in the Data Management Office helping integrate governance standards, he moved into Marketing Analytics, where the entire leadership chain was new and the team was shifting from ad-hoc analysis toward building repeatable, automated measurement capability.

The vintage automation engine is now the team's core measurement asset. It's a Python/PySpark system that integrates RBC's 4-layer semantic framework (called SuperFact) — consuming experiment metadata, campaign definitions, success logic, and client journey data to produce daily test/control lift calculations with statistical confidence intervals across six Visa payment campaign types serving over 5 million clients. Andre made a deliberate architectural choice: he built dual delivery tracks — one feeding into the official Tableau/reporting channel, and one producing standalone HTML/Plotly outputs. This meant the work could demonstrate value immediately without waiting for infrastructure approvals while still being designed for eventual enterprise integration.

Beyond the engine itself, Andre documented 59 configuration points across the measurement infrastructure, created a campaign taxonomy, built a success metrics library, and cataloged data assets — establishing a single source of truth for payment products analytics. The Director gave him the floor to present the architecture to the full team and began using it as the template for how measurement should work going forward.`,

  "Where are Andre's honest gaps, and what's he doing about them?": `Andre is transparent about four main gaps, and they're real — not the "I work too hard" kind of self-assessment.

**Advanced statistical methods** (Bayesian inference, causal inference) — Andre's statistical work has been applied and practical (A/B testing, confidence intervals, lift calculations), but he hasn't gone deep into the theoretical foundations. His experiment design is competent but not at the level of a PhD statistician. He's addressing this partly through his MBA at FGV, which covers AI/ML methods, and partly through the hands-on work at RBC where he's pushing into more rigorous measurement.

**Product management** — Andre has never been a product manager. His career has been in data roles within enterprise organizations, not consumer-facing product development. This isn't something he's actively trying to close because it's not the direction he wants to go.

**Frontend development** — This site notwithstanding (it was built with AI assistance), Andre is not a frontend developer. His engineering skills are in Python, PySpark, SQL, and data pipeline automation.

**People management at scale** — Andre has led cross-functional initiatives, facilitated governance councils, and influenced senior leadership, but he hasn't had 10+ direct reports. This is a real gap for Director-level roles that require formal team management. He's aware this is likely the gap that matters most for his next career step, and the MBA program is partly about building the leadership framework to close it.`,
};

function matchChatResponse(messages: Array<{ role: string; content: string }>): string {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUserMessage) return "I'd be happy to tell you about Andre's background. What would you like to know?";

  const question = lastUserMessage.content;

  // Check for exact or close matches to suggested questions
  for (const [key, response] of Object.entries(chatResponses)) {
    if (question === key || question.toLowerCase().includes(key.toLowerCase().slice(0, 30))) {
      return response;
    }
  }

  // Keyword-based fallback — detect topics and return relevant career snippets
  const q = question.toLowerCase();

  if (q.includes("leadership") || q.includes("leader") || q.includes("manage") || q.includes("team")) {
    return `Andre's leadership experience is primarily influence-based rather than formal people management. At HSBC Canada, he facilitated cross-functional governance councils bringing together Technology, Compliance, Risk, and Business stakeholders — earning buy-in without having direct authority over those teams. He secured multi-million dollar executive commitments through C-level presentations, which required translating technical governance outcomes into business language.

At RBC, he stepped into a team undergoing significant leadership change (new VP, Senior Director, and Director) and took initiative to build the vintage measurement engine without being asked. The Director gave him the floor to present the architecture to the full team and began using it as the template for how measurement should work. That said, Andre is transparent that formal people management at scale (10+ direct reports) is a genuine gap — he's addressed influence and stakeholder alignment, but hasn't yet held a role with a large direct team.`;
  }

  if (q.includes("governance") || q.includes("collibra") || q.includes("informatica") || q.includes("data quality")) {
    return `Data governance is the backbone of Andre's career. At HSBC Canada, he built the entire governance function from scratch over seven years — there was literally nothing when he arrived. He designed frameworks, policies, quality controls, and ownership models aligned with global HSBC standards. On the tooling side, he deployed Collibra for metadata management (catalog, business glossary, lineage documentation) serving 200+ stakeholders, and implemented Informatica-based automated quality rules across customer, product, and transactional domains.

His approach was deliberately bottom-up: rather than seeking an executive mandate first, he proved value in targeted data domains, measured quality improvements (40% improvement in scores), and then used those results to earn broader organizational commitment. The governance council he established became a sustained cross-functional forum. His key insight from this work: the technical implementation is about 30% of the challenge — the other 70% is organizational, getting people who didn't ask for governance to care about it.`;
  }

  if (q.includes("rbc") || q.includes("vintage") || q.includes("campaign") || q.includes("marketing analytics") || q.includes("measurement")) {
    return `At RBC, Andre moved from the Data Management Office (where he helped integrate HSBC's governance standards post-acquisition) into Marketing Analytics. The team was shifting from ad-hoc analysis toward building repeatable, automated measurement capability.

Andre's core contribution is the vintage automation engine — a Python/PySpark system that integrates RBC's 4-layer semantic framework (SuperFact). It consumes experiment metadata, campaign definitions, success logic, and client journey data to produce daily test/control lift calculations with statistical confidence intervals across six Visa payment campaign types serving 5M+ clients. He made a deliberate architectural choice: dual delivery tracks — one feeding official Tableau reporting, one producing standalone HTML/Plotly outputs for immediate value without waiting for infrastructure approvals.

Beyond the engine, he documented 59 configuration points, created a campaign taxonomy, built a success metrics library, and cataloged data assets — establishing a single source of truth for payment products analytics.`;
  }

  if (q.includes("hsbc") || q.includes("brazil") || q.includes("canada") || q.includes("acquisition") || q.includes("merger")) {
    return `Andre spent over a decade at HSBC across two countries. In Brazil (2011–2016), he started in credit card customer lifecycle analytics, building segmentation models and tracking systems, then moved into pricing analysis where he developed automated executive dashboards and learned to present data as strategy to senior leadership.

In Canada (2017–2024), he built HSBC Canada's enterprise data governance function from the ground up — seven years of designing frameworks, deploying Collibra and Informatica, facilitating governance councils, and securing executive buy-in for multi-million dollar initiatives. When RBC acquired HSBC Canada in one of the largest bank mergers in recent Canadian history, Andre was absorbed into RBC's Data Management Office, where he helped bridge two fundamentally different governance infrastructures. That transition confirmed that his governance skills were immediately transferable to a new organization.`;
  }

  if (q.includes("skill") || q.includes("python") || q.includes("sql") || q.includes("pyspark") || q.includes("technical") || q.includes("stack") || q.includes("tool")) {
    return `Andre's technical skills center on data engineering and automation. His strongest tools are SQL (across Teradata, Spark SQL, and traditional databases), Python (automation, pipeline development, data processing), and PySpark for large-scale data work at RBC. He has hands-on experience with Collibra (metadata management), Informatica (data quality automation), and visualization tools including Tableau, Plotly, and Qlik.

On the moderate side, he has exposure to cloud platforms (Snowflake, GCP), machine learning concepts (from a Vector Institute bootcamp), experiment design and statistical testing, and financial compliance frameworks (FINTRAC, PIPEDA). His honest gaps include advanced statistical methods (Bayesian inference, causal inference), frontend development, and product management — none of which are directions he's actively pursuing except statistics, which he's deepening through his MBA and hands-on work at RBC.`;
  }

  if (q.includes("gap") || q.includes("weakness") || q.includes("improve") || q.includes("lacking") || q.includes("missing")) {
    return `Andre is transparent about four main gaps — and they're real, not the "I work too hard" kind.

**Advanced statistical methods** — His statistical work has been applied and practical (A/B testing, confidence intervals, lift calculations), but he hasn't gone deep into Bayesian inference or causal inference. He's addressing this through his MBA at FGV and hands-on measurement work at RBC.

**Product management** — He has never been a product manager. His career has been in data roles within enterprise organizations. This isn't something he's actively trying to close because it's not his direction.

**Frontend development** — Not a frontend developer. His engineering skills are Python, PySpark, SQL, and data pipeline automation.

**People management at scale** — He's led cross-functional initiatives and influenced senior leadership, but hasn't had 10+ direct reports. This is likely the gap that matters most for Director-level roles, and the MBA is partly about building that leadership framework.`;
  }

  if (q.includes("mba") || q.includes("education") || q.includes("fgv") || q.includes("degree") || q.includes("university") || q.includes("studying")) {
    return `Andre holds a BBA from Fundação Getulio Vargas (FGV) in São Paulo, one of the top business schools in Latin America. He's currently pursuing an MBA at FGV with a focus on AI & Analytics, which is in progress. The MBA is partly about deepening his statistical and ML foundations, partly about building a leadership framework for the Director-level roles he's targeting, and partly about formal credentialing — several senior roles list "Master's or MBA preferred."

He also completed a Machine Learning bootcamp at the Vector Institute, which gave him exposure to ML/AI concepts beyond his applied analytics work. His education has been practical and career-aligned rather than purely academic.`;
  }

  if (q.includes("fit") || q.includes("role") || q.includes("looking for") || q.includes("next") || q.includes("target") || q.includes("ideal")) {
    return `Andre is open to Senior Manager or Director-level roles in three areas: Analytics, Data Governance, or hybrid roles that combine both. His strongest positioning is at the intersection of trusted data and applied analytics — roles that value both governance rigor and hands-on measurement capability.

The ideal role would leverage his unique combination: someone who can both ensure data is trustworthy at the structural level (governance, quality, metadata) AND use that data to produce actionable insights (campaign measurement, statistical testing, automated reporting). Most candidates offer one or the other. Andre's career arc from governance to analytics means he understands both sides.

His target industries are financial services (where he has 14 years of domain expertise) and adjacent sectors like insurance or fintech where regulatory data requirements create demand for governance-aware analytics leaders.`;
  }

  // Generic fallback for truly unmatched questions
  return `Andre's career spans 14 years in global banking — starting in customer analytics and pricing at HSBC Brazil, then building HSBC Canada's enterprise data governance function from scratch over seven years, and now leading marketing analytics measurement at RBC.

The thread connecting all of it is making data trustworthy and actionable. At HSBC he learned that data governance is mostly an organizational challenge, not a technical one. At RBC he's applying that structural understanding to build automated campaign measurement systems with statistical rigor.

If you have a more specific question about Andre's experience, skills, or fit for a particular type of role, I can give you a more detailed answer. You can ask about specific roles, the technologies he's worked with, his approach to leadership, or his honest gaps.`;
}

export async function getMockChatResponse(
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  await delay(800);
  return matchChatResponse(messages);
}
