import os

matrix_content = """# SOURCE OF TRUTH MATRIX

| Domain | Authoritative Source | Secondary Source | Supporting Source | Status | Confidence | Known Gaps | Human Approval Required |
|---|---|---|---|---|---|---|---|
| 01_BRAND | `knowledge/01_BRAND/01_BRAND.docx` | `pdf_extracts/01_BRAND.txt` | Corrupt: `Brand Guideline-Master Book.pdf` | VERIFIED (DOCX), CORRUPTED (PDF) | High | None | No |
| 02_AUDIENCE | `knowledge/02_AUDIENCE/02_AUDIENCE.docx` | `pdf_extracts/02_AUDIENCE.txt` | `Paket_Lengkap.pdf` | VERIFIED | High | None | No |
| 03_CONTENT_SYSTEM | `knowledge/03_CONTENT_SYSTEM/Content Operating System.txt` | `pdf_extracts/03_CONTENT_SYSTEM.txt` | `Paket_Lengkap.pdf` | VERIFIED | High | None | No |
| 04_SCRIPT | `knowledge/04_SCRIPT/04_SCRIPT.md` (Derived) | `pdf_extracts/04_SCRIPT.txt` | Corrupt/Lost: `04_SCRIPT.docx` | RECONSTRUCTED (MD), CORRUPTED/LOST (Original) | Medium | Original structure lost | Yes - Reconstructed Authority |
| 05_RECORDING | `knowledge/05_RECORDING/05_RECORDING.docx` | `pdf_extracts/05_RECORDING.txt` | `Paket_Lengkap.pdf` | VERIFIED | High | None | No |
| 06_EDITING | `knowledge/06_EDITING/06_EDITING.docx` | `pdf_extracts/06_EDITING.txt` | Corrupt: `06_EDITING.pdf` | VERIFIED (DOCX), CORRUPTED (PDF) | High | None | No |
| 07_POSTING | `Paket_Lengkap.pdf` (Verified Source) | `pdf_extracts/07_POSTING.txt` | `knowledge/07_POSTING/07_POSTING.md` | RECONSTRUCTED | High | None | No |
| 08_ANALYTICS | `Paket_Lengkap.pdf` (Verified Source) | `pdf_extracts/08_ANALYTICS.txt` | `knowledge/08_ANALYTICS/08_ANALYTICS.md` | RECONSTRUCTED | High | None | No |
| 09_DIGITAL_PRODUCT | `Paket_Lengkap.pdf` (Verified Source) | `pdf_extracts/09_DIGITAL_PRODUCT.txt` | `knowledge/09_DIGITAL_PRODUCT/09_DIGITAL_PRODUCT.md` | RECONSTRUCTED | High | None | No |
| 10_PORTFOLIO | `Paket_Lengkap.pdf` (Verified Source) | `pdf_extracts/10_PORTFOLIO.txt` | `knowledge/10_PORTFOLIO/10_PORTFOLIO.md` | RECONSTRUCTED | High | None | No |
| 11_REPURPOSE | `Paket_Lengkap.pdf` (Verified Source) | `pdf_extracts/11_REPURPOSE.txt` | `knowledge/11_REPURPOSE/11_REPURPOSE.md` | RECONSTRUCTED | High | None | No |
| 12_ARCHIVE | `Paket_Lengkap.pdf` (Verified Source) | `pdf_extracts/12_ARCHIVE.txt` | `knowledge/12_ARCHIVE/12_ARCHIVE.md` | RECONSTRUCTED | High | None | No |
| 13_AI_LIBRARY | `Paket_Lengkap.pdf` (Verified Source) | `pdf_extracts/13_AI_LIBRARY.txt` | `knowledge/13_AI_LIBRARY/13_AI_LIBRARY.md` | RECONSTRUCTED | High | None | No |
| 14_KNOWLEDGE_BASE | `Paket_Lengkap.pdf` (Verified Source) | `pdf_extracts/14_KNOWLEDGE_BASE.txt` | `knowledge/14_KNOWLEDGE_BASE/14_KNOWLEDGE_BASE.md` | RECONSTRUCTED | High | None | No |
| 15_ASSET_LIBRARY | `Paket_Lengkap.pdf` (Verified Source) | `pdf_extracts/15_ASSET_LIBRARY.txt` | `knowledge/15_ASSET_LIBRARY/15_ASSET_LIBRARY.md` | RECONSTRUCTED | High | None | No |
| 16_BUSINESS | `Paket_Lengkap.pdf` (Verified Source) | `pdf_extracts/16_BUSINESS.txt` | `knowledge/16_BUSINESS/16_BUSINESS.md` | RECONSTRUCTED | High | None | No |
| 17_SOP | `Paket_Lengkap.pdf` (Verified Source) | `pdf_extracts/17_SOP.txt` | `knowledge/17_SOP/17_SOP.md` | RECONSTRUCTED | High | None | No |
"""

