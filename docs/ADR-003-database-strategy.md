# ADR-003: Database Strategy

## Status
Proposed

## Context
Following ADR-001 (Modular Monolith) and ADR-002 (Module Boundaries), the system requires a data persistence strategy that enforces strict module isolation while remaining lightweight enough to run on a low-resource environment (4GB RAM). We need to establish rules for how the database will be structured, how modules will interact with data, and how consistency will be maintained without violating the architectural boundaries defined in ADR-002.

## Problem
Before designing any schema, we must make architectural decisions regarding the database engine, module data ownership, cross-module data access, identity generation, and transaction boundaries. These decisions must ensure that the database does not become a backdoor for tight coupling (a "big ball of mud"), while keeping resource usage minimal for the initial single-operator deployment target.

## Decision

1. **Database engine:** PostgreSQL. It is robust, enforces strict typing, supports JSONB for flexible snapshotting (e.g., in `QualityGate`), and has a small enough footprint for the low-resource target when tuned correctly.
2. **Overall database topology:** A single physical PostgreSQL database instance. 
3. **Module ownership strategy:** Each module owns its own tables exclusively. A table belongs to exactly one module.
4. **Cross-module data access rules:** Direct SQL joins or foreign key constraints across module boundaries are strictly prohibited. Modules must access other modules' data exclusively through their public interfaces/DTOs in the application layer.
5. **Identifier strategy (UUID vs BIGINT):** UUIDv7 (time-ordered UUIDs) for all primary keys. This ensures global uniqueness (simplifying future multi-user/sync expansion) while maintaining database index performance and locality.
6. **Timestamp and timezone policy:** All timestamps must be stored in UTC (`TIMESTAMP WITH TIME ZONE`). Timezone conversions occur exclusively in the frontend/presentation layer.
7. **Soft delete policy:** Soft deletes are mandated for all reference and work entities to prevent accidental data loss. Hard deletes are permitted only for transient data or cross-reference (junction) tables.
8. **Audit trail strategy:** `Pipeline` stage transitions and `QualityGate` evaluations are append-only and immutable. Other entities rely on standard `created_at` and `updated_at` tracking, with soft deletes acting as a basic retention mechanism.
9. **Migration strategy:** Migrations are segregated by module. Each module manages its own schema lifecycle, ensuring that a module can be deployed or tested in isolation.
10. **Naming conventions:** `snake_case` for all tables and columns. All tables must be prefixed with their owning module's name (e.g., `brand_profiles`, `script_records`) to enforce clear visual boundaries in the single database.
11. **Indexing strategy:** Foreign keys (internal to the module), polymorphic identity columns, and frequently filtered fields (e.g., status) must be indexed. Over-indexing is to be avoided to conserve RAM and disk space on the target machine.
12. **Transaction boundaries:** Transactions are typically confined to a single module's boundary. For cross-module workflows, consistency relies on a parent transaction wrapping synchronous event listeners (Synchronous Event Choreography), ensuring atomic commits without complex orchestration sagas.
13. **Concurrency strategy:** Optimistic locking (via an `updated_at` or `version` check) for mutable work entities to prevent lost updates, accommodating future multi-user access or multi-tab single-user scenarios.
14. **Backup and restore philosophy:** The database must be easily dumpable via standard tools (`pg_dump`). Backups will follow the business's existing 3-2-1 backup rule, treating the database dump as a critical production asset.
15. **Future scalability considerations:** The strict prohibition of cross-module joins and the use of UUIDs guarantee that if any module becomes a bottleneck and needs to be extracted into a separate service, its data can be seamlessly migrated to a separate database without breaking foreign key constraints.

## Alternatives Considered

- **Single PostgreSQL Database (Accepted):** Provides the right balance of operational simplicity for a single operator while offering schemas/prefixes to enforce boundaries.
- **Database-per-module (Rejected):** Running 8 separate database instances or connection pools on a 4GB RAM machine would consume excessive resources and complicate local development unnecessarily.
- **Multi-schema (PostgreSQL schemas) (Rejected in favor of table prefixes):** While technically superior for isolation, native multi-schema support in the proposed framework (Laravel) requires complex configuration and often breaks ecosystem tooling. Table prefixes (`module_tablename`) achieve the same logical boundary with zero friction.
- **Event Store (Rejected):** Event sourcing across all modules adds massive complexity and storage overhead. The append-only pipeline history fulfills the audit requirements without the burden of full event sourcing.
- **NoSQL (Rejected):** The business domains (Brand, Audience, ContentSystem) represent highly structured, relational data. A document store would shift the burden of maintaining relationships into the application layer, increasing memory usage.

## Consequences

### Positive Consequences
- **Resource Efficiency:** A single PostgreSQL instance with prefixed tables minimizes memory and CPU overhead on the target hardware.
- **Enforced Boundaries:** Prohibiting cross-module joins forces developers to respect the Modular Monolith boundaries at the application layer.
- **Future-Proofing:** UUIDv7 and isolated tables mean moving to a multi-database or microservice architecture later requires zero data migration effort.

### Negative Consequences
- **Performance Overhead:** Fetching related data across modules requires multiple database queries and application-level assembly instead of a single highly optimized SQL join.
- **Data Integrity:** We cannot rely on database-level Foreign Key constraints to enforce referential integrity across modules; the application layer must handle this.

### Technical Debt & Future Migration Risks
- Without cross-module foreign keys, orphaned records could occur if a module fails to clean up references during a soft delete. We accept this as a trade-off for decoupled modules.

## Out of Scope
This ADR strictly defines the database architecture and strategy. It **does NOT** define:
- Tables or specific column definitions
- Entities or ORM models
- Entity-Relationship Diagrams (ERDs)
- Public module APIs or repositories
- Specific implementation details

These elements will be defined in subsequent, domain-specific design documents.
