# Database

> **STATUS: CONCEPTUAL MODEL — NOT A SCHEMA.**
> No engine chosen (ADR-003), no migrations, no column types, no indexes.
> This file exists so the entity vocabulary is agreed before any table is built.

## Modelling rules

1. One entity per real business concept named in `knowledge/`. If `knowledge/`
   has no name for it, it is not an entity yet — ask.
2. **Library entities** (pillars, hooks, CTAs, personas, presets, LUTs) are
   reference data seeded from `knowledge/`. They are versioned and rarely change.
3. **Work entities** (content item, script, session, edit project) are
   transactional and change constantly.
4. Stage transitions are **append-only**. Never overwrite pipeline history.
5. Media is referenced by path/URI, not stored — pending ADR-004 / Q5.
6. Enumerations come from `knowledge/`, never invented. Where an enum's source
   document is corrupt, the enum stays undefined.

## Entities by module

### Brand (reference)

`brand_profile` · `color_token` · `typography_token` · `voice_term`
(preferred | banned) · `qa_checklist` · `qa_checklist_item`

Source: `knowledge/01_BRAND/`.

### Audience (reference)

`persona` · `pain_point` · `dream` · `audience_insight`
(FAQ | comment | DM | poll | survey) · `competitor` · `keyword`

Source: `knowledge/02_AUDIENCE/` and its spreadsheet sheet spec (`01_Persona_Master`,
`02_Content_Requests`, `03_Viral_Keywords`, `04_Competitor_Spy`, `05_Monthly_Report`).

### Content System (reference + work)

`pillar` · `hook_template` (typed: Curiosity, Fear, Mistake, Hot Take, Story,
Tutorial, Numbers, AI, Coding) · `cta_template` (Save, Follow, Comment, Share,
Download, Join, DM) · `storytelling_framework` (PAS, AIDA, BAB, Hero Journey,
Before-After-How, Story-Lesson-CTA, Open Loop) · `content_format` (Carousel,
Reel, Shorts, LinkedIn, X Thread, Blog) · `idea` · `reference_item`

Source: `knowledge/03_CONTENT_SYSTEM/`.

### Script (work)

`script` · `script_part` (hook | opening | closing | cta | caption | subtitle |
voice_over | ai_prompt) · `script_version`

Lifecycle `draft → ready → published` is confirmed; transition rules are **not**
(`04_SCRIPT.docx` is corrupt — `docs/context.md` Q2).

### Recording (work + reference)

`recording_session` · `shot_list_item` · `equipment` · `camera_preset` ·
`raw_asset` (a_roll | b_roll | screen_recording | audio | photo) ·
`thumbnail_photo` · `backup_record` (ssd | hdd | cloud)

The `_METADATA.txt` template in `knowledge/05_RECORDING/05_RECORDING.docx`
defines the required fields for `recording_session` and `raw_asset`.

### Editing (work + reference)

`edit_project` · `edit_asset` (music | sfx | font | icon | lut | overlay |
motion_graphic | template) · `export_version` · `revision_note` (timecode-anchored)

Export lifecycle: `draft → review → revision → final → published → archive`.
File naming: `YYYYMMDD_PLATFORM_CONTENTTITLE_VERSION`.
The `[POST-PRODUCTION METADATA]` template defines `edit_project` fields.

### Pipeline (work — the spine)

`content_item` · `content_item_stage` (append-only history) ·
`repurpose_link` (parent → child) · `publication` (platform, url, published_at) ·
`analytics_snapshot`

`platform` is a reference entity: TikTok, Instagram, YouTube, LinkedIn,
Facebook, Threads.

### Quality Gate (work)

`gate_evaluation` · `gate_result_item`

Evaluations are snapshots, retained for audit. Never mutated.

## Key relationships

```
content_item ──1:1── script
content_item ──1:N── content_item_stage        (append-only)
content_item ──N:1── pillar
content_item ──N:M── persona
content_item ──N:1── content_format
content_item ──N:1── platform
content_item ──0:N── recording_session ──1:N── raw_asset
content_item ──0:1── edit_project ──1:N── export_version
content_item ──0:N── publication ──1:N── analytics_snapshot
content_item ──self── repurpose_link           (parent → children)
content_item ──1:N── gate_evaluation
```

## Deliberately absent

| Missing | Why |
|---|---|
| `user`, `role`, `tenant` | Q1 unanswered. Single-operator assumption until then. |
| `client`, `invoice`, `package` | No approved business domain (Q6). |
| `media_file` (bytes) | Index-only until ADR-004 / Q5 is decided. |
| Script transition rules | Source document corrupt (Q2). |
| Analytics metric definitions | Metric source undecided (Q4). |
