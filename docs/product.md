# Product

What CreatorOS does. Business definitions live in `knowledge/`; this file maps
them to product behaviour.

## Actors

Only one actor is confirmed by `knowledge/`. The rest are candidates pending
`docs/context.md` Q1.

| Actor | Status | Description |
|---|---|---|
| **Owner / Creator** | Confirmed | Runs the whole pipeline solo. Author, presenter, editor, publisher. |
| Editor | Candidate | Referenced by the `Editor` metadata field in `knowledge/06_EDITING/06_EDITING.docx`. |
| Client | Candidate | Implied by `10_RAW_PROJECT → Client` category in `knowledge/05_RECORDING/05_RECORDING.docx`. |
| Audience | External | Never logs in. Represented as personas and analytics, not users. |

## Core object: the Content Item

One record travels the whole pipeline. It is the spine of the product.

```
Content Item
  ├─ classification : pillar, persona, platform, format
  ├─ ideation       : idea, research notes, hook
  ├─ script         : draft → ready → published, per-part (hook/opening/CTA/caption)
  ├─ production     : recording session, raw assets, screen recordings, B-roll
  ├─ post           : edit project, presets/LUTs used, export versions
  ├─ distribution   : thumbnail, caption, hashtags, publish target + timestamp
  └─ feedback       : analytics, repurpose children, archive
```

## Pipeline stages → product capabilities

Pipeline source: `knowledge/03_CONTENT_SYSTEM/Content Operating System.txt`.

| Stage | Capability | Knowledge source |
|---|---|---|
| IDEA | Idea bank filtered by pillar and persona pain point | `03_CONTENT_SYSTEM` (Content Idea), `02_AUDIENCE` (Pain Point) |
| RESEARCH | Attach keywords, competitor gaps, references, swipe file | `03_CONTENT_SYSTEM` (Research, Swipe File), `02_AUDIENCE` xlsx sheets 03–04 |
| HOOK | Pick from the hook library by type (Curiosity, Fear, Mistake, …) | `03_CONTENT_SYSTEM` (Hook Library) |
| SCRIPT | Author with PAS / AIDA / Hero Journey framework; lifecycle Draft → Ready → Published; vocabulary guard | `04_SCRIPT`, `01_BRAND` (Brand Voice) |
| RECORD | Shot list, equipment + preset checklist, raw footage log, backup tracker | `05_RECORDING` |
| EDIT | Editing queue, preset/LUT catalogue, revision tracker, export versioning | `06_EDITING` |
| CAPTION | Caption per platform, subtitle spec enforcement (Inter 56, 2 lines, emerald highlight) | `01_BRAND`, `04_SCRIPT` |
| HASHTAG | Hashtag + SEO keyword sets per platform | `03_CONTENT_SYSTEM` (Hashtag, Keyword SEO, YouTube SEO) |
| THUMBNAIL | Thumbnail blueprint compliance; cut-out photo library | `01_BRAND` (Content Identity), `05_RECORDING` (08_THUMBNAIL) |
| UPLOAD | Publish target, scheduled date, naming convention `YYYYMMDD_PLATFORM_TITLE_VERSION` | `07_POSTING` *(spec pending)*, `06_EDITING` (10_SOP) — **API vs. manual undecided, Q3** |
| ANALYTICS | Per-post performance, top-saved topics, monthly insight | `08_ANALYTICS` *(spec pending)*, `02_AUDIENCE` xlsx sheet 05 — **source undecided, Q4** |
| REPURPOSE | Derive child items (Reel → Carousel → Thread → Blog) from one parent | `11_REPURPOSE` *(spec pending)*, `03_CONTENT_SYSTEM` (Framework) |
| ARCHIVE | Close project, verify 3-2-1 backup, freeze metadata | `12_ARCHIVE` *(spec pending)*, `05_RECORDING` (11_BACKUP) |

## Cross-cutting: Quality Gates

Two checklists from the Master Book (page 11) become blocking gates:

- **Social asset gate** — hook readable in 3 s, subtitle spec, brand palette,
  specific CTA, no clickbait, watermark at 30 % opacity.
- **Technical asset gate** — README present, no leaked credentials, current
  best practice, method scientifically sound.

An item cannot enter `Published` with an open gate.

## Platforms

`TikTok · Instagram · YouTube · LinkedIn · Facebook · Threads`
(`knowledge/04_SCRIPT/04_SCRIPT.txt`)

Tone and content type differ per platform — LinkedIn is authoritative/B2B,
Instagram + TikTok are practical/educational
(`knowledge/01_BRAND/New Text Document.txt`, section `08_Social Media Identity`).
The product must not treat platforms as interchangeable.

## Scope boundaries

### Permanent non-goals

Video rendering, design canvas, and in-app media processing. CreatorOS records
what external tools produce; it does not replace them.

### Business domain exists, technical specification pending

Approved domains with no technical specification yet. They are in scope for the
product but cannot be designed until their business documentation exists.

| Capability | Domain |
|---|---|
| Publishing / distribution | `knowledge/07_POSTING` |
| Performance analytics | `knowledge/08_ANALYTICS` |
| Digital products | `knowledge/09_DIGITAL_PRODUCT` |
| Portfolio | `knowledge/10_PORTFOLIO` |
| Repurposing | `knowledge/11_REPURPOSE` |
| Archival | `knowledge/12_ARCHIVE` |
| AI prompt / model library | `knowledge/13_AI_LIBRARY` |
| Knowledge base | `knowledge/14_KNOWLEDGE_BASE` |
| Asset cataloguing | `knowledge/15_ASSET_LIBRARY` |
| Business, monetisation, clients | `knowledge/16_BUSINESS` |
| Standard operating procedures | `knowledge/17_SOP (Standard Operating Procedure)` |

See `docs/modules.md` → Declared domains awaiting technical specification.
