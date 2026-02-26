# PROJECT — AI-Powered Career Site

**Status:** Phase 5 Complete — Deployed to Vercel. Live at https://career-site-7avs-projects.vercel.app

---

## What This Is

An interactive AI-powered career site for Andre Santos. Replaces the traditional resume with a queryable experience: hiring managers can explore Andre's background, ask AI questions, and get honest fit assessments against their job descriptions.

Inspired by Nate B. Jones's "Marcus Chen" demo. Reference material in `design/reference/` and `reference-video-transcript.md`.

## Current Phase

### Phase 1: Foundation (COMPLETE)
- [x] Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui initialized
- [x] Career data types and content in `lib/exploration-data.ts`
- [x] OpenRouter API client in `lib/openrouter.ts`
- [x] System prompts for chat and fit assessment in `lib/prompts/`
- [x] API routes: `/api/chat` and `/api/fit`
- [x] Dark theme configured

### Phase 2: Content & Design Exploration (COMPLETE)
- [x] Career content populated and coach-audited
- [x] Two design directions explored (Teal vs Vault)
- [x] **Vault (dark navy + gold) selected** as final design

### Phase 3: Static Site Polish (COMPLETE)
- [x] Mobile-responsive hamburger navbar
- [x] Mobile-optimized Ask AI modal (full-screen, pinned input)
- [x] Cleaned up unused fonts, variables, orphaned components

### Phase 4a: AI Wiring (COMPLETE)
- [x] Fit Assessment textarea wired to `/api/fit`
- [x] Ask AI modal wired to `/api/chat`
- [x] Loading states, error handling, mock responses for testing
- [x] OpenRouter integration working with free model (`arcee-ai/trinity-large-preview:free`)

### Phase 4b: AI Guardrails & Security (COMPLETE)
- [x] System prompts hardened with anti-injection + topic-fencing rules
- [x] Input validation: chat 1000 chars / 20 messages, fit 5000 chars
- [x] Role sanitization (strips injected `system` role messages)
- [x] Sliding-window rate limiter (10 req/min/IP, in-memory)
- [x] Origin validation (blocks direct cURL/Postman abuse)
- [x] Client-side maxLength + character count on inputs
- [x] Smarter mock responses with keyword matching

### Phase 4c: Cleanup (COMPLETE)
- [x] Consolidated all data into `lib/exploration-data.ts` (single source of truth)
- [x] Deleted `lib/career-data.ts` (old Phase 1 data file)
- [x] Deleted `app/1/` and `app/2/` (old design explorations)
- [x] Deleted `content/` (source material, now in exploration-data.ts)
- [x] Deleted `design/trasncript.txt` (orphaned)

### Phase 5: Deploy (COMPLETE)
- [x] Push to GitHub (`7AVS/career-site`, private repo)
- [x] Vercel account + project setup (Hobby plan, auto-deploy from GitHub)
- [x] Environment variables: `OPENROUTER_API_KEY` set in Vercel
- [x] Live URL working: https://career-site-7avs-projects.vercel.app
- [ ] Choose production model (free model works, paid model gives better quality)
- [ ] Custom domain (optional — `andreavs.dev` not yet purchased)

---

## Design Decision

**Selected: Vault (Design 2)** — Dark navy (#070B14) background with gold (#C8A961) accents. Fonts: Cormorant Garamond (serif/display), Outfit (body), JetBrains Mono (dates/code). Minimal, editorial aesthetic.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (new-york style) |
| AI/LLM | OpenRouter API (free model for testing, configurable) |
| Deployment | Vercel (planned) |
| Data | Static TypeScript (`lib/exploration-data.ts`) |

## How to Run

```bash
cd sites/resume
npm run dev
# Opens at http://localhost:3000
```

## File Map

```
app/page.tsx              ← Main page (Vault design, all components inline)
app/layout.tsx            ← Root layout, metadata, dark theme (minimal)
app/globals.css           ← Tailwind base (no theme conflicts)
app/api/chat/route.ts     ← AI chat endpoint (guarded)
app/api/fit/route.ts      ← Fit assessment endpoint (guarded)
components/ui/            ← shadcn/ui primitives
lib/exploration-data.ts   ← ALL career content (single source of truth)
lib/openrouter.ts         ← OpenRouter API client
lib/api-guard.ts          ← Input validation, rate limiting, origin check
lib/prompts/              ← System prompts for AI features
lib/mock-responses.ts     ← Mock responses for testing without API key
design/                   ← Design system documentation
```
