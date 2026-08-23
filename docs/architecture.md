# Architecture

> **STATUS: PROPOSED — NOT APPROVED.**
> Nothing in this file is settled. No code may be written against it until the
> owner approves it and the `PROPOSED` markers are removed
> (`.claude/CLAUDE.md`, rule 4).

## Drivers

| Driver | Source | Consequence |
|---|---|---|
| Single operator, high cadence | `docs/product.md` (Actors) | Optimise for one user's speed, not for scale. |
| 4 GB RAM / 128 GB dev machine | `knowledge/05_RECORDING/kecilan.docx` | No heavy local stack. No local Kubernetes, no multi-container dev by default. |
| No media processing in-app | `docs/vision.md` (Non-goals) | No transcoding, no render workers. Index metadata only. |
| Owner's stack | `knowledge/01_BRAND/02_Positioning/Expertise Matrix.txt` | Laravel + REST backend, React/Next.js + Tailwind frontend, Python for analytics. |
| Reference data is large and mostly read | `docs/roadmap.md` Phase 1 | Cache-friendly, read-optimised library layer. |
| Brand rules must be enforced, not documented | `docs/vision.md` | Rules live in a validation layer, not in UI hints. |

## Proposed shape

Modular monolith. One deployable backend, one deployable frontend. Module
boundaries mirror the six knowledge domains exactly — no more, no fewer.

```
┌──────────────── frontend/ ────────────────┐
│  React + Tailwind SPA                     │
│  Pipeline board · Library · Editors       │
└────────────────┬──────────────────────────┘
                 │ REST/JSON
┌────────────────▼──────────────────────────┐
│  backend/  (Laravel, modular monolith)    │
│                                           │
│  Brand │ Audience │ ContentSystem         │
│  Script │ Recording │ Editing             │
│  ───────────────────────────────────────  │
│  Pipeline  (orchestrates Content Items)   │
│  QualityGate (enforces brand + QA rules)  │
└────────────────┬──────────────────────────┘
                 │
        ┌────────▼────────┐
        │  Relational DB  │   see docs/database.md
        └─────────────────┘
```

**Why a monolith and not services.** One operator, one deployment budget, one
codebase, and every module shares the Content Item. Services would add network
failure modes to buy scaling nobody needs.

**Why module boundaries = knowledge domains.** It makes `.claude/CLAUDE.md`
rule 3 mechanical: a code path maps to exactly one knowledge folder, so an agent
always knows which business document is authoritative.

## Layering rules (apply once approved)

1. Domain modules never call each other's internals — only public module APIs.
2. `Pipeline` may depend on all six domain modules. No domain module depends on
   `Pipeline`. Dependencies point inward, never in a cycle.
3. `QualityGate` is a pure rule evaluator: input is a Content Item snapshot,
   output is a pass/fail list. It performs no I/O and owns no state.
4. Brand constants (palette, typography, subtitle spec, banned vocabulary) are
   seeded from `knowledge/`, never hardcoded in two places.
5. The frontend holds no business rules. It renders `QualityGate` results.

## Open decisions (ADRs required before Phase 1)

| # | Decision | Options | Gated by |
|---|---|---|---|
| ADR-001 | Backend framework | Laravel (owner's stated stack) vs. alternative | — |
| ADR-002 | Frontend | Next.js (SSR) vs. plain React SPA | Hosting choice, Q7 |
| ADR-003 | Database | PostgreSQL vs. MySQL vs. SQLite | Q7, expected data volume |
| ADR-004 | Media strategy | Index-only (Drive/SSD stays canonical) vs. object storage | Q5 |
| ADR-005 | Auth | Single local account vs. multi-user | Q1 |
| ADR-006 | Publishing | Platform APIs vs. manual publish + record | Q3 |
| ADR-007 | Analytics ingest | API poll vs. CSV import vs. manual entry | Q4 |
| ADR-008 | Hosting & CI | VPS vs. managed PaaS vs. self-host | Q7, budget |

Q-numbers refer to `docs/context.md` → Open questions.

## Cross-cutting concerns

- **Security.** No credentials in the repo. Environment-only secrets. This is a
  brand-level requirement, not just a technical one — see the technical QA
  checklist in the Master Book, page 11.
- **Auditability.** Stage transitions on a Content Item are append-only, so the
  pipeline history survives edits.
- **Observability.** Structured logs first; no APM until there is a second user.
- **Backup.** Application data follows the same 3-2-1 rule the business already
  applies to media (`knowledge/05_RECORDING`, `11_BACKUP`).

## Rejected for now

| Option | Reason |
|---|---|
| Microservices | No scaling driver; one operator. |
| Event sourcing across all modules | Complexity far exceeds the domain's needs. Append-only stage history is enough. |
| Local Docker Compose as the default dev path | 4 GB RAM machine. Keep it optional. |
| In-app video processing | Explicit non-goal (`docs/vision.md`). |
