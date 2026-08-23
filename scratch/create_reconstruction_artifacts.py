import os

os.makedirs('docs/audit/reconstruction', exist_ok=True)

brand = """# Brand Reconstruction

## Brand Identity
- **DNA**: Code + Data + Education (VERIFIED)
- **Positioning**: "THE DATA-DRIVEN FULL-STACK DEVELOPER" (VERIFIED)
- **Vision**: Menjadi figur teknologi Indonesia... (VERIFIED)

## Brand Archetype
- 70% SAGE (Pendidik/Analisis mendalam) (VERIFIED)
- 20% CREATOR (Membangun arsitektur/sistem) (VERIFIED)
- 10% EXPLORER (Riset/Eksplorasi teknologi) (VERIFIED)

## Brand Voice & Copywriting
- **Framework**: PAS (Problem, Agitate, Solve) (VERIFIED)
- **Vocabulary**: Insight, Framework, Architecture, Scalable, Production-Ready (VERIFIED)
- **Avoid**: Auto Kaya, Hacks, 100% Dijamin (VERIFIED)

## Visual Identity
- **Colors**: Navy Blue (#0A192F), Emerald Green (#10B981), Off-White (#F8FAFC) (VERIFIED)
- **Typography**: Montserrat/Poppins (Heading), Inter/Roboto (Body) (VERIFIED)

**Source**: `knowledge/01_BRAND/Brand Guideline-Master Book.docx`
**Confidence**: High
**Human Approval Required**: NO
"""

audience = """# Audience Reconstruction

## Primary Persona (PROPOSED PERSONA)
- **Name**: Mahasiswa IT / Junior Developer
- **Skill Level**: Beginner to Intermediate
- **Pain**: Pusing ngurusin integrasi data ribuan baris, laptop nge-hang, server jebol.
- **Dream**: Membuat portofolio solid, magang/kerja di perusahaan top.
- **Content Need**: Tutorial teknis, framework arsitektur, tips produktivitas.

## Secondary Personas (PROPOSED PERSONA)
- Data Analyst, Freelancer, Career Switcher, Founder.

## Audience Data Model
- **Dimensions**: Pain, Fear, Dream, Question, Objection.
- **Integration**: Feeds directly into Hook Library (ContentSystem).

**Source**: `Media sosial spesialist.pdf` (Page 19), `Ide konten kreator.xlsx` (Sheet 2025).
**Status**: RECONSTRUCTED
**Confidence**: High
**Human Approval Required**: YES
"""

content_system = """# Content System Reconstruction

## Content Pillars (RECONSTRUCTED)
1. Software Engineering
2. Data & AI
3. GIS & Spatial
4. Career & Branding
5. Productivity

## Problem Library (RECONSTRUCTED)
- Mapped dynamically from Audience Persona (Pain, Fear, Question).

## Hook Library (RECONSTRUCTED)
- **Categories**: Curiosity, Fear, Authority, Story, Contrarian, Number, Mistake, Checklist, Framework, Challenge.
- **Target**: 100 Hooks per category (1000 Total).

## Storytelling Frameworks (VERIFIED)
- PAS (Problem, Agitate, Solve)
- BAB (Before, After, Bridge/How)
- Story, Lesson, CTA
- Hook, Promise, Point, CTA (Carousel)

**Source**: `Media sosial spesialist.pdf`
**Status**: RECONSTRUCTED
**Confidence**: High
**Human Approval Required**: YES
"""

