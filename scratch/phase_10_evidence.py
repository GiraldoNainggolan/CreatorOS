import os

entity_model = """# ENTITY MODEL (EVIDENCE-FIRST)

| Entity | Exact Term | Semantic Equivalents | Source File | Business Meaning | Identity | Owner | Lifecycle | Invariants | Persistence | Status | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Idea | Ide | Topik, Angle | `03_CONTENT_SYSTEM` | Seed concept for content | UUID | 03_CONTENT_SYSTEM | Idea -> Script | Must align with Brand | REQUIRED | VERIFIED | High |
| Script | Naskah | Script, Draft | `04_SCRIPT` | Written narrative/hook | UUID | 04_SCRIPT | Draft -> Approved | Length, Hook within 3s | REQUIRED | RECONSTRUCTED | Medium |
| Recording | Hasil Shoot | Raw Footage | `05_RECORDING` | Raw A-Roll/B-Roll | UUID | 05_RECORDING | Recorded -> Edited | No audio clipping | REQUIRED | VERIFIED | High |
| FinalCut | Hasil Edit | Final Video | `06_EDITING` | Polished video | UUID | 06_EDITING | Editing -> Approved | Follows Brand Guidelines | REQUIRED | VERIFIED | High |
| PublishedPost | Posting | Konten Publish | `07_POSTING` | Live asset on social | URL/ID | 07_POSTING | Scheduled -> Live | Platform compliant | REQUIRED | VERIFIED | High |
| ContentItem | N/A | Pipeline Asset, Konten | N/A | Orchestration wrapper across stages | UUID | Pipeline | Idea -> Post | Valid stage transitions | TRANSIENT | ARCHITECTURAL ABSTRACTION | Low (Concept exists, term does not) |
"""

aggregate_model = """# AGGREGATE MODEL

| Aggregate Root | Boundaries | Owned Entities | Owner Context | Rationale |
|---|---|---|---|---|
| Idea | Single concept | Idea | Content Production | Independent creation |
| Script | Narrative | Script | Content Production | Modifies Idea conceptually, but is a distinct asset |
| MediaAsset | Physical file | Recording, FinalCut | Content Production | Represents the physical video file |
| Post | Platform representation | PublishedPost | Content Distribution | Tied to platform APIs |

*Note: Since ContentItem is an ARCHITECTURAL ABSTRACTION, it is NOT an Aggregate Root. The system tracks the flow via correlation IDs between Idea -> Script -> MediaAsset -> Post.*
"""

value_object_catalog = """# VALUE OBJECT CATALOG

| Value Object | Business Concept | Used In | Source | Validation Rules |
|---|---|---|---|---|
| ToneOfVoice | Brand Voice | Script, Post | `01_BRAND.docx` | Must match Brand Guidelines |
| PlatformMetrics | Analytics Data | Analytics | `08_ANALYTICS.md` | Immutable after collection |
| Hook | First 3 seconds text | Script | `04_SCRIPT.md` | Must exist, must be impactful |
"""

lifecycle_model = """# LIFECYCLE MODEL

## Idea Lifecycle (03_CONTENT_SYSTEM)
`Draft` -> `Selected` -> `Passed to Scripting`

## Script Lifecycle (04_SCRIPT) - RECONSTRUCTED
`Draft` -> `Review` -> `Approved for Recording`

## Media Lifecycle (05_RECORDING / 06_EDITING)
`Raw` -> `Ingested` -> `Editing` -> `Review` -> `FinalCut` -> `Approved for Posting`

## Post Lifecycle (07_POSTING)
`Scheduled` -> `Published` -> `Archived`
"""

invariant_catalog = """# INVARIANT CATALOG

| Invariant | Enforced By | Source | Status |
|---|---|---|---|
| Content cannot be posted without an approved FinalCut | Pipeline | `README.md` | VERIFIED |
| FinalCut must pass Brand Guidelines check | QualityGate (01_BRAND) | `06_EDITING.docx` | VERIFIED |
| Script must contain a strong Hook | QualityGate (04_SCRIPT) | `04_SCRIPT.md` | RECONSTRUCTED |
"""

domain_open_questions = """# DOMAIN OPEN QUESTIONS

1. **ContentItem Persistence**: If `ContentItem` is just an orchestration correlation ID, do we need a dedicated `content_items` table, or do we just link `Idea.id` -> `Script.idea_id` -> `Media.script_id`?
2. **Reconstructed Script Invariants**: Are the hook/length constraints strictly enforced or soft warnings?
3. **Corrupted Media Definitions**: How do we define the lifecycle of meme assets if the originals are corrupt?
"""

persistence_boundaries = """# PERSISTENCE BOUNDARIES

| Data Category | Owning Context | Access Pattern |
|---|---|---|
| Production Flow (Idea, Script, Media) | Content Production Context | High Write (during creation), High Read (pipeline views) |
| Distribution Flow (Post, Metrics) | Content Distribution Context | Append-only Writes (metrics), High Read (dashboards) |
| Brand Rules | Brand Strategy Context | Read-heavy (validation), Rare Writes |
"""

