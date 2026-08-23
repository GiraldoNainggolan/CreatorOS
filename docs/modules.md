# Modules

Eight modules: six mirroring the approved knowledge domains, plus two
cross-cutting ones. **No module may be added without a matching approved
business domain** (`.claude/CLAUDE.md`, rule 5).

Each entry states its knowledge source, what it owns, and what it must never own.

---

## Brand

**Knowledge:** `knowledge/01_BRAND/`
**Roadmap:** Phase 1

Owns the identity system as data: colour palette (`#0A192F`, `#10B981`,
`#F8FAFC`), typography hierarchy (Montserrat/Poppins headings, Inter/Roboto
body), logo clear-space rules, subtitle spec, thumbnail blueprint, carousel
layout, brand voice vocabulary and the banned-word list, and the two publication
QA checklists.

**Never owns:** content, scripts, or per-item decisions. Brand supplies rules;
other modules obey them.

---

## Audience

**Knowledge:** `knowledge/02_AUDIENCE/`
**Roadmap:** Phase 1 (personas) → Phase 6 (research inputs)

Owns personas (Mahasiswa, Fresh Graduate, Freelancer, Junior Programmer, Data
Analyst Beginner, Career Switcher, UMKM), their pain points and dreams, plus
audience research inputs: FAQ, comments, DMs, polls, surveys, competitor gaps,
viral keywords.

**Never owns:** individual audience members. There is no CRM here.

---

## Content System

**Knowledge:** `knowledge/03_CONTENT_SYSTEM/`
**Roadmap:** Phase 1 (libraries) → Phase 2 (idea bank)

Owns the ten content pillars (AI, Python, Laravel, Data Science, ML, GIS,
Career, Productivity, Freelancing, Personal Branding), the hook library by type,
the CTA library, storytelling frameworks (PAS, AIDA, BAB, Hero Journey, Before-
After-How, Story-Lesson-CTA, Open Loop), per-format frameworks (Carousel, Reel,
Shorts, LinkedIn, X Thread, Blog), the idea bank, and SEO/hashtag/trend data.

**Also owns the pipeline definition itself** — the canonical stage list lives in
`Content Operating System.txt` and is read by `Pipeline`.

**Never owns:** the scripts written from these frameworks.

---

## Script

**Knowledge:** `knowledge/04_SCRIPT/` ⚠️ *narrative doc is corrupt — see `docs/context.md`*
**Roadmap:** Phase 2

Owns script records and their lifecycle (Draft → Ready → Published), the
per-platform variant (TikTok, Instagram, YouTube, LinkedIn, Facebook, Threads),
and the script parts: hook, opening, closing, CTA, caption, subtitle, voice-over,
AI prompt.

Enforces the brand vocabulary guard at authoring time.

**Never owns:** publication itself, or hook/CTA library definitions (those are
Content System).

**Blocked:** lifecycle transition rules are undefined until Q2 is answered.

---

## Recording

**Knowledge:** `knowledge/05_RECORDING/`
**Roadmap:** Phase 3

Owns production sessions and the asset index: pre-production checklists (shot
list, equipment, location), camera/audio profiles and presets, screen-recording
catalogue by tool, A-Roll vs. B-Roll library, studio setup, thumbnail photo
library, BTS, the `Year → Month → Project → RAW` hierarchy, and the 3-2-1 backup
tracker.

**Never owns:** the media bytes — pending Q5, it indexes files that live in
Drive / SSD / phone.

---

## Editing

**Knowledge:** `knowledge/06_EDITING/`
**Roadmap:** Phase 4

Owns post-production: the editing queue and project tracker, software templates
(CapCut, Premiere, After Effects, Photoshop, Canva, DaVinci), presets, LUTs and
colour-grading styles, motion graphics and text assets, the export pipeline
(Draft → Review → Revision → Final → Published → Archive), the naming convention
`YYYYMMDD_PLATFORM_CONTENTTITLE_VERSION`, revision tracking by timecode, and the
editing/export checklists.

**Never owns:** rendering. CreatorOS records what was done in external tools.

---

## Pipeline *(cross-cutting)*

**Knowledge:** `knowledge/03_CONTENT_SYSTEM/Content Operating System.txt`
**Roadmap:** Phase 2 onward, grows each phase

Owns the Content Item and its movement through
`IDEA → RESEARCH → HOOK → SCRIPT → RECORD → EDIT → CAPTION → HASHTAG →
THUMBNAIL → UPLOAD → ANALYTICS → REPURPOSE → ARCHIVE`, the append-only stage
history, and parent→child repurpose links.

Depends on all six domain modules. **Nothing depends on Pipeline.**

**Never owns:** stage-specific business data. It orchestrates; domains hold.

---

## Quality Gate *(cross-cutting)*

**Knowledge:** `knowledge/01_BRAND/Brand Guideline-Master Book.docx` (page 11)
**Roadmap:** Phase 5

Owns rule evaluation for the social-asset checklist (3-second hook, subtitle
spec, palette compliance, specific CTA, no clickbait, watermark 30 %) and the
technical-asset checklist (README present, no leaked credentials, current best
practice, sound methodology).

Pure function: Content Item snapshot in, pass/fail list out. No I/O, no state.
Blocks the transition into `Published`.

---

## Dependency direction

```
Pipeline ──▶ Brand · Audience · ContentSystem · Script · Recording · Editing
    │
    └──────▶ QualityGate ──▶ Brand (rules only)
```

Domain modules must not import `Pipeline` or each other's internals. Cycles are
a build failure once tooling exists.
