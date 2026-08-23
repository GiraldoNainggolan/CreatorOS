# PHASE 9 — DOMAIN & APPLICATION ARCHITECTURE

## Architecture Decision
The application will follow a **Modular Monolith** pattern with strict Bounded Contexts mapped to the 17 knowledge domains.

## Domain Boundaries
Explicitly documented in `domain-boundaries.md`. Dependencies strictly follow the 13-stage pipeline (Idea -> Post).

## Entities
Abstract business entities (ContentIdea, ScriptDraft, RawFootage, FinalCut, PublishedPost) defined in `entity-catalog.md`.

## Workflows
The Core Content Pipeline Workflow is defined in `workflow-catalog.md`.

## Business Rules
Cataloged in `business-rule-catalog.md`. 

## Module Contracts
`module-contracts.md` defines public boundaries.

## Pipeline / QualityGate
Identified as **Orchestration Modules / Application Services**, not core business entities. They manage cross-domain flow and rule validation.

## Database Readiness
Entities identified, persistence needs defined, but **no SQL schemas generated**.

## API & UI Readiness
Abstract use cases and screens identified. **No API or Vue code generated.**

## Architecture Risks
Identified in `architecture-risk-register.md`. The primary risk is the **RECONSTRUCTED DEPENDENCY** on `04_SCRIPT` logic.

## Implementation Gate
**NOT READY**. Detailed design and human approval required before Phase 10 (Implementation).

## Human Decisions
- Approval of the Reconstructed Script dependency logic before code generation.

## Tooling Diagnostics
Pyrefly virtual buffer diagnostics accurately classified as Editor artifacts. No fake files created.


## ARCHITECTURE CHALLENGE UPDATE (PHASE 9.1)
*Previous Assumption*: 17 Bounded Contexts mapping 1:1 to knowledge domains.
*Challenge*: 17 modules create artificial boundaries and distributed monolith anti-patterns over a single ContentItem lifecycle.
*Result*: The architecture has been revised to **6 Consolidated Business-Capability Modules**. Pipeline and QualityGate are confirmed as Application Orchestrators. See `phase-9-1-architecture-challenge.md` for details.
