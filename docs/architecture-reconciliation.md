# Architecture Reconciliation (Phase 2.5)

**Status:** PROPOSED

## 1. Executive Summary
This document reconciles the original CreatorOS Technical Design Specification with the new Tech Creator Operating System (TCOS) product concept. The primary shift involves centralizing **Content** as the core entity around which all 17 workspaces operate, and expanding the linear 1:1 content pipeline into a 1-to-N tree (One Idea → Multiple Content Variants). This ensures the architecture supports platform adaptation, content intelligence, and robust monetization linkages without fragmenting data into isolated silos.

## 2. Changes Required
- **Core Domain Shift:** Explicitly define `Content` as the central spine across all modules.
- **Relational Shift:** Move from a 1:1 Idea-to-Content relationship to a 1:N relationship (Idea → Multiple Content variants for platforms/formats).
- **Lifecycle Alignment:** Update the pipeline stages to the 12-stage TCOS lifecycle.
- **Taxonomy Expansion:** Introduce `Category` and `Topic` under `Pillar`.
- **New Capabilities:** Introduce the `Generator` orchestrator and link `KnowledgeBase`, `Repurpose`, and `DigitalProduct` to the `Content` entity.

## 3. Domain Model
**Content** is established as the central Aggregate Root/Entity within the orchestrating `Pipeline` module, addressable globally via a persistent `Content ID` (e.g., `CNT-2026-00001`).

**Conceptual Relationships to Content:**
```text
Content
├── Idea (Parent source)
├── Research (Audience/Knowledge inputs)
├── Hook & Content Angle (Metadata)
├── Script (Authored text)
├── Recording (Sessions & Assets)
├── Editing (Projects & Revisions)
├── Posting (Platform distribution)
├── Analytics (Performance metrics)
├── Repurpose (Child content variants)
└── Digital Product (Optional monetization link)
```

## 4. Content Lifecycle
The previous 13-stage pipeline is hereby deprecated and replaced with the aligned TCOS lifecycle:
1. `IDEA`
2. `RESEARCH`
3. `SCRIPT`
4. `RECORDING`
5. `EDITING`
6. `REVIEW`
7. `READY`
8. `SCHEDULED`
9. `PUBLISHED`
10. `ANALYZED`
11. `REPURPOSED`
12. `ARCHIVED`

*(Note: Previous stages like `HOOK`, `CAPTION`, `HASHTAG`, and `THUMBNAIL` are no longer standalone pipeline stages. They are now intrinsic metadata or tasks completed within the `SCRIPT`, `EDITING`, or `REVIEW` stages).*

## 5. Module Boundaries
The 17 UI menus (01_BRAND through 17_SOP) must be strictly treated as **WORKSPACES**, not independent data silos. 
- Workspaces like `04_SCRIPT`, `05_RECORDING`, and `06_EDITING` do not own independent lifecycles; they operate as specialized views/editors on the shared `Content` domain.
- **Circular Dependencies Avoidance:** Domain modules (e.g., Script, Recording) will not depend on each other. They interact by reading from or writing to the central `Content` via orchestration (Pipeline) and Domain Events, adhering to ADR-002.

## 6. Generator Architecture
**Decision:** The Content Generator should be architected as a **Cross-Cutting Orchestration Module** (similar to `Pipeline` and `QualityGate`), or a dedicated **Application Service** within `Pipeline`.
- **Reasoning:** Based on ADR-002, domain modules cannot depend on each other. A Generator must read from `Audience`, `Brand`, and `ContentSystem` (to get Personas, Angles, Hooks, Frameworks) and write to `Script` and `Pipeline` (to create the Content Item and its Draft Script). Placing this in a domain module would violate dependency rules. A cross-cutting orchestrator respects the inward-dependency rule.
- **Workflow Supported:** `Topic → Audience → Content Angle → Hook → Framework → Format → CTA → Generated Content`

## 7. Database Implications
*(Conceptual contract only; no migrations applied)*
- **Content Tree:** The `content_items` table requires a `parent_idea_id` (nullable) to support 1 Idea → N Content Variants, and a `source_knowledge_id` (nullable) for Knowledge Base integration.
- **Digital Product:** `content_items` requires an optional `digital_product_id` to establish the acquisition relationship.
- **Taxonomy:** Introduction of `categories` and `topics` tables, forming a hierarchy: `pillars` (1:N) `categories` (1:N) `topics`.
- **Metadata Columns:** Retention of `hook_type`, `content_angle`, `framework`, and `platform` directly on the `content_items` or related analytics tracking tables for future intelligence querying.

## 8. API Implications
- **Generator API (`POST /api/generator/generate`):** Accepts parameters (Topic, Angle, Framework, etc.) and orchestrates the creation of a new `Content` item.
- **Content Tree API (`GET /api/ideas/{id}/contents`):** Retrieves the 1:N tree of all content variants derived from a single idea.
- **Lifecycle API (`POST /api/content/{id}/transition`):** Moves the content through the 12 TCOS stages.
- **Platform Adaptation API:** Allows generating format-specific output for a particular `Content` item (e.g., converting a base script to a LinkedIn text format).
- **Repurpose API (`POST /api/content/{id}/repurpose`):** Spawns a new child `Content` item linked to the original parent `Content`.

## 9. Frontend Implications
- **Global Action:** A persistent "Generate Content" capability accessible globally across the SPA.
- **Workflow Dashboard:** The Dashboard will be restructured to focus on:
  - Production (Ideas, Scripts, Recording, Editing, Ready, Published)
  - Growth (Followers, Views, Reach, Engagement)
  - Business (Products, Sales, Revenue, Leads)
  - Tasks (Today's pipeline actions)
- **Workspaces:** Menus will act as filtered lenses over the `Content` pipeline rather than isolated apps.

## 10. ADR Conflicts & Decisions Required

### DECISION REQUIRED: Generator Module Boundary
- **Existing Decision (ADR-002):** Only `Pipeline` and `QualityGate` are cross-cutting modules.
- **New Product Requirement:** A global "Content Generator" that reads from multiple domains to instantiate Content.
- **Conflict:** A standard domain module cannot read from other domains to generate content without violating ADR-002 (no cross-domain dependencies).
- **Impact:** Architectural violation if placed incorrectly.
- **Recommended Decision:** Formally amend ADR-002 to introduce `Generator` as a third Cross-Cutting Module.

### DECISION REQUIRED: Content 1:N Relationship
- **Existing Decision (ADR-004):** Implied 1:1 relationship between an Idea, a ContentItem, and a Script.
- **New Product Requirement:** 1 Idea → Multiple Scripts → Multiple Platforms.
- **Conflict:** Data models defined in conceptual maps assume linear progression.
- **Impact:** Requires restructuring the Aggregate Roots to separate `Idea` from `ContentItem`.
- **Recommended Decision:** Elevate `Idea` to an Aggregate Root in `ContentSystem`. `Pipeline`'s `ContentItem` will hold a `parent_idea_id`.

## 11. Final Architecture Consistency Check
- [x] Product vision consistent (TCOS positioned for Tech Professionals)
- [x] Domain model consistent (Content is central)
- [x] Idea → Multiple Content supported conceptually
- [x] Lifecycle strictly follows 12-stage TCOS flow
- [x] Taxonomy hierarchically consistent (Pillar → Category → Topic)
- [x] Generator boundary identified as a necessary cross-cutting orchestrator
- [x] Module boundary defined (Menus = Workspaces, not silos)
- [x] Knowledge Base, Repurpose, Digital Product connected to Content
- [x] Analytics metadata guaranteed for future Content Intelligence
- [x] ADR conflicts isolated and decisions recommended
