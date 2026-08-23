# DATABASE READINESS

| Entity | Persistence Required? | Why? | Identity Required? | Lifecycle Required? | Audit Trail Required? | Relationships | Open Questions |
|---|---|---|---|---|---|---|---|
| ContentIdea | Yes | Tracking | Yes (UUID) | Yes | Yes (Append-only) | -> Brand | None |
| ScriptDraft | Yes | Tracking | Yes (UUID) | Yes | Yes (Append-only) | -> ContentIdea | How to handle versioning? |
| RawFootage | Yes | Tracking | Yes (UUID) | Yes | Yes | -> ScriptDraft | Are files stored locally or S3? |
| FinalCut | Yes | Tracking | Yes (UUID) | Yes | Yes | -> RawFootage | None |
| PublishedPost | Yes | Metrics | Yes (URL/ID) | Yes | Yes | -> FinalCut | Social API tokens? |

*Note: No SQL schemas, tables, or foreign keys are defined in Phase 9.*
