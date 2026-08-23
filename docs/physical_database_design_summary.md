# Physical Database Design Summary

This document aggregates the complete physical database strategy for CreatorOS, spanning all 8 bounded contexts (Brand, Audience, Content System, Script, Recording, Editing, Pipeline/Posting, and Analytics). It serves as the definitive reference for database implementation.

## 1. All Approved Physical Database Designs

### Brand Module
- **Tables**: `brand_profiles` (AR), `qa_checklists` (AR), `checklist_items` (Internal).
- **Design Details**: Soft deletes active; UUIDv7 primary keys. `checklist_items` holds an ON DELETE CASCADE FK to `qa_checklists`.
- **JSONB**: `brand_profiles.color_tokens`, `brand_profiles.typography_tokens`, `brand_profiles.voice_terms`.

### Audience Module
- **Tables**: `personas` (AR), `pain_points` (Internal), `dreams` (Internal), `audience_insights` (AR), `competitors` (AR), `content_gaps` (Internal), `keywords` (AR).
- **Design Details**: Internal entities enforce ON DELETE CASCADE FKs to their ARs.
- **JSONB**: `personas.demographics`, `keywords.search_metrics`.

### Content System Module
- **Tables**: `pillars` (AR), `template_libraries` (AR), `hook_templates` (Internal), `cta_templates` (Internal), `frameworks` (AR), `structure_steps` (Internal), `ideas` (AR).
- **Design Details**: Strict partial unique indexes for active entity names and step order.
- **JSONB**: `hook_templates.platform_constraints`, `cta_templates.platform_constraints`.

### Script Module
- **Tables**: `scripts` (AR), `script_parts` (Internal), `script_versions` (Internal).
- **Design Details**: Scripts maintain a soft link `content_item_id` to Pipeline.
- **JSONB**: `script_versions.snapshot_data`.

### Recording Module
- **Tables**: `recording_sessions` (AR), `shot_list_items` (Internal), `raw_assets` (Internal), `equipment` (AR), `camera_presets` (AR), `backup_records` (AR).
- **Design Details**: All intra-module relationships use strict physical FKs.
- **JSONB**: `camera_presets.settings_configuration`.

### Editing Module
- **Tables**: `edit_projects` (AR), `edit_assets` (AR), `export_versions` (Internal), `revision_notes` (Internal).
- **Design Details**: Projects maintain a soft link `content_item_id` to Pipeline. Internal entities use `ON DELETE CASCADE` physical FKs to `edit_projects.id`.
- **JSONB**: None.

### Posting (Pipeline) Module
- **Tables**: `content_items` (AR), `stage_histories` (Internal), `repurpose_links` (Internal), `publication_records` (Internal).
- **Design Details**: `repurpose_links` utilizes two physical FKs (`parent_item_id`, `child_item_id`) pointing back to `content_items.id`.
- **JSONB**: None.

### Analytics Module
- **Tables**: `analytics_snapshots` (AR).
- **Design Details**: Snapshots contain `content_item_id` as a soft link to Pipeline.
- **JSONB**: `analytics_snapshots.metrics`.

---

## 2. Total Tables
**Total count: 32 tables** across 8 bounded contexts.

---

## 3. Cross-Module UUID References (Soft Links)
No physical Foreign Keys cross bounded contexts (per `ADR-003`). The following soft links map identity between modules:
- `scripts.content_item_id` &rarr; `content_items.id`
- `recording_sessions.content_item_id` &rarr; `content_items.id`
- `edit_projects.content_item_id` &rarr; `content_items.id`
- `content_items.pillar_id` &rarr; `pillars.id`
- `content_items.persona_id` &rarr; `personas.id`
- `content_items.framework_id` &rarr; `frameworks.id`
- `analytics_snapshots.content_item_id` &rarr; `content_items.id`
- *Note: `gate_evaluations` (QualityGate) will reference `content_items.id` and `qa_checklists.id`.*

---

## 4. JSONB Usage Summary
Reserved strictly for Value Objects and Unstructured Data:
- `brand_profiles` (`color_tokens`, `typography_tokens`, `voice_terms`)
- `personas` (`demographics`)
- `keywords` (`search_metrics`)
- `hook_templates` / `cta_templates` (`platform_constraints`)
- `script_versions` (`snapshot_data`)
- `camera_presets` (`settings_configuration`)
- `analytics_snapshots` (`metrics`)

---

## 5. Index Strategy Summary
- **Primary Keys**: B-tree index on all `id` (UUIDv7) columns.
- **Foreign Keys**: B-tree index on all intra-module FK columns.
- **Cross-Module References**: B-tree index on all soft link columns (e.g., `content_item_id`).
- **Partial Indexes**: `idx_<table_name>_deleted_at` on every table `WHERE deleted_at IS NULL`.
- **GIN Indexes**: Applied to queryable JSONB arrays/objects (e.g., `voice_terms`, `platform_constraints`).

---

## 6. Constraint Strategy Summary
- **Physical FKs**: Used exclusively within bounded contexts with `ON DELETE CASCADE` for internal entities.
- **CHECK Constraints**: String-based enum emulation (e.g., `status IN ('Draft', 'Active')`) and structural guarantees (`jsonb_typeof() = 'array'`).
- **UNIQUE Constraints**: Heavy use of partial unique indexes (`WHERE deleted_at IS NULL`) to maintain invariant uniqueness without colliding on soft-deleted rows.

---

## 7. Remaining Open Questions
- **None**. The database architecture fully aligns with all ADRs, DDD constraints, and PostgreSQL best practices.
