# ADR-004: Domain Model Strategy

## Status
Proposed

## Context
Following the establishment of the Modular Monolith (ADR-001), strict Module Boundaries (ADR-002), and the Database Strategy (ADR-003), we must define how business logic is structured within the application code. A Domain Model Strategy dictates how entities, behaviors, and rules extracted from the `knowledge/` business source of truth are modeled in memory before they hit the persistence layer.

## Problem
Designing the database schema before defining the domain model leads to a data-driven architecture where the database structure dictates business logic. This often results in an Anemic Domain Model heavily coupled to the ORM, making it difficult to enforce the strict module boundaries and business invariants required by CreatorOS. We need a strategy that protects domain rules from infrastructure concerns.

## Decision

We will adopt a **Rich Domain Model** approach utilizing Tactical Domain-Driven Design (DDD) patterns to encapsulate business logic.

1. **Aggregate Root strategy:** Each module will define its own Aggregate Roots. An Aggregate Root is the single entry point for a cluster of associated entities and value objects. All state mutations and invariant checks must occur through the Aggregate Root.
2. **Entity strategy:** Entities within an aggregate possess local identity but their lifecycle is exclusively managed by the Aggregate Root. They must not be accessed directly from outside the aggregate.
3. **Value Object strategy:** Concepts without distinct conceptual identity (e.g., Color Palette tokens, Timecodes, Platform Types) will be modeled as immutable Value Objects. They encapsulate validation and can be shared across modules if placed in the Shared Kernel.
4. **Aggregate boundaries:** An aggregate cannot span across module boundaries. It must reside entirely within its owning module, ensuring alignment with the business domains.
5. **Domain Service strategy:** Used exclusively for business logic that coordinates multiple aggregates within the same module, or logic that does not naturally fit into a single entity.
6. **Repository abstraction principles:** Repositories operate strictly at the Aggregate Root level (one repository per aggregate). They abstract the persistence mechanism (PostgreSQL) and prevent the domain layer from coupling to the database or ORM.
7. **Domain Event strategy:** To communicate across module boundaries without tight coupling, state changes are broadcast as Domain Events. Other modules can subscribe to these events (synchronously or asynchronously) instead of calling the mutating module directly.
8. **Cross-module references:** Cross-module associations are modeled strictly by Identity (UUIDv7, per ADR-003), never by direct object reference. There will be no direct ORM relationships across module boundaries.
9. **Read Model strategy:** When data spanning multiple modules is required for UI presentation, it will be assembled using dedicated Read Models (DTOs) populated by querying the public APIs of the respective modules, completely bypassing direct SQL joins. Read Models are exclusively owned by the module that exposes the primary Use Case (e.g., `Pipeline` owns `PipelineBoardReadModel`).
10. **Transaction boundaries:** A single transaction should ideally modify only one Aggregate Root. Cross-module consistency is orchestrated by the `Pipeline` module acting as a Process Manager, wrapping the necessary calls in a coordinating transaction where eventual consistency is insufficient.
11. **Identity lifecycle:** Application-generated UUIDv7s are assigned when the entity is instantiated in memory, entirely independent of the database insertion process.
12. **Invariant enforcement:** Business invariants are strictly enforced within the Aggregate Root during state mutation methods. Invalid state transitions will throw domain exceptions before reaching the persistence layer.
13. **Domain ownership:** The domain layer strictly mirrors the `knowledge/` folder structure. Business logic is encapsulated solely within this layer and must not leak into application services, controllers, or the database.
14. **Future extensibility:** Referencing external aggregates by ID and communicating via Domain Events ensures that any module can be safely extracted into a standalone service with zero refactoring to the domain model itself.

## Alternatives Considered

- **Rich Domain Model (Accepted):** Encapsulates behavior and data together, protecting invariants and aligning perfectly with the structured business knowledge.
- **Anemic Domain Model (Rejected):** Separating data (dumb entities) from behavior (fat services) scatters business logic and makes it impossible to guarantee that invariants are satisfied.
- **Active Record (Rejected):** Tying business logic directly to database persistence violates the strict module boundaries and clean architecture goals, leading to tight coupling between the domain and infrastructure.
- **Transaction Script (Rejected):** While simple, a procedural approach fails to enforce complex domain invariants gracefully and rapidly degrades into a "big ball of mud" as the application grows.

## Consequences

### Positive Consequences
- **Invariant Protection:** Impossible to persist invalid business states since the Aggregate Root controls all mutations.
- **Decoupled Infrastructure:** The domain model is entirely agnostic to the database, allowing for easier testing and future database migrations.
- **Strict Boundaries:** Enforces the 1:1 mapping with business domains at the code level.

### Negative Consequences
- **Learning Curve:** Requires developers to understand and apply Tactical DDD patterns rather than relying on standard rapid-application-development ORM features.
- **Increased Boilerplate:** Abstracting the ORM behind repositories and mapping to Domain Entities requires more upfront code than a simple Active Record approach.

### Trade-offs & Future Risks
- **Performance Trade-offs:** Assembling complex read views across modules via DTO mapping is slower than a direct SQL join. We accept this trade-off for the sake of boundary enforcement, anticipating the system's low traffic volume.
- **Over-engineering Risk:** There is a risk of applying aggregate boundaries too granularly or too broadly. Boundary adjustments require refactoring the domain layer.

## Out of Scope
This ADR strictly defines the domain modeling philosophy and rules. It **does NOT** define:
- Database tables
- Entity-Relationship Diagrams (ERDs)
- Database migrations
- Public module APIs
- Application implementation details
- Framework-specific ORM (Laravel Eloquent) models