dependency_map_content = """# DOMAIN DEPENDENCY MAP

## The 13-Stage Content Pipeline
As mapped from `README.md` and `03_CONTENT_SYSTEM` evidence:

```mermaid
graph TD
    Brand[01_BRAND] --> Audience[02_AUDIENCE]
    Audience --> ContentSystem[03_CONTENT_SYSTEM]
    ContentSystem --> Script[04_SCRIPT]
    Script --> Record[05_RECORDING]
    Record --> Edit[06_EDITING]
    Edit --> Post[07_POSTING]
    Post --> Analytics[08_ANALYTICS]
    Analytics --> Repurpose[11_REPURPOSE]
    Repurpose --> Archive[12_ARCHIVE]
    
    Product[09_DIGITAL_PRODUCT] -.-> Brand
    Portfolio[10_PORTFOLIO] -.-> Brand
    AILib[13_AI_LIBRARY] -.-> ContentSystem
    KBase[14_KNOWLEDGE_BASE] -.-> Brand
    AssetLib[15_ASSET_LIBRARY] -.-> ContentSystem
    SOP[17_SOP] -.-> ContentSystem
    Business[16_BUSINESS] -.-> Brand
```

## Supported Source Relationships
- **ContentSystem -> Script -> Record -> Edit -> Post -> Analytics**: Explicitly supported by `README.md` Content Pipeline array.
- **Brand -> Audience -> ContentSystem**: Supported by the fundamental architecture of the Brand & Content Operating System. Brand defines the tone, Audience receives it, Content System structures it.
"""

terminology_content = """# TERMINOLOGY REGISTRY

| Term | Meaning | Domain Owner | Source | Status |
|---|---|---|---|---|
| CDPS | Content Distribution & Publishing System | 07_POSTING | `Paket_Lengkap.pdf` | VERIFIED |
| Knowledge Assets | The output of transforming raw knowledge into publishable formats | 03_CONTENT_SYSTEM | `README.md` | VERIFIED |
| Tone of Voice | Brand communication style | 01_BRAND | `01_BRAND.docx` | VERIFIED |
| Content Pipeline | 13-stage workflow from IDEA to ARCHIVE | 03_CONTENT_SYSTEM | `README.md` | VERIFIED |
| IDEA | Initial stage of the pipeline (Indonesian 'IDE') | 03_CONTENT_SYSTEM | `README.md` | VERIFIED |
"""

readiness_content = """# IMPLEMENTATION READINESS

| Domain | Knowledge Status | Implementation Readiness | Blockers | Dependencies | Missing Decisions | Required Validation |
|---|---|---|---|---|---|---|
| 01_BRAND | VERIFIED | LEVEL 3 — DEFINED | None | None | None | None |
| 02_AUDIENCE | VERIFIED | LEVEL 3 — DEFINED | None | 01_BRAND | None | None |
| 03_CONTENT_SYSTEM | VERIFIED | LEVEL 3 — DEFINED | None | 01, 02 | None | None |
| 04_SCRIPT | RECONSTRUCTED | LEVEL 3 — DEFINED | Corrupted Original | 03_CONTENT_SYSTEM | Reconstructed Script Authority | Yes |
| 05_RECORDING | VERIFIED | LEVEL 3 — DEFINED | None | 04_SCRIPT | None | None |
| 06_EDITING | VERIFIED | LEVEL 3 — DEFINED | None | 05_RECORDING | None | None |
| 07_POSTING | RECONSTRUCTED | LEVEL 3 — DEFINED | None | 06_EDITING | None | None |
| 08_ANALYTICS | RECONSTRUCTED | LEVEL 3 — DEFINED | None | 07_POSTING | None | None |
| 09_DIGITAL_PRODUCT | RECONSTRUCTED | LEVEL 3 — DEFINED | None | 01_BRAND | None | None |
| 10_PORTFOLIO | RECONSTRUCTED | LEVEL 3 — DEFINED | None | 01_BRAND | None | None |
| 11_REPURPOSE | RECONSTRUCTED | LEVEL 3 — DEFINED | None | 08_ANALYTICS | None | None |
| 12_ARCHIVE | RECONSTRUCTED | LEVEL 3 — DEFINED | None | 11_REPURPOSE | None | None |
| 13_AI_LIBRARY | RECONSTRUCTED | LEVEL 3 — DEFINED | None | 03_CONTENT_SYSTEM | None | None |
| 14_KNOWLEDGE_BASE | RECONSTRUCTED | LEVEL 3 — DEFINED | None | 01_BRAND | None | None |
| 15_ASSET_LIBRARY | RECONSTRUCTED | LEVEL 3 — DEFINED | None | 03_CONTENT_SYSTEM | None | None |
| 16_BUSINESS | RECONSTRUCTED | LEVEL 3 — DEFINED | None | 01_BRAND | None | None |
| 17_SOP | RECONSTRUCTED | LEVEL 3 — DEFINED | None | 01_BRAND | None | None |

**Overall Status**: READY WITH CONDITIONS (Architecture required before Level 4).
"""

