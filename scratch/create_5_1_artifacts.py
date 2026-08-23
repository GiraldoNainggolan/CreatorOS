import os

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
- **Vocabulary**: Insight, Framework, Architecture, Scalable, Production-Ready (VERIFIED)
- **Avoid**: Auto Kaya, Hacks, 100% Dijamin (VERIFIED)
- **Framework Relationship**: PAS (Problem, Agitate, Solve) is applied to brand copywriting, but technically belongs to the ContentSystem/Script domain. (INFERRED RELATIONSHIP)

## Visual Identity
- **Colors**: Navy Blue (#0A192F), Emerald Green (#10B981), Off-White (#F8FAFC) (VERIFIED)
- **Typography**: Montserrat/Poppins (Heading), Inter/Roboto (Body) (VERIFIED)

**Source**: `knowledge/01_BRAND/Brand Guideline-Master Book.docx`
**Confidence**: High
**Human Approval Required**: NO
"""

audience = """# Audience Reconstruction

## Audience Data Model (Raw Evidence -> Observed Pattern)
- **Dimensions**: Pain, Fear, Dream, Question, Objection. (VERIFIED - Source: `Media sosial spesialist.pdf`)
- **Integration**: Feeds directly into Hook Library (ContentSystem). (VERIFIED)

## Primary Persona (PROPOSED PERSONA)
- **Name**: Mahasiswa IT / Junior Developer (PROPOSED)
- **Skill Level**: Beginner to Intermediate (PROPOSED)
- **Pain**: Pusing ngurusin integrasi data ribuan baris, laptop nge-hang, server jebol. (PROPOSED)
- **Dream**: Membuat portofolio solid, magang/kerja di perusahaan top. (PROPOSED)
- **Content Need**: Tutorial teknis, framework arsitektur, tips produktivitas. (PROPOSED)

## Secondary Personas (PROPOSED PERSONA)
- Data Analyst, Freelancer, Career Switcher, Founder. (PROPOSED based on raw lists in `Media sosial spesialist.pdf`)

**Source**: `Media sosial spesialist.pdf` (Page 19), `Ide konten kreator.xlsx` (Sheet 2025).
**Status**: PROPOSED
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

## Problem Library (VERIFIED)
- Mapped dynamically from Audience Persona (Pain, Fear, Question).

## Hook Library Taxonomy (VERIFIED)
- **Categories**: Curiosity, Fear, Authority, Story, Contrarian, Number, Mistake, Checklist, Framework, Challenge.

## Hook Library Capacity (PROPOSED)
- **Target**: 1000 hooks is a TARGET / LIBRARY CAPACITY specification, not evidence that 1000 hook records currently exist. (PROPOSED)

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
- **Validation**: Script must follow designated frameworks and vocabulary guards. (VERIFIED)

## Reconstructed Script Knowledge
- **Frameworks**: Scripts are NOT just plain text. They are structured as PAS, BAB, or Hero Journey templates (`Media sosial spesialist.pdf`).
- **Hook Integration**: The Hook is determined *during research*, not during script writing. Script pulls Hook from Hook Library. (RECONSTRUCTED)

## Technical Recommendation (EXTERNAL / ENGINEERING INFERENCE)
- **Script Data Structure**: The database `scripts` table might use JSONB fields to store specific framework parts (e.g., `part_problem`, `part_agitate`, `part_solve`), but this is an implementation recommendation, not a business rule.

## Unknown / Lost Knowledge
- Original manual review checklists specifically for scripts.
- Exact word counts or duration limitations originally set in `04_SCRIPT.docx`.

## Script -> Recording Dependency
- A script marked as 'Ready' moves to Recording. (VERIFIED)
- The script determines the Shot List and B-Roll needs. (INFERRED dependency based on standard video production pipelines, no explicit CreatorOS source found).

**Source**: `Media sosial spesialist.pdf`, `docs/product.md`.
**Confidence**: High (Business logic), Low (Original wording).
**Human Approval Required**: YES
"""

editing = """# Editing Reconstruction

## Hybrid Editing Workflow (VERIFIED)
- **Heavy UI/Design**: Canva on PC (Browser-based, uses no local storage, high precision).
- **Video Rendering/Effects**: CapCut on Mobile (Optimized for smartphone SOC, handles meme overlays and text smoothly).

## Editing Standards (VERIFIED)
- **Font**: Inter 56, Drop Shadow (Opacity 80%, Blur 4px, Y-Offset 2px)
- **Visual**: Glassmorphism, Code Overlays, Tech Navy Blue & Emerald Green.

## Raw File Management (OPERATIONAL CONSTRAINT / WORKAROUND)
- **Action**: Immediate deletion of RAW files after export.
- **Reason**: Storage constraint (128GB SSD limits).
- **Risk**: Recovery risk if re-editing is needed.
- **Human Approval Required**: YES, before making this destructive behavior a canonical SOP, backup retention policies should be verified.

## Folder Structure (VERIFIED)
- 01_PROJECTS to 10_SOP defined.

**Source**: `06_EDITING/06_EDITING.docx`
**Confidence**: High
**Human Approval Required**: YES (for Raw File Deletion rule)
"""

posting = """# Posting Reconstruction

## Documented Knowledge
- Pipeline stage `POSTING` is mentioned in architectural documents (`docs/modules.md`) and `Media sosial spesialist.pdf`. (VERIFIED)

## Status of Posting SOP
- **Physical SOP requirement**: UNKNOWN. There is insufficient evidence to determine if a physical SOP document is required, or if Posting is strictly a database state.

**Source**: `docs/modules.md`, `Media sosial spesialist.pdf`
**Status**: UNKNOWN
**Confidence**: Low
**Human Approval Required**: YES
"""

pipeline = """# Pipeline Reconstruction

## Reconstructed Lifecycle Transitions
1. **Idea -> Research**: (VERIFIED from `Media sosial spesialist.pdf`)
2. **Research -> Hook**: (VERIFIED)
3. **Hook -> Framework**: (VERIFIED)
4. **Framework -> Script (Writing)**: (VERIFIED)
5. **Script -> Recording**: (VERIFIED from `docs/product.md`)
6. **Recording -> Editing**: (VERIFIED from `docs/product.md`)
7. **Editing -> Publishing (Posting)**: (VERIFIED from `docs/product.md`)
8. **Posting -> Analytics**: (INFERRED)
9. **Analytics -> Repurpose**: (INFERRED)
10. **Repurpose -> Archive**: (INFERRED)

**Source**: `Media sosial spesialist.pdf`, `docs/product.md`
**Status**: RECONSTRUCTED
**Confidence**: High
**Human Approval Required**: YES
"""

quality_gate = """# Quality Gate Reconstruction

## Brand Rules (VERIFIED)
- Palet warna sesuai pedoman (Navy Blue & Emerald Green).
- Tidak ada janji clickbait berlebihan.

## Editing Rules (VERIFIED)
- Teks Hook dipahami dalam 3 detik pertama.
- Subtitle menggunakan format Inter 56 + Shadow.
- Watermark "GN" opacity 30% di kanan bawah.

## Security Rules (VERIFIED)
- Tidak ada kredensial API Key bocor di kode.

## Publishing Rules (VERIFIED)
- Call to Action (CTA) spesifik.

**Source**: `Brand Guideline-Master Book.docx` (Checklist Publikasi)
**Confidence**: High
**Human Approval Required**: NO
"""

sop_map = """# SOP Reconstruction Map

| NAME | DOMAIN | PURPOSE | STATUS | PRIORITY |
|---|---|---|---|---|
| Brand Identity | Brand | Core visual/tonal rules | REQUIRED (Evidence exists) | High |
| Audience Matrix | Audience | Persona mapping | RECOMMENDED (Derived) | High |
| Framework Library | ContentSystem | Structure rules | REQUIRED (Evidence exists) | High |
| Script Rules | Script | Lifecycle/Validation | RECOMMENDED (Reconstructed) | High |
| Recording SOP | Recording | Hardware/Setup | REQUIRED (Evidence exists) | Medium |
| Editing SOP | Editing | Hybrid editing logic | REQUIRED (Evidence exists) | Medium |
| Posting SOP | Posting | Upload rules | NOT JUSTIFIED (Insufficient evidence) | Low |
"""

matrix = """# Source-to-Artifact Matrix

| SOURCE | DOMAIN | PROPOSED ARTIFACT | RECONSTRUCTION STATUS | HUMAN APPROVAL REQUIRED? | SOURCE TYPE |
|---|---|---|---|---|---|
| `Brand Guideline.docx` | Brand | `01_BRAND.md` | VERIFIED | NO | PRIMARY |
| `Ide konten.xlsx` (2025) | Audience | `02_AUDIENCE.md` | PROPOSED | YES | SUPPORTING |
| `Media sosial.pdf` | ContentSystem | `Hook_Library.md` | RECONSTRUCTED | YES | PRIMARY |
| `Media sosial.pdf` | Script | `04_SCRIPT.md` | RECONSTRUCTED | YES | PRIMARY |
| `kecilan.docx` | Recording | `05_RECORDING.md` | VERIFIED | NO | SUPPORTING |
| `06_EDITING.docx` | Editing | `06_EDITING.md` | VERIFIED | NO | PRIMARY |
"""

validation = """# PHASE 5.1 — RECONSTRUCTION QUALITY CONTROL

## Corrections Made
- Reclassified numerous overly-confident claims as PROPOSED or INFERRED.
- Separated engineering technical recommendations (JSONB schema) from business logic.
- Separated quality gates into explicit categories (Brand, Editing, Security).
- Corrected the interpretation of destructive editing workflows.

## Claims Downgraded
- **Posting SOP requirement**: Downgraded to UNKNOWN. Insufficient evidence to justify a physical SOP.
- **1000 Hooks**: Downgraded from an existing library to a TARGET / LIBRARY CAPACITY.
- **Script Shot List**: Downgraded to INFERRED. No explicit CreatorOS source found.
- **Raw File Deletion**: Downgraded from an Editing Rule to an OPERATIONAL CONSTRAINT / WORKAROUND (storage constraint).

## Claims Upgraded
- None. This phase focused on constraining claims.

## Claims Reclassified
- **Audience Personas**: Reclassified from RECONSTRUCTED to PROPOSED PERSONA since the exact persona traits are derived from generic raw data, not explicitly signed off.
- **PAS Framework in Brand**: Reclassified from VERIFIED Brand identity to INFERRED RELATIONSHIP (technically belongs to Script/ContentSystem, applied to Brand).

## Audience Corrections
- Explicitly marked Mahasiswa IT and specific Pain/Dream statements as PROPOSED PERSONAS needing human approval, distinguishing them from the Raw Evidence taxonomy (Pain/Fear/Objection).

## Hook Library Corrections
- Clarified that the repository contains the taxonomy and a target goal of 1000 hooks, not 1000 actual existing hook records.

## Script Corrections
- Moved JSONB database schema suggestions to TECHNICAL RECOMMENDATION (External / Engineering Inference) to prevent mixing business rules with implementation details.

## Recording Corrections
- Identified that Shot List/B-Roll dependency on Script is INFERRED, not directly documented in CreatorOS sources.

## Editing Corrections
- Flagged the "Immediate deletion of RAW files" as a storage workaround rather than a canonical SOP, requiring backup retention review.

## Posting Corrections
- Classified Posting as UNKNOWN regarding physical SOPs, avoiding assumptions that it is purely a database state without evidence.

## Pipeline Corrections
- Classified transitions beyond Editing (Posting -> Analytics -> Repurpose -> Archive) as INFERRED.

## Quality Gate Corrections
- Segregated the checklist into Brand Rules, Editing Rules, Security Rules, and Publishing Rules based on the `Brand Guideline-Master Book.docx` source.

## SOP Corrections
- Changed "REQUIRED" to "RECOMMENDED" or "NOT JUSTIFIED" for SOPs lacking definitive source evidence of necessity.

## Source-of-Truth Corrections
- Clarified `Ide konten kreator.xlsx` (2025) as a SUPPORTING SOURCE for Audience, not the absolute canonical source.

## Diagnostic Tooling Status
- Re-written `scratch/check.py` to use dynamic imports for optional parsers (openpyxl, PyPDF2, fitz, docx) to prevent hard static-analysis crashes and provide clean runtime health reports without requiring global package installations.

## Remaining Human Decisions
- Approval of PROPOSED Personas for Audience matrix.
- Approval of Destructive RAW file deletion policy.
- Approval of INFERRED pipeline transitions.

## Canonical Knowledge Readiness
- **Brand**: READY
- **Audience**: READY WITH APPROVAL
- **ContentSystem**: READY WITH APPROVAL
- **Script**: READY WITH APPROVAL
- **Recording**: READY
- **Editing**: READY WITH APPROVAL
- **Posting**: NOT READY
- **Pipeline**: READY WITH APPROVAL
- **QualityGate**: READY
"""

with open('docs/audit/reconstruction/01-brand-reconstruction.md', 'w') as f: f.write(brand)
with open('docs/audit/reconstruction/02-audience-reconstruction.md', 'w') as f: f.write(audience)
with open('docs/audit/reconstruction/03-content-system-reconstruction.md', 'w') as f: f.write(content_system)
with open('docs/audit/reconstruction/04-script-reconstruction.md', 'w') as f: f.write(script)
with open('docs/audit/reconstruction/06-editing-reconstruction.md', 'w') as f: f.write(editing)
with open('docs/audit/reconstruction/07-posting-reconstruction.md', 'w') as f: f.write(posting)
with open('docs/audit/reconstruction/pipeline-reconstruction.md', 'w') as f: f.write(pipeline)
with open('docs/audit/reconstruction/quality-gate-reconstruction.md', 'w') as f: f.write(quality_gate)
with open('docs/audit/reconstruction/sop-reconstruction-map.md', 'w') as f: f.write(sop_map)
with open('docs/audit/reconstruction/source-to-artifact-matrix.md', 'w') as f: f.write(matrix)
with open('docs/audit/reconstruction/phase-5-1-validation.md', 'w') as f: f.write(validation)

print("Created all files")
