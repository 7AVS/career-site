# PROJECT — AI-Powered Career Site

**Status:** Phase 1 Complete — Foundation built

---

## What This Is

An interactive AI-powered career site for Andre Dantas. Replaces the traditional resume with a queryable experience: hiring managers can explore Andre's background, ask AI questions, and get honest fit assessments against their job descriptions.

Inspired by Nate B. Jones's "Marcus Chen" demo. Reference material in `design/reference/` and `reference-video-transcript.md`.

## Current Phase

### Phase 1: Foundation (COMPLETE)
- [x] Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui initialized
- [x] All component files created (Navbar, Hero, Experience, SkillsMatrix, FitAssessment, AskAIModal, Footer)
- [x] Career data types defined with placeholder content in `lib/career-data.ts`
- [x] OpenRouter API client in `lib/openrouter.ts`
- [x] System prompts for chat and fit assessment in `lib/prompts/`
- [x] API routes: `/api/chat` and `/api/fit`
- [x] Dark theme configured matching reference design
- [x] Design knowledge base created in `design/`
- [x] Build passes, all routes registered

### Phase 2: Content Collection (NEXT)
Andre needs to fill in:
- [ ] Each role: company, title, dates, 3 bullet points, detailed AI context story
- [ ] Skills: review Strong / Moderate / Gaps categorization
- [ ] Bio / headline / status badge text
- [ ] Social links (LinkedIn, GitHub, email)
- [ ] 4 suggested questions for AI chat
- [ ] 2 demo job descriptions (one strong fit, one weak fit)
- [ ] OpenRouter API key in `.env.local`

### Phase 3: Static Site (after content)
- [ ] Visual polish — match reference design pixel-level
- [ ] Responsive design testing
- [ ] Typography refinement
- [ ] Animation/transitions

### Phase 4: AI Features
- [ ] Test OpenRouter integration end-to-end
- [ ] Tune system prompts
- [ ] Error handling and loading states

### Phase 5: Deploy
- [ ] Vercel account + project setup
- [ ] Environment variables configured
- [ ] Live URL working

---

## Open Decisions

1. **Font choice:** Currently using Playfair Display (serif) + Geist (sans). May want to adjust after seeing it live.
2. **Model choice:** Default is `anthropic/claude-haiku` via OpenRouter. Cheap (~$0.001/conversation). Can upgrade if needed.
3. **Andre's photo:** Not currently included. Could add to hero section.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (new-york style) |
| AI/LLM | OpenRouter API (Claude Haiku) |
| Deployment | Vercel (planned) |
| Data | Static TypeScript (`lib/career-data.ts`) |

## How to Run

```bash
cd sites/resume
npm run dev
# Opens at http://localhost:3000
```

## File Map

```
app/page.tsx           ← Main page, connects all components
app/layout.tsx         ← Root layout, fonts, metadata, dark theme
app/globals.css        ← Tailwind + shadcn theme variables
app/api/chat/route.ts  ← AI chat endpoint
app/api/fit/route.ts   ← Fit assessment endpoint
components/            ← All UI components
lib/career-data.ts     ← ALL career content (edit here)
lib/openrouter.ts      ← OpenRouter API client
lib/prompts/           ← System prompts for AI features
design/                ← Design system documentation
```
