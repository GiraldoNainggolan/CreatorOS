# PHASE 10.2 — PERSISTENCE & LIFECYCLE GATE

## Final Entity Decisions
1. **Idea**, **PublishedPost** are BUSINESS ENTITIES.
2. **Script** is a RECONSTRUCTED ENTITY.
3. **Recording**, **FinalCut** are ASSET METADATA referencing physical assets.
4. **ContentItem** is a TRANSIENT ARCHITECTURAL ABSTRACTION.

## Persistence Decisions
- **Persist**: Idea, Script, Recording, FinalCut, PublishedPost.
- **Do Not Persist**: ContentItem (Orchestration state can be managed via events or a transient runner, it does not require a structural master table).

## Aggregate Decisions
- **Aggregate Roots**: Idea, Script, PublishedPost. (They have independent lifecycles and identities).
- **Persisted Artifacts (Not Aggregates)**: Recording, FinalCut. (They are immutable records of physical assets).

## Asset vs Business Record
A critical distinction is established:
- **Physical Asset**: The actual `.mp4` or raw footage binary stored in S3/Cloud.
- **Business Record (Asset Metadata)**: The database row representing `Recording` or `FinalCut`. It stores pointers (URIs), workflow state (Ingested, Approved), and technical metadata. The database does NOT store the asset.

## Cross-Context Contracts
- **Idea -> Script**: ARTIFACT TRANSFER / COMMAND.
- **Script -> Recording**: REFERENCE (The recording session queries the script).
- **Recording -> FinalCut**: ARTIFACT TRANSFER.
- **FinalCut -> PublishedPost**: EVENT (FinalCut Approved triggers Posting).
- **Pipeline -> All**: ORCHESTRATION.

## Script Reconstruction Risk
Every lifecycle state and quality rule belonging to `Script` is explicitly flagged as `RECONSTRUCTED`. The risk that these rules are incorrect is accepted, pending human replacement of the corrupted source file.

## Database Readiness
**DATABASE DESIGN STATUS: READY**

**Rationale:**
The critical persistence ownership, aggregate boundaries, and lifecycle information are now fully mapped and supported by the source-of-truth hierarchy. The risk regarding the `04_SCRIPT` domain is isolated to one aggregate and explicitly documented. The architectural abstraction trap (`ContentItem`) has been resolved. We are structurally ready to map these validated boundaries into database schemas.

## Remaining Unknowns
- Exact platform API limits for `PublishedPost` constraints (to be defined during implementation).
- Precise column mapping for the Asset Metadata (duration, resolution, etc.).

## Human Decisions
- Approval to proceed to Database Implementation (Phase 11) using this verified matrix.
