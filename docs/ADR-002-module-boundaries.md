# ADR-002: Module Boundaries

## Status
Proposed

## Context
Following the decision in ADR-001 to adopt a Modular Monolith architecture, we need to explicitly define the boundaries, responsibilities, and dependency rules of the modules within the backend. These boundaries must strictly mirror the business knowledge domains to ensure a 1:1 mapping between the business documentation (`knowledge/`) and the technical implementation, simplifying the mental model and AI agent workflows.

## Decision

We define eight distinct modules: six core business domains (Bounded Contexts) and two cross-cutting orchestration modules. 

### Bounded Contexts & Module Responsibilities
1. **Brand:** Owns the identity system, brand rules, typography, palette, voice vocabulary, and QA checklists. Never owns content, scripts, or per-item decisions. Provides rules for other modules to obey.
2. **Audience:** Owns personas, pain points, dreams, and audience research inputs. Never owns individual audience member data (no CRM).
3. **ContentSystem:** Owns content pillars, hook/CTA libraries, storytelling frameworks, idea bank, and the pipeline definition. Never owns the actual scripts written from these frameworks.
4. **Script:** Owns script records, lifecycle states, platform variants, and script parts. Enforces brand vocabulary guard at authoring time. Never owns publication or library definitions.
5. **Recording:** Owns production sessions, asset indexing, checklists, profiles/presets, and backup tracking. Never owns the actual media bytes (acts as an index for external storage).
6. **Editing:** Owns post-production queues, software templates, presets, export pipeline, naming conventions, and revision tracking. Never performs media rendering.

### Cross-Cutting Modules
7. **Pipeline:** Owns the Content Item entity, orchestrates its movement through the 13-stage pipeline, tracks append-only stage history, and handles repurpose links. Never owns stage-specific business data.
8. **QualityGate:** Evaluates Brand rules (social/technical checklists) and persists immutable evaluation results (`GateEvaluation`). Blocks transition into `Published`.
9. **Analytics:** Owns performance metrics, ingestion from platforms, and tracking for published content.

### Shared Kernel
- A minimal shared kernel exists to represent the identity of a **Content Item** and basic Value Objects (e.g., Platform enums, common identifiers) that must be referenced across modules. 
- Cross-module integration Domain Events (e.g., lifecycle/stage transition events) reside in the Shared Kernel to allow pub/sub without coupling to specific modules.
- While `Pipeline` orchestrates the Content Item's lifecycle, the domain modules attach their specific data to it.

### Public Interfaces
- Modules must communicate exclusively through explicit public interfaces (e.g., Service contracts, public facades, or DTOs). 
- Direct database access across module boundaries is strictly prohibited. 

### Allowed Dependencies & Dependency Rules
- **Dependency Direction:** Dependencies point inward toward the core domains.
- `Pipeline` may depend on all six domain modules (`Brand`, `Audience`, `ContentSystem`, `Script`, `Recording`, `Editing`).
- `QualityGate` depends on `Brand` (to read rules).
- **Strict Rule:** Domain modules must NEVER depend on `Pipeline`.
- **Strict Rule:** Domain modules must NEVER depend on each other's internals. Cycles are prohibited.

### Anti-Corruption Boundaries
- Modules must not leak their internal domain models. Data crossing module boundaries must be mapped to public DTOs to prevent coupling.
- `QualityGate` serves as a behavioral anti-corruption layer, ensuring a Content Item strictly conforms to Brand rules before advancing, preventing non-compliant state from corrupting downstream stages.
- The `Recording` module maintains an anti-corruption boundary against the physical filesystem/external storage, mapping external paths to internal asset indices without pulling external complexity into the domain.

## Consequences
- **Positive:** High cohesion and low coupling across the application, preventing the "big ball of mud" typically associated with monoliths.
- **Positive:** Safe and isolated development per module; agents know exactly where business logic lives.
- **Negative:** Increased boilerplate due to the requirement of public interfaces and DTO mapping between modules.
- **Negative:** Enforcing boundaries requires disciplined architectural testing in CI to catch cyclic or illegal dependencies automatically.
