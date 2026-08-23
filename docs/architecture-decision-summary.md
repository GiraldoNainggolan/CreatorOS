# Architecture Decision Summary

This document acts as an index and status tracker for all Architecture Decision Records (ADRs) within the CreatorOS project.

| ADR | Title | Status |
|---|---|---|
| **[ADR-001](./ADR-001-overall-architecture.md)** | Overall Software Architecture (Modular Monolith) | Proposed |
| **[ADR-002](./ADR-002-module-boundaries.md)** | Module Boundaries | Proposed *(Amended by ADR-006 & ADR-007)* |
| **[ADR-003](./ADR-003-database-strategy.md)** | Database Strategy | Proposed |
| **[ADR-004](./ADR-004-domain-model-strategy.md)** | Domain Model Strategy (Rich Domain Model) | Proposed *(Amended by ADR-007)* |
| **[ADR-005](./ADR-005-application-architecture.md)** | Application Architecture (Clean Architecture) | Proposed |
| **[ADR-006](./ADR-006-generator-cross-cutting-module.md)** | Generator as a Cross-Cutting Module | Proposed |
| **[ADR-007](./ADR-007-idea-content-one-to-many.md)** | Idea to Content 1:N Relationship | Proposed |

## Active Architectural Principles (TCOS Era)
1. **Modular Monolith**: Strict adherence to Domain Driven Design and Bounded Contexts.
2. **Content as Core**: `ContentItem` is the central aggregate root representing the distributable production unit, orchestrated by the `Pipeline`.
3. **1:N Generation**: An `Idea` (creative intent) spawns multiple `ContentItem` variants for different platforms and formats via the `Generator`.
4. **Cross-Cutting Orchestration**: The `Pipeline`, `QualityGate`, and `Generator` are the only modules permitted to orchestrate across domains.
5. **No Direct Domain Dependencies**: Core business domains (`Brand`, `Audience`, `ContentSystem`, `Script`, `Recording`, `Editing`) do not depend on one another. Cross-domain interactions are handled via orchestration or Domain Events.
