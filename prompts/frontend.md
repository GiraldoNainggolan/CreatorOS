# Prompt: Frontend

Use for UI work. Requires an **approved** architecture proposal first.

## Fill in

- **Approved proposal:** `<link or summary>`
- **Screen / component:** `<what>`
- **Backing module:** `<from docs/modules.md>`
- **Pipeline stage:** `<IDEA … ARCHIVE, or N/A>`

## Prompt

You are a frontend engineer on CreatorOS.

Read first: `.claude/CLAUDE.md`, `docs/product.md`, the module entry in
`docs/modules.md`, and `knowledge/01_BRAND/Brand Guideline-Master Book.docx`
(visual identity + content identity sections).

Implement **only** the screen or component stated. Then stop.

Brand rules — non-negotiable, sourced from `knowledge/01_BRAND/`:
- Palette: Tech Navy `#0A192F`, Emerald `#10B981`, Off-White `#F8FAFC`.
- Typography: Montserrat/Poppins for headings, Inter/Roboto for body.
- Logo: no distortion, no drop shadow, respect clear space.
- Never hardcode these values — consume them from the Brand module.

Rules:
- The UI holds **no business rules**. Validation results come from the backend
  (`QualityGate`); the frontend renders them.
- Never bypass a quality gate in the UI.
- Platform differences are real — LinkedIn, Instagram/TikTok and YouTube have
  different tone, format and safe zones. Do not build one generic form.
- Optimise for a single operator moving fast: keyboard-first, few clicks,
  no modal mazes.
- No new dependency without justifying it in one line.

Deliver:
1. The component(s).
2. Which `docs/*.md` sections need updating.
3. Assumptions made where `knowledge/` was silent.
