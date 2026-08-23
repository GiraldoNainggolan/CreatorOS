# Conceptual Domain Map

## Status
Proposed

## Context
Following the completion of the Architecture phase (ADRs 001-005), we are entering the System Design phase. This document serves as the conceptual blueprint of the business domain, defining the aggregates, their boundaries, events, and conceptual relationships before any data modeling (ERD) takes place. It enforces the rules established in ADR-004 (Domain Model Strategy).

## Business Domains
The system is divided into nine approved domains (seven core business domains and two cross-cutting orchestration domains):
1. Brand
2. Audience
3. ContentSystem
4. Script
5. Recording
6. Editing
7. Analytics
8. Pipeline (Cross-cutting)
9. QualityGate (Cross-cutting)
10. Generator (Cross-cutting)

## Aggregate Roots and Ownership
Each module encapsulates one or more Aggregate Roots (AR). Internal entities exist only within these aggregates.

### Brand
- **BrandProfile (AR):** Owns color tokens, typography tokens, and voice terms (preferred/banned).
- **QAChecklist (AR):** Owns the individual QA checklist items (e.g., social asset checklist, technical checklist).

### Audience
- **Persona (AR):** Owns specific pain points and dreams for a target audience.
- **AudienceInsight (AR):** Represents research items (FAQs, comments, DMs, polls, surveys).
- **Competitor (AR):** Tracks competitor data and identified gaps.
- **Keyword (AR):** Tracks viral keywords.

### ContentSystem
- **Pillar (AR):** A content pillar categorization.
- **TemplateLibrary (AR):** Manages Hook templates and CTA templates.
- **Framework (AR):** Manages storytelling frameworks and content formats.
- **Idea (AR):** The raw conceptual parent that spawns multiple Content variants.

### Script
- **Script (AR):** Owns script parts (hook, opening, closing, cta, caption, subtitle, voice-over, ai_prompt) and script versions. 

### Recording
- **RecordingSession (AR):** Owns the shot list items and raw assets produced (A-Roll, B-Roll, audio, screen recordings, photos).
- **Equipment (AR):** Reference catalog of physical gear.
- **CameraPreset (AR):** Reference catalog of recording configurations.
- **BackupRecord (AR):** Tracks the 3-2-1 backup state of physical drives/cloud.

### Editing
- **EditProject (AR):** Owns export versions and timecode-anchored revision notes.
- **EditAsset (AR):** Reference catalog of post-production assets (music, SFX, fonts, LUTs, motion graphics).
### Analytics
- **AnalyticsSnapshot (AR):** Owns performance metrics, ingestion data from platforms, and tracking for published content.

### Pipeline (Cross-cutting)
- **ContentItem (AR):** The spine of the application. Owns append-only stage history, repurpose links (parent/child), and publication records.

### QualityGate (Cross-cutting)
- **GateEvaluation (AR):** An immutable snapshot of a rule evaluation containing individual result items (pass/fail).

### Generator (Cross-cutting)
- **Orchestrator:** Does not own aggregates. Reads from Brand, Audience, ContentSystem, KnowledgeBase and orchestrates creation of Idea and ContentItems.

## Domain Relationships
Relationships across module boundaries are purely conceptual and maintained via ID references (ADR-004).
- `ContentItem` references `Pillar`, `Persona`, `Framework`, and `Idea` (as `parent_idea_id` for 1:N relationship).
- `Script` references `ContentItem` (1:1 conceptual link, one specific script instance per content variant).
- `RecordingSession` references `ContentItem` (N:1, multiple sessions can fulfill one item).
- `EditProject` references `ContentItem` (1:1 conceptual link).
- `GateEvaluation` references `ContentItem` (the target) and `QAChecklist` (the rule set used).

## Domain Events
To maintain module isolation, changes in state trigger domain events that other modules subscribe to. All cross-module events are dispatched **synchronously** within the same database transaction.

### Shared Kernel Events
- `ContentItemStageAdvanced` (Dispatched by Pipeline, Subscribers: Script, Recording, Editing - to initialize their respective aggregates when an item reaches their stage).
- `GateEvaluationPassed`, `GateEvaluationFailed` (Dispatched by QualityGate, Subscriber: Pipeline - to advance or block the Content Item stage to Published).
- `ScriptMarkedReady` (Dispatched by Script, Subscriber: Pipeline - to evaluate moving the stage to RECORD).
- `ExportVersionFinalized` (Dispatched by Editing, Subscriber: QualityGate - to trigger an evaluation before publication).

## Read Models
To satisfy UI requirements without violating boundaries (ADR-005):
- **PipelineBoardReadModel:** Aggregates data across modules to display the Kanban-style board. It projects the `ContentItem`'s current stage, the `Script`'s completion status, and `EditProject` progress into a single flattened DTO.
- **ContentItemDetailReadModel:** A comprehensive view assembling the associated Script, Recording Sessions, and Edit Project details for a specific `ContentItem`.

## Shared Kernel
Concepts used ubiquitously across modules that do not contain specific business logic:
- `ContentItemId` (UUIDv7)
- `Platform` (Enum: TikTok, Instagram, YouTube, LinkedIn, Facebook, Threads)
- `Stage` (Enum representing the 13 pipeline stages)
- `ContentFormat` (Enum representing specific formats driven by frameworks)
