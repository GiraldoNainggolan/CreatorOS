# FINAL PERSISTENCE MATRIX

| Concept | Owner | Type | Persist? | Aggregate? | Lifecycle | Invariant | Evidence | Confidence |
|---|---|---|---|---|---|---|---|---|
| **Idea** | Content System | BUSINESS ENTITY | PERSIST | AGGREGATE ROOT | Draft -> Approved | Must align with Brand | `03_CONTENT_SYSTEM` | High |
| **Script** | Content Production | RECONSTRUCTED ENTITY | PERSIST | AGGREGATE ROOT | Draft -> Approved | Hook < 3s | `04_SCRIPT` | Low (Corrupted) |
| **Recording** | Content Production | ASSET METADATA | PERSIST | PERSISTED ARTIFACT | Raw -> Ingested | No audio clipping | `05_RECORDING` | High |
| **FinalCut** | Content Production | ASSET METADATA | PERSIST | PERSISTED ARTIFACT | Edit -> Approved | Brand checks pass | `06_EDITING` | High |
| **PublishedPost** | Content Distribution | BUSINESS ENTITY | PERSIST | AGGREGATE ROOT | Scheduled -> Live | Platform compliant | `07_POSTING` | High |
| **ContentItem** | Pipeline | ARCHITECTURAL ABSTRACTION | DO NOT PERSIST | NO AGGREGATE SEMANTICS | N/A | N/A | Pipeline Logic | High |

**Why does this information need to survive?**
- **Idea**: Needs to survive to seed production and retain conceptual history.
- **Script**: Needs to survive as the reference document governing the recording session.
- **Recording/FinalCut**: Needs to survive to store cloud storage URIs, workflow state, and metadata referencing the physical assets.
- **PublishedPost**: Needs to survive to anchor live platform metrics (Analytics).
