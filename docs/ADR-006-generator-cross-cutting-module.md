# ADR-006: Generator as a Cross-Cutting Module

## Status
Proposed (Amends ADR-002: Module Boundaries)

## Context
With the introduction of the Tech Creator Operating System (TCOS) concept, a central product feature is the "Content Generator." This capability orchestrates data from multiple domains (e.g., Brand voice, Audience personas, ContentSystem hooks and frameworks, KnowledgeBase inputs) to generate new Content Items and their initial drafts.

## Problem
According to ADR-002, domain modules must not depend on one another. If the Generator were placed inside `ContentSystem`, it would need to read from `Brand`, `Audience`, and `KnowledgeBase`, and then write to `Pipeline` and `Script`. This creates cross-domain dependencies, violating the strict boundaries and risking circular dependencies.

## Existing Architecture
- `Pipeline` and `QualityGate` are the only recognized cross-cutting orchestration modules (ADR-002).
- Domains only depend inward (Shared Kernel).

## Decision
The Generator will be formalized as a new **Cross-Cutting Orchestration Module** (`Generator`). 
It sits alongside `Pipeline` and `QualityGate`.

## Dependency Rules & Boundary
- **Reads:** The `Generator` module is permitted to read data (via public DTOs/Application Services) from `Brand`, `Audience`, `ContentSystem`, and `KnowledgeBase`.
- **Writes:** It orchestrates the creation of `Idea`, `ContentItem`, and `Script` records by invoking the respective application services of `ContentSystem`, `Pipeline`, and `Script`.
- **Ownership:** The `Generator` does **not** own any domain entities (it does not own Idea, Content, Hook, or Script). It is strictly an orchestration layer.

## Rationale
To preserve the modular monolith's anti-corruption boundaries (ADR-002), any logic that fundamentally requires aggregating data across multiple business domains to synthesize a new output must live above the domain layer. A cross-cutting module is the designated pattern for this in our architecture. 

## Consequences
- **Positive:** Domain modules (`Brand`, `Audience`, `ContentSystem`, `Script`) remain completely decoupled and ignorant of each other.
- **Positive:** The generation logic (AI prompting, orchestration) is centralized in one module, making it easy to test and swap.
- **Negative:** Adds a third cross-cutting module, slightly increasing architectural surface area.

## Alternatives Considered
- **Application Service within `ContentSystem`:** Rejected. It would force `ContentSystem` to depend on `Brand` and `Audience`, violating ADR-002.
- **Application Service within `Pipeline`:** Rejected. `Pipeline` is responsible for state transition and lifecycle tracking, not creative generation. Mixing generation logic into `Pipeline` would violate the Single Responsibility Principle.

## Implementation Implications
- The `Generator` module will have Presentation (API endpoints like `/api/generate`), Application (Orchestrator services), and Infrastructure (LLM integration/prompts) layers.
- It will NOT have a Domain layer with database tables, as it does not persist entities of its own. It solely calls the commands of other modules to persist generated outputs.
