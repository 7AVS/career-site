# Front-End Design System

This folder is the source of truth for all visual design decisions. Every component, color, spacing choice, and interaction pattern should trace back to something documented here.

## Structure

```
design/
  README.md              ← You are here — design system overview
  reference/             ← Screenshots, inspiration, competitive examples
  components/            ← Component-level specs (layout, states, behavior)
  tokens/                ← Design tokens (colors, typography, spacing, etc.)
```

## Design Tokens

See `tokens/` for the definitive values. Quick reference:

| Token | Value | Notes |
|-------|-------|-------|
| **Background** | `#0a0a0a` → `#111111` | Near-black, not pure black |
| **Surface/Card** | `#1a1a1a` with `#2a2a2a` border | Subtle elevation via border |
| **Accent** | `#2dd4bf` (teal-400) | Used for CTAs, links, highlights |
| **Accent hover** | `#14b8a6` (teal-500) | Slightly darker on hover |
| **Text primary** | `#f5f5f5` | Off-white |
| **Text secondary** | `#a3a3a3` | Muted gray |
| **Text accent** | `#2dd4bf` | Teal for links and labels |
| **Strong card** | Teal-tinted bg | Green check marks |
| **Moderate card** | Neutral dark bg | Circle markers |
| **Gaps card** | Amber/gold-tinted bg | X markers, amber text |

## Typography

| Element | Style |
|---------|-------|
| Name (hero) | ~72px, serif or display font, white |
| Title | ~24px, teal, medium weight |
| Section headers | ~48px, serif, white |
| Body | 16px, sans-serif, gray-300 |
| Nav links | 14-16px, sans-serif, gray-300 |
| Card titles | ~20px, serif, white |
| Dates | 14px, monospace, gray-400 |
| Bullet points | 16px, gray-400, with teal arrow marker |

## Spacing & Layout

- Max content width: ~768px (centered)
- Section vertical padding: ~96-128px
- Card padding: ~32px
- Card border-radius: ~16px
- Card border: 1px solid #2a2a2a

## Interaction Patterns

| Pattern | Behavior |
|---------|----------|
| "View AI Context" | Click to expand/collapse. Teal sparkle icon + text. Chevron rotates. |
| "Ask AI" button | Opens modal overlay. Dark backdrop. |
| Suggested questions | Click to auto-fill and send. Dark card style. |
| Nav | Sticky on scroll. Appears after hero. Initials left, links right. |
| Status badge | Green dot + text, pill shape, subtle border |
| Fit Assessment | Textarea for JD paste. "Strong Fit" / "Weak Fit" demo buttons. |

## Reference Material

- `reference/` — screenshots from Marcus Chen demo
- `../reference-video-transcript.md` — full video transcript with design rationale