human_decisions_content = """# HUMAN DECISION REGISTER

The following decisions require explicit owner approval:

1. **Reconstructed Script Authority**
   - **Context**: The original `04_SCRIPT.docx` is `CORRUPTED / LOST`.
   - **Decision Required**: Approve the `RECONSTRUCTED` Markdown script logic as the authoritative baseline for implementation.
2. **Corrupted Media Recovery**
   - **Context**: Several Meme Bank/Media assets are zero-filled and `RECOVERY REQUIRED`.
   - **Decision Required**: Determine manual replacement timeline. Note: Does not block architecture implementation.
3. **Corrupted PDF Originals**
   - **Context**: `01_BRAND` and `06_EDITING` contain corrupted PDF files, though their DOCX counterparts are healthy and verified.
   - **Decision Required**: Decide whether to manually re-export these from DOCX to PDF to clean the repository.
"""

migration_content = """# AGENT INSTRUCTION MIGRATION

## Analysis of Legacy `.claude/CLAUDE.md` vs New `AGENTS.md`

### Rules Preserved
- `knowledge/` is read-only and overrides code/AI assumptions.
- The 13-stage content pipeline from `README.md` is strictly enforced.
- Domain to technical module mapping is preserved but expanded to all 17 domains.
- Implementation workflows (Architecture before implementation) are maintained.

### Rules Superseded
- `AGENTS.md` supersedes the basic 6-domain mapping in `CLAUDE.md` with a comprehensive 17-domain mapping and explicit domain ownership.
- The concept of "Sources of Truth" is expanded into a precise 6-Level Evidence Hierarchy (Verified -> Reconstructed -> Architecture -> Implementation -> AI Inference).

### Rules Missing in Legacy
- **Corruption Policy**: Handling of zero-filled media and lost original DOCX files.
- **Empty Folder Policy**: Rules against artificially populating empty directories.
- **Agent Skills**: `CLAUDE.md` lacked specific `.agents/skills` workflows for Knowledge Audit, Source Traceability, Asset Recovery, and Quality Gates.

### Conflicts
- None identified. `AGENTS.md` acts as a strict superset of `CLAUDE.md` governance principles.

### Required Human Review
- Should `CLAUDE.md` be deprecated in favor of `AGENTS.md`, or should they run in parallel?
"""

canonicalization_report_content = """# PHASE 8 — KNOWLEDGE CANONICALIZATION

## Canonical Sources
Domains 01-03, 05-06 have verified source documents established as canonical authorities. `Paket_Lengkap.pdf` acts as the canonical source for domains 07-17.

## Reconstructed Knowledge
The `04_SCRIPT` domain is based on reconstructed markdown logic. Domains 07-17 are reconstructed directly from `Paket_Lengkap.pdf` extractions and maintain a `RECONSTRUCTED` label.

## Corrupted Sources
- `01_BRAND/Brand Guideline-Master Book.pdf`
- `06_EDITING/06_EDITING.pdf`

## Lost Sources
- `04_SCRIPT.docx`

## Domain Dependency Map
Mapped fully in `domain-dependency-map.md`.

## Business Rule Ownership
Mapped in the `source-of-truth-matrix.md`.

## Terminology
Extracted and mapped in `terminology.md`.

## Knowledge Maturity
All 17 domains are `LEVEL 3 — DEFINED`. None are ready for implementation (`LEVEL 4`) until technical architecture is fully approved.

## Implementation Readiness
`READY WITH CONDITIONS`. Blocked by architecture approval and reconstructed knowledge authority.

## Human Decisions
Registered in `human-decision-register.md`.

## Legacy Agent Rules
Migrated and mapped in `agent-instruction-migration.md`. `AGENTS.md` acts as a superset.

## Conflicts
No unresolvable conflicts found in documentation.

## Remaining Gaps
Missing original `04_SCRIPT.docx` source.

## Final Recommendation
Knowledge canonicalization is locked. Proceed to architectural design (Phase 9) once human decisions are cleared.
"""

def main():
    base_dir = r"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS"
    docs_knowledge_dir = os.path.join(base_dir, "docs", "knowledge")
    os.makedirs(docs_knowledge_dir, exist_ok=True)
    
    files = {
        os.path.join(docs_knowledge_dir, "source-of-truth-matrix.md"): matrix_content,
        os.path.join(docs_knowledge_dir, "domain-dependency-map.md"): dependency_map_content,
        os.path.join(docs_knowledge_dir, "terminology.md"): terminology_content,
        os.path.join(docs_knowledge_dir, "implementation-readiness.md"): readiness_content,
        os.path.join(docs_knowledge_dir, "human-decision-register.md"): human_decisions_content,
        os.path.join(docs_knowledge_dir, "agent-instruction-migration.md"): migration_content,
        os.path.join(base_dir, "docs", "audit", "phase-8-canonicalization-report.md"): canonicalization_report_content
    }
    
    for path, content in files.items():
        with open(path, "w", encoding="utf-8") as f:
            f.write(content.strip() + "\n")
            
    print("PHASE 8 CANONICALIZATION GENERATION COMPLETE.")

if __name__ == "__main__":
    main()
