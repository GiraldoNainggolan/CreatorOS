# Context

Entry point for anyone (human or agent) joining CreatorOS.

## What this repository is

CreatorOS is the software implementation of an existing, already-designed
**Brand & Content Operating System** owned by Giraldo Nainggolan (Software
Engineer / AI & Data Scientist / Tech Educator). The business system already
exists as documents; this repository turns it into an application.

The business system is **not** designed here. It is read from `knowledge/`.

## Repository layout

```
CreatorOS/
├── knowledge/        Business Single Source of Truth  (READ-ONLY)
├── docs/             Technical Single Source of Truth
├── prompts/          Reusable prompt templates
├── backend/          (empty — awaiting approved architecture)
├── frontend/         (empty — awaiting approved architecture)
├── infrastructure/   (placeholder — awaiting approved architecture)
└── .claude/          Agent operating rules
```

## Knowledge base map

Six approved business domains. Numbering is fixed and mirrors the production
pipeline order.

| Domain | Owns | Key readable artefacts |
|---|---|---|
| `01_BRAND` | Identity, vision, voice, visual system, publication QA | `01_Vision/*.txt`, `02_Positioning/*.txt`, `Brand Guideline-Master Book.docx` |
| `02_AUDIENCE` | Personas, pain points, dreams, audience research inputs | `02_AUDIENCE.txt`, `kerjakan dengan teliti...xlsx` (sheet spec) |
| `03_CONTENT_SYSTEM` | Pillars, hooks, CTAs, storytelling frameworks, formats, idea bank | `03_CONTENT_SYSTEM.txt`, `Content Operating System.txt` |
| `04_SCRIPT` | Script lifecycle (Draft → Ready → Published) per platform, per part | `04_SCRIPT.txt` |
| `05_RECORDING` | Production asset management (A-Roll, B-Roll, screen recording, backup) | `05_RECORDING.docx`, `kecilan.docx` |
| `06_EDITING` | Post-production assets, presets, export pipeline, naming convention | `06_EDITING.docx` |

## The pipeline (fixed)

Source: `knowledge/03_CONTENT_SYSTEM/Content Operating System.txt`

```
IDEA → RESEARCH → HOOK → SCRIPT → RECORD → EDIT → CAPTION
     → HASHTAG → THUMBNAIL → UPLOAD → ANALYTICS → REPURPOSE → ARCHIVE
```

Every technical module exists to move an item forward through this pipeline.
See `docs/modules.md`.

## Known constraints

- **Hardware.** Primary machine is a 4 GB RAM / 128 GB laptop; editing is done on
  a phone (hybrid workflow, `knowledge/06_EDITING/06_EDITING.docx`). Local dev
  tooling must stay lightweight. Heavy media processing cannot run locally.
- **Language.** Business documents are Indonesian. Technical docs and code are
  English. Do not translate `knowledge/`.
- **Stated stack skills** (`knowledge/01_BRAND/02_Positioning/Expertise Matrix.txt`):
  React.js / Next.js / Tailwind, Laravel / REST, Python / SQL. Not yet a
  ratified architecture decision — see `docs/architecture.md`.

## Data quality issues found in `knowledge/`

Reported, **not** fixed (see rule 2 in `.claude/CLAUDE.md`).

| Issue | File(s) |
|---|---|
| File is zero-filled / unreadable | `knowledge/New Microsoft Word Document.docx`, `02_AUDIENCE/New Microsoft Word Document.docx`, `03_CONTENT_SYSTEM/New Microsoft Word Document.docx`, `04_SCRIPT/04_SCRIPT.docx` |
| 3-year and 5-year goals are byte-identical | `01_BRAND/01_Vision/Goals 3 Tahun.txt`, `Goals 5 Tahun.txt` |
| Index lists sub-folders that do not exist (Identity, Brand Voice, Color Palette, Typography, …) | `01_BRAND/01_BRAND.txt` |
| Contains generic stock content unrelated to the tech-education brand | `knowledge/Ide konten kreator.xlsx` |
| No markdown in `knowledge/` — all `.txt` / `.docx` / `.pdf`; PDFs are not machine-readable in this environment | all domains |

## Open questions

Numbered so they can be answered by reference. Blocking questions are marked **[B]**.

1. **[B]** Single-user personal tool, or multi-tenant SaaS? `Goals 3 Tahun` targets
   a "startup SaaS", but nothing in `knowledge/` defines tenants, roles, or billing.
2. **[B]** Is `04_SCRIPT` the intended first module? Its only narrative document
   (`04_SCRIPT.docx`) is corrupt, so the script lifecycle rules are undefined.
3. Does CreatorOS **publish** to TikTok / Instagram / YouTube / LinkedIn via API,
   or only track publication done manually? No domain covers UPLOAD.
4. Where do ANALYTICS numbers come from — platform APIs, CSV import, or manual entry?
   No domain covers analytics; `05_Monthly_Report` exists only as a spreadsheet sheet spec.
5. Do media files live inside CreatorOS (object storage) or stay in Google Drive /
   OneDrive / SSD as described in `05_RECORDING`? This decides whether the app is a
   *catalogue* or a *store*.
6. Are `07_MONETIZATION` / client & CRM concerns in scope? `Paket_Lengkap.pdf` and
   `Media sosial spesialist.pdf` sit at the knowledge root, unassigned to a domain,
   and could not be read here.
7. Hosting target and budget (VPS, shared hosting, Vercel + managed DB, self-host)?
   This gates `infrastructure/`.
8. Is the Recording/Editing **Dashboard.xlsx** spec (sheets listed in the `.docx`
   files) the intended UI, i.e. should CreatorOS replace those spreadsheets?
