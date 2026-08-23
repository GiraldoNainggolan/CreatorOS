# CONCEPTUAL DATA MODEL

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
