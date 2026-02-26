# CLAUDE.md — AI-Powered Career Site

Read this file first when starting a new session on this project.

## What This Is

Interactive AI-powered career site for Andre Dantas. Dark-themed single page with:
- Hero section with name, title, status badge, tags
- Experience cards with expandable "View AI Context" (pre-written, not AI calls)
- Skills matrix: Strong / Moderate / Gaps (three columns)
- "Honest Fit Assessment" — paste a JD, get AI analysis via OpenRouter
- "Ask AI About Me" — chat modal with suggested questions, powered by OpenRouter

## How to Resume Work

1. Read `PROJECT.md` for current status and what's next
2. Run `npm run dev` to start the dev server
3. Career content is in `lib/career-data.ts` — this is the single source of truth
4. Design specs are in `design/` — check tokens and component docs before changing visuals

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**
- **shadcn/ui** (new-york style, lucide icons)
- **OpenRouter API** for AI features (key in `.env.local`)
- Fonts: Playfair Display (serif/display), Geist (sans), Geist Mono (mono)

## Key Files

| File | Purpose |
|---|---|
| `app/page.tsx` | Main page, wires all components together |
| `app/layout.tsx` | Root layout, fonts, metadata, forced dark theme |
| `app/globals.css` | Theme variables (colors, radii, spacing) |
| `lib/career-data.ts` | ALL career content — types + data |
| `lib/openrouter.ts` | OpenRouter API client |
| `lib/prompts/chat-system.ts` | System prompt for "Ask AI" chat |
| `lib/prompts/fit-system.ts` | System prompt for fit assessment |
| `app/api/chat/route.ts` | Chat API endpoint |
| `app/api/fit/route.ts` | Fit assessment API endpoint |
| `design/` | Design system: tokens, component specs, reference screenshots |

## Design System

- **Dark-only** site (class="dark" on html element)
- Background: `#0a0a0a`, Cards: `#141414`, Borders: `#2a2a2a`
- Accent: teal (`#2dd4bf`), hover: `#14b8a6`
- Text: `#f5f5f5` (primary), `#a3a3a3` (muted)
- Skills: teal-tinted (strong), neutral (moderate), amber-tinted (gaps)
- See `design/tokens/` for full specs

## Commands

```bash
npm run dev     # Start dev server (localhost:3000)
npm run build   # Production build
npm run lint    # ESLint
```

## Andre's Constraints

- Has OpenRouter API key (needs to add to `.env.local`)
- Claude Max subscription — subagents use Sonnet/Haiku via Task tool
- WSL2 on ARM Windows
- Deployment target: Vercel free tier

## Important Patterns

- All content comes from `lib/career-data.ts` — never hardcode content in components
- "View AI Context" is NOT an API call — it's pre-written content that expands client-side
- AI features (chat, fit) go through OpenRouter via the API routes
- Components use shadcn/ui primitives from `components/ui/`
- Custom components are in `components/` (no ui/ prefix)
