# Future State Plan

## GAP 1: Missing Application Foundation
**CURRENT STATE:** `backend/` and `frontend/` are completely empty.
**PROBLEM:** Cannot begin module implementation or test API contracts.
**TARGET STATE:** A scaffolded Laravel 11 and Vue 3 application that respects the Modular Monolith architecture.
**REQUIRED ARTIFACTS:**
- `backend/composer.json`, `backend/artisan`, `backend/app/Modules/`
- `frontend/package.json`, `frontend/src/modules/`
**DEPENDENCIES:** Database configuration.
**IMPLEMENTATION ORDER:**
1. Initialize backend (Phase 0 Roadmap).
2. Initialize frontend (Phase 0 Roadmap).
3. Setup CI/CD and Linting.
**VALIDATION:** `php artisan serve` and `npm run dev` start successfully.

## GAP 2: Missing Agent Infrastructure
**CURRENT STATE:** Reliance on legacy `.claude/CLAUDE.md`.
**PROBLEM:** Missing Antigravity-native `AGENTS.md` and custom skills, limiting agent autonomy and context management.
**TARGET STATE:** Fully migrated `AGENTS.md` and `.agents/skills/` directory.
**REQUIRED ARTIFACTS:**
- `AGENTS.md` (Global rules, knowledge integrity constraints).
- `.agents/skills/parse-knowledge/SKILL.md` (Skill to safely read business rules).
**DEPENDENCIES:** None.
**IMPLEMENTATION ORDER:**
1. Create `AGENTS.md` migrating core constraints.
2. Design progressive skills based on actual workflow.
**VALIDATION:** Agent successfully uses `AGENTS.md` to refuse destructive changes to `knowledge/`.

## GAP 3: Pipeline Stage Ambiguity
**CURRENT STATE:** Folders `07_POSTING` to `17_SOP` are intentionally empty.
**PROBLEM:** Without documented SOPs, developers will invent implementation details for these stages.
**TARGET STATE:** Explicit technical definitions for these stages (e.g., "Posting is tracked manually via boolean flags, no API needed").
**REQUIRED ARTIFACTS:**
- Updated `docs/architecture.md` clarifying empty pipeline boundaries.
**DEPENDENCIES:** User decisions (Q3, Q4 from Roadmap).
**IMPLEMENTATION ORDER:**
1. Resolve Roadmap questions.
2. Update technical blueprint.
**VALIDATION:** Architecture document explicitly lists stages 7-17 as "Data-only" or provides SOPs.

## GAP 4: Orphan and Duplicate Files
**CURRENT STATE:** `Media sosial spesialist.pdf` is an orphan. `Goals 5 Tahun.txt` is a duplicate.
**PROBLEM:** Cluttered knowledge graph and logical contradictions.
**TARGET STATE:** Organized repository where every file maps to a specific domain context.
**IMPLEMENTATION ORDER:**
1. Delete duplicates / placeholders (Safe Fixes).
2. Move orphans to `16_BUSINESS`.
**VALIDATION:** The `knowledge/` root contains only domain folders and core index files.