conceptual_data_model = """# CONCEPTUAL DATA MODEL

*No SQL tables or foreign keys. purely conceptual mapping.*

**Content Production**
- `Idea` (Persisted)
- `Script` (Persisted)
- `MediaAsset` (Persisted, references cloud storage)

**Content Distribution**
- `PublishedPost` (Persisted, references MediaAsset)
- `PlatformMetric` (Persisted, references PublishedPost)

**Brand Strategy**
- `BrandConfig` (Persisted, singleton or versioned)

**Orchestration**
- `PipelineRun` (Transient / Orchestration State, optionally persisted for audit logs)
"""

database_readiness = """# DATABASE READINESS GATE

| Component | Status | Missing Requirements |
|---|---|---|
| Entity Definition | READY WITH CONDITIONS | Must confirm correlation vs abstraction for ContentItem |
| Aggregate Boundaries | READY | N/A |
| Lifecycle/Invariants | READY | N/A |
| SQL Schema | BLOCKED | Requires final human sign-off on entities |

**Overall Gate: READY WITH CONDITIONS**
"""

phase_10_report = """# PHASE 10 — DOMAIN MODEL & ENTITY EVIDENCE REPORT

## 1. ContentItem Analysis
**Is it a real business concept?** Yes, semantically ("a piece of content moving through the factory").
**What is its source terminology?** "Konten", "Pipeline Asset", varying by stage (Ide, Naskah, Hasil Edit).
**Who owns it?** The orchestration `Pipeline`.
**Does it need persistence?** As an orchestration correlation ID (TRANSIENT / ORCHESTRATION STATE). The actual persisted entities are Idea, Script, Media, and Post.
**What is its lifecycle?** Idea -> Post.
**What invariants protect it?** Cannot skip stages.
**What aggregate owns it?** None. It is an ARCHITECTURAL ABSTRACTION.
**Which context owns the aggregate?** Pipeline coordinates across contexts.
**What evidence supports the decision?** `README.md` and standard workflow logic across domains 03-07.
**What remains unknown?** Whether the operator prefers a unified database table for orchestration tracking.

## Confirmed Entities
- `Idea` (Ide)
- `Recording` (Hasil Shoot)
- `FinalCut` (Hasil Edit)
- `PublishedPost` (Posting)

## Reconstructed Entities
- `Script` (Naskah) - Medium confidence due to lost original.

## Architectural Abstractions
- `ContentItem`

## Unknown Entities
- None currently proposed.

## Persistence Decisions
Database schemas will be built around stage-specific entities (`Idea`, `Script`, etc.), not a monolithic `ContentItem` god-object table.

## Aggregate Decisions
Idea, Script, MediaAsset, and Post are independent aggregates to prevent locking and coupling.

## Lifecycle & Invariant Decisions
Strict append-only forward progression. Rule checks at boundary gates.

## Boundary Changes
No changes from Phase 9.1. The Consolidated Contexts model remains the most accurate representation.

## Script Risks
Still marked `RECONSTRUCTED`. Implementation depends on human approval.

## Database Readiness
**READY WITH CONDITIONS**.

## Human Decisions
- Decide on unified DB orchestration log vs pure relational foreign keys.
- Approve reconstructed Script rules.
"""

def main():
    base_dir = r"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS"
    docs_domain_dir = os.path.join(base_dir, "docs", "domain")
    docs_persistence_dir = os.path.join(base_dir, "docs", "persistence")
    docs_audit_dir = os.path.join(base_dir, "docs", "audit")
    docs_arch_dir = os.path.join(base_dir, "docs", "architecture")
    
    os.makedirs(docs_domain_dir, exist_ok=True)
    os.makedirs(docs_persistence_dir, exist_ok=True)
    os.makedirs(docs_audit_dir, exist_ok=True)
    os.makedirs(docs_arch_dir, exist_ok=True)
    
    files = {
        os.path.join(docs_domain_dir, "entity-model.md"): entity_model,
        os.path.join(docs_domain_dir, "aggregate-model.md"): aggregate_model,
        os.path.join(docs_domain_dir, "value-object-catalog.md"): value_object_catalog,
        os.path.join(docs_domain_dir, "lifecycle-model.md"): lifecycle_model,
        os.path.join(docs_domain_dir, "invariant-catalog.md"): invariant_catalog,
        os.path.join(docs_domain_dir, "domain-open-questions.md"): domain_open_questions,
        os.path.join(docs_persistence_dir, "persistence-boundaries.md"): persistence_boundaries,
        os.path.join(docs_persistence_dir, "conceptual-data-model.md"): conceptual_data_model,
        os.path.join(docs_persistence_dir, "database-readiness-gate.md"): database_readiness,
        os.path.join(docs_audit_dir, "phase-10-domain-model-report.md"): phase_10_report
    }
    
    for path, content in files.items():
        with open(path, "w", encoding="utf-8") as f:
            f.write(content.strip() + "\n")
            
    # Update implementation-gate.md
    impl_gate_path = os.path.join(docs_arch_dir, "implementation-gate.md")
    if os.path.exists(impl_gate_path):
        with open(impl_gate_path, "r", encoding="utf-8") as f:
            old_gate = f.read()
        update_text = "\n## PHASE 10 UPDATE\nEntity Model and Conceptual Persistence defined. Implementation Gate remains **READY WITH CONDITIONS** pending final architectural approval on ContentItem abstraction and Reconstructed Script rules.\n"
        with open(impl_gate_path, "w", encoding="utf-8") as f:
            f.write(old_gate + update_text)
            
    print("PHASE 10 EVIDENCE-FIRST ENTITY GENERATION COMPLETE.")

if __name__ == "__main__":
    main()