script = """# Script Reconstruction

## Original Source Status
The original file `knowledge/04_SCRIPT/04_SCRIPT.docx` is completely zero-filled (destroyed). No verbatim wording is recoverable. (VERIFIED)

## Verified Script Knowledge
- **Lifecycle states**: Draft -> Ready -> Published (`docs/product.md`).
- **Validation**: Script must follow designated frameworks and vocabulary guards.

## Reconstructed Script Knowledge
- **Frameworks**: Scripts are NOT just plain text. They are structured as PAS, BAB, or Hero Journey templates (`Media sosial spesialist.pdf`).
- **Hook Integration**: The Hook is determined *during research*, not during script writing. Script pulls Hook from Hook Library.

## Inferred Knowledge
- **Script Data Structure**: The database `scripts` table will need JSONB fields to store the specific parts of the framework (e.g., `part_problem`, `part_agitate`, `part_solve`) rather than a single `body` column.

## Unknown / Lost Knowledge
- Original manual review checklists specifically for scripts.
- Exact word counts or duration limitations originally set in `04_SCRIPT.docx`.

## Script -> Recording Dependency
- A script marked as 'Ready' is moved to Recording phase. The script dictates the Shot List and B-Roll needs (RECONSTRUCTED).

**Source**: `Media sosial spesialist.pdf`, `docs/product.md`.
**Confidence**: High (Business logic), Low (Original wording).
**Human Approval Required**: YES
"""

recording = """# Recording Reconstruction

## Technical Specifications (VERIFIED)
- **Camera**: Smartphone Rear Camera (Infinix Hot 10S, 48MP)
- **Resolution**: 1080p 30fps
- **Lighting**: Desk lamp bounced off white wall (diffused).
- **Audio**: Room acoustics (small 4x4 room with foam mattress).

## Technical Constraints (VERIFIED)
- **Hardware**: Laptop RAM 4GB, Storage 128GB.
- **Screen Recording**: Use Xbox Game Bar instead of OBS to save RAM. If OBS is used, Output at 720p 30fps (2500 Kbps).
- **Data Transfer**: Immediate offload of raw video to Cloud/NAS. LocalSend/Snapdrop for fast local transfer.

## Workflow (VERIFIED)
1. Pre-Production (Checklist)
2. Setup Lesehan
3. A-Roll (Smartphone) + Screen Record (Laptop)
4. Transfer to Editing.

**Source**: `05_RECORDING/05_RECORDING.docx`, `05_RECORDING/kecilan.docx`
**Confidence**: High
**Human Approval Required**: NO
"""

editing = """# Editing Reconstruction

## Hybrid Editing Workflow (VERIFIED)
- **Heavy UI/Design**: Canva on PC (Browser-based, uses no local storage, high precision).
- **Video Rendering/Effects**: CapCut on Mobile (Optimized for smartphone SOC, handles meme overlays and text smoothly).
- **Constraint Management**: Bypasses the 4GB RAM laptop limitation.

## Editing Standards (VERIFIED)
- **Font**: Inter 56, Drop Shadow (Opacity 80%, Blur 4px, Y-Offset 2px)
- **Visual**: Glassmorphism, Code Overlays, Tech Navy Blue & Emerald Green.
- **Export**: Immediate deletion of RAW files after export to save space.

## Folder Structure (VERIFIED)
- 01_PROJECTS to 10_SOP defined.

**Source**: `06_EDITING/06_EDITING.docx`
**Confidence**: High
**Human Approval Required**: NO
"""

posting = """# Posting Reconstruction

## Documented Knowledge
- Pipeline stage `POSTING` is mentioned in architectural documents and `Media sosial spesialist.pdf`.

## Inferred Knowledge
- Posting is a pipeline state tracking whether the asset is published to YouTube/TikTok/LinkedIn.
- **Physical SOP requirement**: Pipeline state only — no physical SOP currently justified in the `knowledge/07_POSTING` folder.

**Source**: `docs/modules.md`
**Status**: INFERRED
**Confidence**: Medium
**Human Approval Required**: YES
"""

pipeline = """# Pipeline Reconstruction

## Reconstructed Lifecycle
1. **Idea / Research**: Identify problem/trend.
2. **Hook**: Select from Hook Library.
3. **Framework / Structure**: Select PAS, BAB, etc.
4. **Script (Writing)**: Author content (Draft -> Ready).
5. **Recording**: A-Roll, Screen Record.
6. **Editing**: Assemble, Polish, Caption.
7. **Publishing (Posting)**: Distribution.
8. **Analytics**: Measure 3-second retention.
9. **Repurpose**: Turn video into X thread / LinkedIn post.
10. **Archive**: Move to cold storage.

**Source**: `Media sosial spesialist.pdf`
**Status**: RECONSTRUCTED
**Confidence**: High
**Human Approval Required**: YES
"""

