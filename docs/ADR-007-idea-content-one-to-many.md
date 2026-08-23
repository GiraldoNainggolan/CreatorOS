# ADR-007: Idea to Content 1:N Relationship

## Status
Proposed (Amends ADR-004: Domain Model Strategy & ADR-002: Module Boundaries)

## Context
Under the Tech Creator Operating System (TCOS) model, a core differentiator is the ability to derive multiple platform-specific and format-specific content pieces from a single creative concept. The previous architecture implicitly modeled a 1:1 progression (1 Idea = 1 ContentItem = 1 Script), which prevents efficient repurposing and platform adaptation.

## Problem
If `Idea` and `ContentItem` are tightly coupled or merged, we cannot track a workflow where a single concept ("Laravel Middleware") spawns an Instagram Reel, a LinkedIn text post, and a YouTube Short, each with their own distinct lifecycle, script, and publication schedule. 

## Existing Architecture
- `ContentItem` (Pipeline module) was the spine.
- `Idea` was considered a precursor state or absorbed into `ContentItem` directly.
- `Script` was conceptually 1:1 with `ContentItem`.

## Decision
We formally split **Idea** and **Content** into two distinct domain concepts with a 1:N relationship.

**Idea:**
- The creative source, planning intent, and conceptual seed.
- **Aggregate Root** owned by the `ContentSystem` module.
- Does *not* have a pipeline lifecycle (it is a library item).

**Content (`ContentItem`):**
- The executable, distributable instance of production.
- Has a persistent identity (e.g., `CNT-2026-00001`).
- Contains a mandatory reference to its parent `Idea` (`parent_idea_id`).
- Is an **Aggregate Root** owned by the `Pipeline` module.
- Has a strict 12-stage lifecycle.
- May be platform or format-specific.

## Relationship Rules
```text
Idea (1)
  ↓
  ├── ContentItem 1 (e.g., IG Reel, Stage: RECORDING)
  ├── ContentItem 2 (e.g., LinkedIn Post, Stage: DRAFT)
  └── ContentItem N ...
```
- A `ContentItem` is NOT a simple child record of `Idea`. Both are distinct Aggregate Roots living in different modules.
- They are linked via Identity reference (`idea_id` stored inside `ContentItem`), satisfying the aggregate boundary rules of ADR-004.
- `ContentItem` to `Script` remains 1:1 (one specific script instance per content variant).

## Rationale
To support TCOS platform adaptation, the production unit (`ContentItem`) must be decoupled from the conceptual unit (`Idea`). By making them separate Aggregate Roots linked by ID, we allow an Idea to spawn N Content Items over time without bloating a single aggregate.

## Consequences
- **Positive:** True 1:N repurposing and multi-platform content generation from a single idea is seamlessly supported.
- **Positive:** Analytics can eventually aggregate performance back up to the parent `Idea`.
- **Negative:** UI complexity increases, as the `Idea` bank must now display its derived `ContentItems` (requiring a Read Model joining both modules).

## Alternatives Considered
- **Array of Scripts inside ContentItem:** Rejected. If a `ContentItem` holds multiple scripts for different platforms, the 12-stage lifecycle becomes ambiguous (e.g., the IG Reel is Published, but the LinkedIn post is still in Draft). Each distributable asset needs its own lifecycle.

## Implementation Implications
- `Idea` becomes an explicit Aggregate Root in `ContentSystem`.
- `ContentItem` (in `Pipeline`) receives a `parent_idea_id` attribute.
- The Dashboard/UI will introduce visual groupings mapping an Idea to its production Pipeline variants.
- The `Generator` module (ADR-006) will orchestrate taking 1 Idea and instantiating N `ContentItem`s in the `Pipeline`.
