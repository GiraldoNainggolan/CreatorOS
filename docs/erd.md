# Database Specification (ERD & Architecture)
**Status:** PROPOSED

## PostgreSQL Data Model (Conceptual & Logical)

### 1. Brand Module
- **`brand_profiles`** (AR)
  - `id` (UUIDv7, PK)
  - `name` (VARCHAR, Not Null)
  - `created_at`, `updated_at`, `deleted_at`
- **`brand_color_tokens`**
  - `id` (UUIDv7, PK)
  - `brand_profile_id` (UUIDv7, FK to brand_profiles)
  - `hex_value` (VARCHAR)
  - `usage` (VARCHAR)
- **`brand_qa_checklists`** (AR)
  - `id` (UUIDv7, PK)
  - `type` (VARCHAR - 'social' or 'technical')
- **`brand_qa_items`**
  - `id` (UUIDv7, PK)
  - `checklist_id` (UUIDv7, FK)
  - `rule_description` (TEXT)

### 2. Audience Module
- **`audience_personas`** (AR)
  - `id` (UUIDv7, PK)
  - `name` (VARCHAR, e.g., 'Mahasiswa')
- **`audience_pain_points`**
  - `id` (UUIDv7, PK)
  - `persona_id` (UUIDv7, FK)
  - `description` (TEXT)

### 3. ContentSystem Module
- **`cs_pillars`** (AR)
  - `id` (UUIDv7, PK)
  - `name` (VARCHAR)
- **`cs_frameworks`** (AR)
  - `id` (UUIDv7, PK)
  - `type` (VARCHAR)

### 4. Script Module
- **`script_records`** (AR)
  - `id` (UUIDv7, PK)
  - `content_item_id` (UUIDv7, Logical Reference to pipeline_items)
  - `status` (VARCHAR, 'DRAFT', 'READY', 'PUBLISHED')
- **`script_parts`**
  - `id` (UUIDv7, PK)
  - `script_id` (UUIDv7, FK)
  - `part_type` (VARCHAR, 'hook', 'body', 'cta')
  - `content` (TEXT)

### 5. Pipeline Module (The Spine)
- **`pipeline_items`** (AR - ContentItem)
  - `id` (UUIDv7, PK)
  - `title` (VARCHAR)
  - `current_stage` (VARCHAR, Enum 1-13)
  - `pillar_id` (UUIDv7, Logical Reference to cs_pillars)
- **`pipeline_stage_history`**
  - `id` (UUIDv7, PK)
  - `pipeline_item_id` (UUIDv7, FK)
  - `stage` (VARCHAR)
  - `entered_at` (TIMESTAMP UTC)
  - *Note: Append-only, no updates.*

### 6. QualityGate Module
- **`gate_evaluations`** (AR)
  - `id` (UUIDv7, PK)
  - `content_item_id` (UUIDv7, Logical Reference)
  - `checklist_id` (UUIDv7, Logical Reference)
  - `is_passed` (BOOLEAN)
  - `snapshot` (JSONB)
  - *Note: Immutable records for audit.*

## Relationships & Cross-Module Boundaries
- **Intra-Module (1:N, 1:1):** Enforced via PostgreSQL Foreign Keys (e.g., `brand_color_tokens.brand_profile_id` references `brand_profiles.id` with `ON DELETE CASCADE`).
- **Inter-Module (Logical Relationships):** `script_records.content_item_id` stores a UUIDv7 but DOES NOT have a strict foreign key constraint to `pipeline_items.id`. This prevents cross-module DB coupling. Data integrity is managed at the Application layer.

## Database Integrity
- **Transaction Boundaries:** Strictly confined to Application Service execution blocks.
- **Concurrency:** Optimistic locking via `updated_at` on mutable Aggregates (e.g., `script_records`).
- **Soft Deletes:** Applied to `pipeline_items`, `script_records`, `audience_personas` using `deleted_at`.
- **Check Constraints:** Enforced on ENUM strings (e.g., `CHECK (current_stage IN ('IDEA', 'RESEARCH', ...))`).
