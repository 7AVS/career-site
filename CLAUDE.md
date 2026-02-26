# CLAUDE.md — AI-Powered Career Site

Read this file first when starting a new session on this project.

## What This Is

Interactive AI-powered career site for Andre Santos. Dark-themed single page ("Vault" design) with:
- Hero section with name, title, status badge, tags
- Experience cards with expandable "View AI Context" (pre-written, not AI calls)
- Skills matrix: Strong / Moderate / Gaps (three columns)
- "Honest Fit Assessment" — paste a JD, get AI analysis via OpenRouter (live)
- "Ask AI About Me" — chat modal with suggested questions, powered by OpenRouter (live)

## How to Resume Work

1. Read `PROJECT.md` for current status and what's next
2. Run `npm run dev` to start the dev server
3. Career content is in `lib/exploration-data.ts` — this is the single source of truth
4. Design specs are in `design/` — check tokens and component docs before changing visuals

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**
- **shadcn/ui** (new-york style, lucide icons) — UI primitives in `components/ui/`
- **OpenRouter API** for AI features (key in `.env.local`, currently using free model)
- Fonts: Cormorant Garamond (serif/display), Outfit (body/UI), JetBrains Mono (dates/code)

## Key Files

| File | Purpose |
|---|---|
| `app/page.tsx` | Self-contained page (~1400 lines, all components inline) |
| `app/layout.tsx` | Minimal root layout — metadata + dark theme, no font imports |
| `app/globals.css` | Tailwind base only — no theme variables (Vault uses inline CSS vars) |
| `lib/exploration-data.ts` | ALL career content — types + data (single source of truth) |
| `lib/openrouter.ts` | OpenRouter API client (model configured here) |
| `lib/api-guard.ts` | Input validation, rate limiting, origin checking |
| `lib/prompts/chat-system.ts` | System prompt for "Ask AI" chat (hardened) |
| `lib/prompts/fit-system.ts` | System prompt for fit assessment (hardened) |
| `lib/mock-responses.ts` | Mock responses when no API key is set |
| `app/api/chat/route.ts` | Chat API endpoint (guarded) |
| `app/api/fit/route.ts` | Fit assessment API endpoint (guarded) |
| `components/ui/` | shadcn/ui primitives |
| `design/` | Design system: tokens, component specs, reference screenshots |

## Design System (Vault)

- **Dark-only** site (class="dark" on html element)
- Background: `#070B14`, Surface: `#0E1320`, Borders: `#1A2035`
- Accent: gold (`#C8A961`), hover: `#D4BA7A`
- Text: `#E8E4DF` (primary), `#8B8A88` (secondary), `#5A5957` (muted)
- Skills: gold-tinted (strong), neutral surface (moderate), rose-tinted (gaps)
- All design tokens are CSS variables set inline in `page.tsx` (`vaultVars` object)
- Fonts loaded via `next/font/google` in `page.tsx`, not `layout.tsx`

## Commands

```bash
npm run dev     # Start dev server (localhost:3000)
npm run build   # Production build
npm run lint    # ESLint
```

## Andre's Constraints

- Has OpenRouter API key (in `.env.local`)
- Claude Max subscription — subagents use Sonnet/Haiku via Task tool
- WSL2 on ARM Windows
- Deployment target: Vercel free tier

## Important Patterns

- All content comes from `lib/exploration-data.ts` — never hardcode content in components
- `page.tsx` is a self-contained monolith (~1400 lines) — all components are inline, not in `components/`
- "View AI Context" is NOT an API call — it's pre-written content that expands client-side
- AI features (chat, fit) go through OpenRouter via the guarded API routes
- API routes enforce: origin check → rate limit (10/min/IP) → input validation → response
- System prompts are hardened with anti-injection and topic-fencing rules
- Mock responses activate when `OPENROUTER_API_KEY` is not set (fallback for dev)
- Mobile: hamburger navbar below `sm:`, full-screen modal on mobile
- `globals.css` is minimal — no shadcn theme variables, no teal references, just Tailwind base + radii

## AI Security

- **Rate limiting**: 10 requests/minute per IP (in-memory, resets on cold start)
- **Origin check**: blocks requests without matching Origin/Referer header
- **Input limits**: chat 1000 chars/message, 20 messages max; fit 5000 chars
- **Role sanitization**: strips injected `system` role messages from chat history
- **Prompt hardening**: system prompts refuse to reveal instructions, stay on-topic, reject injection
- **Client-side**: maxLength on inputs, character counts shown near limits
