# Product Architecture Alignment (TCOS)

**Status:** ANALYSIS COMPLETED

This document outlines the alignment between the newly provided Tech Creator Operating System (TCOS) product concept and the existing technical documentation (TDS, conceptual maps, etc.).

## 1. Product Concepts Already Represented (KEEP)
- **Content as Central Entity:** The existing architecture correctly identifies `ContentItem` as the spine of the product, with pipeline stages.
- **Modular Monolith & Shared Kernel:** The boundaries (Brand, Audience, ContentSystem, Script, etc.) map well to the 17 workspace menus.
- **Platforms:** `Platform` is already a Shared Kernel Enum (TikTok, Instagram, YouTube, LinkedIn, Facebook, Threads).
- **Repurpose & Digital Product concepts:** Already listed as future business domains in `product.md`.

## 2. Product Concepts Not Yet Represented (ADD)
- **TCOS Positioning:** Positioning as a "Content Operating System for Tech Professionals" with a "Content Generator" at its core.
- **Content Taxonomy:** Currently we only have `Pillar`. We are missing `Category` and `Topic`.
- **Content Generator Workflow:** Global "Generate Content" action that takes (Topic, Audience, Angle, Hook, Framework, Format, CTA) to output into the pipeline.
- **1 Idea → Multiple Content:** The capability of a single idea spawning multiple hooks, scripts, formats, and platforms.
- **Knowledge Base as Input:** Using real-world projects/code/problems as direct sources for the Content Generator.
- **Digital Product Relationship:** Direct mapping of Content to Digital Products for monetization tracking.
- **Action-Oriented Dashboard:** Organizing the dashboard around Production, Growth, Business, Tasks, and Pipeline.

## 3. Contradictions Between TDS and Product Concept (CHANGE)
- **Content Lifecycle Stages:**
  - **TDS:** IDEA, RESEARCH, HOOK, SCRIPT, RECORD, EDIT, CAPTION, HASHTAG, THUMBNAIL, UPLOAD, ANALYTICS, REPURPOSE, ARCHIVE
  - **TCOS Concept:** IDEA, RESEARCH, SCRIPT, RECORDING, EDITING, REVIEW, READY, SCHEDULED, PUBLISHED, ANALYZED, REPURPOSED, ARCHIVED
  - **Conflict:** Hook, Caption, Hashtag, Thumbnail are removed as standalone pipeline stages in TCOS and absorbed into Content Generator / Production.
- **1:1 vs 1:N Relationships:**
  - **TDS:** Assumes `ContentItem` is a linear 1:1 journey.
  - **TCOS Concept:** 1 Idea can result in multiple scripts for multiple platforms (Platform Adaptation).

## 4. Module Boundary Adjustments (DECISION REQUIRED)
- **Generator Domain:** Should the "Content Generator" be an Application service orchestrating `ContentSystem` and `Script`, or its own Bounded Context?
- **Workspace vs Bounded Context:** Clarify that the 17 menus in the UI are "Workspaces" that interact with the central `ContentItem`, rather than 17 isolated data silos.

## 5. Entities to Add (ADD)
- `Category` and `Topic` (under `ContentSystem`).
- `ContentAngle`, `HookType` (under `ContentSystem`).
- `KnowledgeProject`, `KnowledgeItem` (under `KnowledgeBase`).
- `DigitalProduct` (under `Business` or `DigitalProduct`).

## 6. Relationships to Fix (CHANGE)
- `Idea` (1) ↔ `ContentItem` (N): An idea must be a parent entity that can spawn multiple platform-specific content items.
- `ContentItem` (N) ↔ `DigitalProduct` (M): Optional relationship mapping content to revenue sources.
- `Knowledge` (1) ↔ `Idea` / `ContentItem` (N): Traceability from tech knowledge to content.

## 7. Shared Domain Concept: Content Lifecycle (CHANGE)
The pipeline Enum in the Shared Kernel must be updated to exactly match the TCOS lifecycle:
`IDEA` → `RESEARCH` → `SCRIPT` → `RECORDING` → `EDITING` → `REVIEW` → `READY` → `SCHEDULED` → `PUBLISHED` → `ANALYZED` → `REPURPOSED` → `ARCHIVED`

## 8. API Implications (ADD)
- **Global Generator API:** A new orchestration endpoint `/api/generate` that handles the LLM/Algorithm integration taking TCOS parameters and returning `ContentItems`.
- **Content Tree API:** Endpoints to visualize the 1-to-N relationship of Idea to platform-specific scripts.

## 9. Frontend Architecture Implications (CHANGE)
- **Global Actions:** A persistent "Generate Content" CTA in the layout.
- **Routing:** The 17 menus should be routed as Workspaces that filter or act upon the global `ContentItem` store, rather than disconnected pages.
- **Dashboard UI:** Restructure `DashboardLayout` or `Home` to focus on Production pipelines, Growth metrics, and Business KPIs, replacing generic widgets.

## 10. Design System Implications (CHANGE)
- **Persistent ID Display:** The UI must support rendering `CNT-2026-00001` consistently across all tables, headers, and modals.
- **Platform Variants:** UI components needed for Platform Adaptation (e.g., showing Instagram vs LinkedIn specific formatting constraints side-by-side).
- **Status Badges:** `AppBadge` variants must strictly map to the new TCOS lifecycle stages.

## 11. Database Implications (CHANGE)
- **Taxonomy Tables:** Add `categories` and `topics`.
- **Content Item Updates:** Add `parent_idea_id`, `digital_product_id`, `content_angle`, `hook_type` to `content_items` (or related models).
- **ID Generation:** Database triggers or Application-level generation for custom readable ID formats (`CNT-YYYY-XXXXX`).

## 12. Future Intelligence Implications (ADD)
- **Metadata Retention:** Every `ContentItem` must durably store its `Pillar`, `Topic`, `HookType`, `Angle`, `Framework`, and `Format`.
- **Analytics Joinability:** The architecture must ensure that future `Analytics` records can be joined against these metadata fields to compute "Best Hook", "Best Angle", etc., without expensive refactors.
