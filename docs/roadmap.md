# Roadmap

Sequenced by dependency, not by ambition. Each phase is shippable on its own.
Nothing here is started until the architecture in `docs/architecture.md` is
approved and the blocking questions in `docs/context.md` are answered.

**Status legend:** `☐` not started · `◐` in progress · `☑` done

## Phase 1 — Workspace Initialization (current)

`☑` Knowledge base analysed, gaps recorded in `docs/context.md`
`☑` `docs/`, `prompts/`, `infrastructure/`, `.claude/CLAUDE.md`, `README.md`
`☐` Blocking questions Q1, Q2 answered
`☐` Architecture proposal reviewed and approved
`☐` Stack, hosting and repo conventions ratified as ADRs

**Exit criterion:** an approved `docs/architecture.md` with no `PROPOSED` markers.

## Phase 2 — Reference Data

The library layer. Read-mostly, no workflow yet. Everything later depends on it.

- Brand: palette, typography, voice vocabulary + banned-word list, QA checklists
- Audience: personas, pain points, dreams
- Content System: pillars, hook library, CTA library, storytelling frameworks, formats
- Platforms and their per-platform rules

**Value:** the brand system becomes queryable instead of living in `.docx` files.
**Sources:** `knowledge/01_BRAND`, `02_AUDIENCE`, `03_CONTENT_SYSTEM`.

## Phase 3 — Idea → Script

The first vertical slice of the pipeline, and the highest daily-value one.

- Idea bank, tagged by pillar + persona pain point
- Research notes, keywords, references
- Hook selection from the library
- Script editor with framework scaffold (PAS first) and vocabulary guard
- Lifecycle: Draft → Ready → Published
- Per-part fields: hook, opening, closing, CTA, caption, subtitle, voice-over

**Blocked by:** Q2 (`04_SCRIPT.docx` is unreadable — lifecycle rules unknown).
**Sources:** `knowledge/03_CONTENT_SYSTEM`, `04_SCRIPT`.

## Phase 3 — Production Log

Replaces `Recording Dashboard.xlsx`.

- Recording sessions, shot lists, equipment + camera presets
- Raw footage log, screen-recording catalogue, B-roll library, thumbnail library
- `_METADATA.txt` template as structured fields
- Backup tracker (3-2-1: SSD / HDD / Cloud)

**Blocked by:** Q5 (catalogue vs. store).
**Source:** `knowledge/05_RECORDING/05_RECORDING.docx`.

## Phase 4 — Post-Production Log

Replaces `Editing Dashboard.xlsx`.

- Editing queue and project tracker
- Asset library index (music, SFX, fonts, icons, LUTs, overlays)
- Export pipeline: Draft → Review → Revision → Final → Published → Archive
- Naming convention enforcement `YYYYMMDD_PLATFORM_TITLE_VERSION`
- Revision tracker with timecodes

**Source:** `knowledge/06_EDITING/06_EDITING.docx`.

## Phase 5 — Publish & QA Gate

- Caption / hashtag / SEO keyword sets per platform
- Thumbnail blueprint compliance check
- Blocking QA checklist before `Published`
- Publish record: platform, URL, timestamp

**Blocked by:** Q3 (API publishing vs. manual tracking).

## Phase 6 — Analytics & Repurpose

Closes the loop the Content OS describes.

- Per-post metrics, top-performing posts, most-saved topics
- Monthly insight report
- Repurpose: derive child items from a published parent
- Archive with backup verification

**Blocked by:** Q4 (metric source).

## Deferred — needs a business decision first

| Item | Gate |
|---|---|
| Multi-user / roles / tenancy | Q1 |
| Client & project management | Q6 |
| Monetisation, packages, invoicing | Q6 |
| AI assist (hook generation, script drafting) | Not in any approved domain — requires owner approval |
