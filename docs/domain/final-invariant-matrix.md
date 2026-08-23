# FINAL INVARIANT MATRIX

| Rule | Classification | Enforced By | Evidence | Status |
|---|---|---|---|---|
| "Pipeline stages cannot be skipped" | ORCHESTRATION RULE | Pipeline | `README.md` Flow | VERIFIED |
| "FinalCut must match Brand Guidelines" | QUALITY RULE | QualityGate (Editing) | `06_EDITING` | VERIFIED |
| "Script hook must be < 3s" | QUALITY RULE | QualityGate (Script) | `04_SCRIPT` | RECONSTRUCTED |
| "Post must comply with platform limits" | DOMAIN INVARIANT | Distribution Context | `07_POSTING` | VERIFIED |
| "Idea must align with core brand purpose"| DOMAIN INVARIANT | Content System Context | `03_CONTENT_SYSTEM` | VERIFIED |

*Note: We do not promote workflow sequence rules (Orchestration) or threshold checks (Quality) into structural Domain Invariants.*
