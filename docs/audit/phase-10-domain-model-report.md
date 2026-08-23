# PHASE 10 — DOMAIN MODEL & ENTITY EVIDENCE REPORT

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
