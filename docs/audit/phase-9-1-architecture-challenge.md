# PHASE 9.1 — ARCHITECTURE CHALLENGE

## Executive Decision
The initial assumption of a 1:1 mapping between the 17 knowledge folders and application bounded contexts is **REJECTED**. The architecture will proceed with **Option B: Consolidated Business-Capability Modules**, grouping the 17 domains into 6 cohesive bounded contexts.

## Boundary Challenge & Domain Reclassification
17 knowledge domains create artificial boundaries over highly cohesive lifecycles. They have been reclassified into Core, Supporting, Reference, and Generic contexts. Detailed in `boundary-challenge-matrix.md`.

## Merge Candidates
We successfully identified 5 major merge candidates:
1. **Production**: Script + Recording + Editing
2. **Distribution**: Posting + Analytics + Repurpose
3. **Brand**: Brand + Audience
4. **Assets**: Asset + AI + Knowledge Base
5. **Business**: Digital Product + Portfolio + Business + SOP

## Separation Candidates
None identified. The domains were already too fragmented rather than too monolithic.

## Entity Ownership
- `ContentIdea`, `ScriptDraft`, `RawFootage`, `FinalCut` are all owned by **Content Production Context**.
- `PublishedPost` is owned by **Content Distribution Context**.
- `BrandGuideline` is owned by **Brand Strategy Context**.

## Pipeline & QualityGate
These are explicitly classified as **Orchestration / Application Services**. They do not own entities and are not bounded contexts.

## Coupling Analysis
The consolidation drastically reduces coupling. `Pipeline` still has HIGH coupling to all stages, but this is intentional as an orchestrator. Domain-to-domain coupling is LOW.

## Modular Monolith Assessment
**STRONGLY JUSTIFIED**. A single VPS target, 4GB RAM constraint, and single operator explicitly demand a monolith. Network boundaries would introduce unnecessary failure modes.

## Clean Architecture Assessment
**JUSTIFIED WITH CONDITIONS**. Clean Architecture (Domain, App, Infra layers) will be applied to the **Core** contexts (Production, Distribution). Supporting/Generic contexts (e.g., Asset Library) will use a simpler CRUD structure to avoid unnecessary ceremony.

## Persistence Consequences
A single Postgres database is confirmed. Data will be grouped logically by context, but transactions can safely span contexts if orchestrated by `Pipeline` since it's a monolith. No SQL schema designed yet.

## API & UI Consequences
The UI will feature unified dashboards (e.g., a "Production Board") rather than fragmented 17-tab interfaces. API routes will follow the 6 contexts, not 17 domains.

## Script Reconstruction Risk
Dependencies inside the `Content Production Context` on `04_SCRIPT` remain **RECONSTRUCTED DEPENDENCIES**.

## Implementation Gate
**READY WITH CONDITIONS**. The architecture is now sound and evidence-backed. It is blocked only by the final human approval of the Reconstructed Script rules and corrupted media decisions before proceeding to Phase 10 Implementation.