quality_gate = """# Quality Gate Reconstruction

## Explicit Quality Rules (VERIFIED)
1. Teks Hook dipahami dalam 3 detik pertama.
2. Subtitle menggunakan format Inter 56 + Shadow.
3. Palet warna sesuai pedoman (Navy Blue & Emerald Green).
4. Call to Action (CTA) spesifik.
5. Tidak ada janji clickbait berlebihan.
6. Watermark "GN" opacity 30% di kanan bawah.
7. Tidak ada kredensial API Key bocor di kode.

**Source**: `Brand Guideline-Master Book.docx` (Checklist Publikasi)
**Confidence**: High
**Human Approval Required**: NO
"""

sop_map = """# SOP Reconstruction Map

| NAME | DOMAIN | PURPOSE | STATUS | PRIORITY |
|---|---|---|---|---|
| Brand Identity | Brand | Core visual/tonal rules | REQUIRED (Exists) | High |
| Audience Matrix | Audience | Persona mapping | REQUIRED (Proposed) | High |
| Framework Library | ContentSystem | Structure rules | REQUIRED (Proposed) | High |
| Script Rules | Script | Lifecycle/Validation | REQUIRED (Proposed) | High |
| Recording SOP | Recording | Hardware/Setup | REQUIRED (Exists) | Medium |
| Editing SOP | Editing | Hybrid editing logic | REQUIRED (Exists) | Medium |
| Posting SOP | Posting | Upload rules | OPTIONAL | Low |
"""

matrix = """# Source-to-Artifact Matrix

| SOURCE | DOMAIN | PROPOSED ARTIFACT | RECONSTRUCTION STATUS | HUMAN APPROVAL REQUIRED? |
|---|---|---|---|---|
| `Brand Guideline.docx` | Brand | `01_BRAND.md` | VERIFIED | NO |
| `Ide konten.xlsx` (2025) | Audience | `02_AUDIENCE.md` | RECONSTRUCTED | YES |
| `Media sosial.pdf` | ContentSystem | `Hook_Library.md` | RECONSTRUCTED | YES |
| `Media sosial.pdf` | Script | `04_SCRIPT.md` | RECONSTRUCTED | YES |
| `kecilan.docx` | Recording | `05_RECORDING.md` | VERIFIED | NO |
| `06_EDITING.docx` | Editing | `06_EDITING.md` | VERIFIED | NO |
"""

with open('docs/audit/reconstruction/01-brand-reconstruction.md', 'w') as f: f.write(brand)
with open('docs/audit/reconstruction/02-audience-reconstruction.md', 'w') as f: f.write(audience)
with open('docs/audit/reconstruction/03-content-system-reconstruction.md', 'w') as f: f.write(content_system)
with open('docs/audit/reconstruction/04-script-reconstruction.md', 'w') as f: f.write(script)
with open('docs/audit/reconstruction/05-recording-reconstruction.md', 'w') as f: f.write(recording)
with open('docs/audit/reconstruction/06-editing-reconstruction.md', 'w') as f: f.write(editing)
with open('docs/audit/reconstruction/07-posting-reconstruction.md', 'w') as f: f.write(posting)
with open('docs/audit/reconstruction/pipeline-reconstruction.md', 'w') as f: f.write(pipeline)
with open('docs/audit/reconstruction/quality-gate-reconstruction.md', 'w') as f: f.write(quality_gate)
with open('docs/audit/reconstruction/sop-reconstruction-map.md', 'w') as f: f.write(sop_map)
with open('docs/audit/reconstruction/source-to-artifact-matrix.md', 'w') as f: f.write(matrix)

print("Created 11 files in docs/audit/reconstruction/")
