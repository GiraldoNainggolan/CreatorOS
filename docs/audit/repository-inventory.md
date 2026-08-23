# Repository Inventory

## Project Overview
CreatorOS is an AI-First Knowledge Operating System designed to transform structured business knowledge (stored in the `knowledge/` directory) into a content creation and management software. Currently, the repository represents Phase 1 (Workspace Initialization) where business rules have been documented and technical architecture is being designed, but no application code has been implemented.

## Architecture
- **Proposed Architecture:** Modular Monolith
- **Modules (Bounded Contexts):** Brand, Audience, ContentSystem, Script, Recording, Editing, Pipeline, QualityGate.
- **Layers:** Clean Architecture within each module (Presentation, Application, Domain, Infrastructure).

## Technology Stack
- **Frontend:** Vue.js 3 (Composition API, TypeScript, Pinia, TailwindCSS).
- **Backend:** Laravel 11.x (PHP 8.3).
- **Database:** PostgreSQL.
- **Deployment:** Linux VPS (Nginx).

## Directory Map
```text
CreatorOS/
├── .claude/         # Agent operating rules (CLAUDE.md)
├── backend/         # Empty (awaiting implementation)
├── docs/            # Technical Source of Truth (Architecture, ADRs, Models)
├── frontend/        # Empty (awaiting implementation)
├── infrastructure/  # Empty (awaiting implementation)
├── knowledge/       # Business Source of Truth (Business rules, workflows, assets)
└── prompts/         # Reusable prompt templates
```

## Important Files
- `README.md`: High-level context and priority rules.
- `.claude/CLAUDE.md`: Permanent AI agent instructions prioritizing `knowledge/` and `docs/`.
- `docs/context.md`: Context, open questions (UNKNOWNs), and identified issues in `knowledge/`.
- `docs/architecture.md`: Main structural proposal.
- `docs/ADR-*.md`: Key architecture decisions regarding modular monolith and DB strategy.

## Entry Points
- Currently, there are no application entry points as the `backend` and `frontend` directories are unpopulated.

## Commands
- None available in the repository at this stage.

## Dependencies
- No `package.json`, `composer.json`, or lockfiles exist within the project directories yet.

## Existing Documentation
- **Technical (`docs/`):** Comprehensive design specs including Architecture, Modules, Database (ERD), Roadmap, Product, Vision, Context, and 5 ADRs.
- **Business (`knowledge/`):** 17 domains mapping the production workflow (e.g., `01_BRAND`, `02_AUDIENCE`, `03_CONTENT_SYSTEM`). Includes `.txt`, `.docx`, `.pdf`, and `.xlsx` files.

## Existing Skills & Agent Instructions
- **Agent Instructions:** `.claude/CLAUDE.md` is present and active. `AGENTS.md` and `GEMINI.md` are absent.
- **Project Skills:** There are no project-specific skills (`.agents/skills`) currently checked into this repository. Global skills exist but belong to the wider system, not CreatorOS itself.

## Potential Problems
- **Corrupted Business Docs:** Identified previously that `04_SCRIPT/04_SCRIPT.docx` and some other `.docx` files are zero-filled/corrupted, blocking accurate domain understanding.
- **Missing Application Code:** The entire software layer is currently non-existent.
- **Non-Machine-Readable Files:** Heavy reliance on `.docx`, `.pdf`, and `.xlsx` in the `knowledge/` folder may hinder automated parsing by AI agents.

## Unknown Areas
- **Authentication/Tenancy (Q1):** The business documents mention "startup SaaS", but current architecture assumes a single-operator constraint.
- **Script Lifecycle (Q2):** Details lost due to corrupted `04_SCRIPT.docx`.
- **Publishing & Analytics Methods (Q3 & Q4):** Not explicitly defined whether these utilize external APIs or manual tracking.
- **Media Storage (Q5):** Ambiguity between index-only local files versus Object Storage (S3).
