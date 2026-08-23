# Implementation Roadmap
**Status:** PROPOSED

## Sequence Strategy
The implementation is sequenced strictly by architectural dependency. Core reference data must exist before workflow orchestration can begin.

### Phase 0: Foundation
- **Objective:** Setup Laravel 11, Vue 3, PostgreSQL. Establish `app/Modules/` structure.
- **Deliverables:** Base classes, DTO mappers, API envelope formats, Auth (Sanctum) implementation.
- **Tests:** Framework and DB connectivity tests.

### Phase 1: Reference Data (The Library Layer)
- **Objective:** Implement `Brand`, `Audience`, `ContentSystem`.
- **Deliverables:** CRUD APIs for Master Data (Personas, Hooks, Frameworks, Brand rules).
- **Tests:** Unit tests for Aggregates. Integration tests for Application Services.

### Phase 2: Pipeline Backbone & Core Workflow
- **Objective:** Implement `Pipeline` module and its Read Models.
- **Deliverables:** The `ContentItem` aggregate. The 13-stage append-only transition logic. Vue Kanban Board UI.
- **Tests:** E2E Pipeline transitions.

### Phase 3: Vertical Slice — Idea to Script
- **Objective:** Implement `Script` module integrated with `Pipeline`.
- **Deliverables:** Script authoring API, script parts. Transition rules (Draft → Ready).
- **Tests:** Event firing verification (`ScriptMarkedReady` advances Pipeline).

### Phase 4: Production & Post-Production Logs
- **Objective:** Implement `Recording` and `Editing` tracking.
- **Deliverables:** Tracking dashboards, metadata schemas, Backup trackers.

### Phase 5: Quality Gate & Hardening
- **Objective:** Implement `QualityGate`.
- **Deliverables:** Rule evaluation engine. Blockers for the `UPLOAD` stage.
- **Tests:** Security and edge-case validation.

---

## Decision Register (Required Approvals)

| ID | Question | Current Evidence | Recommended Option | Impact | Need User Approval |
|---|---|---|---|---|---|
| Q1 | Auth/Tenancy Scope | "startup SaaS" goals vs "solo operator" reality | Single-User with `owner` role via Sanctum | Simplifies initial DB and Auth | YES |
| Q2 | Script Transitions | `04_SCRIPT.docx` is corrupt | DRAFT → READY → PUBLISHED | Unblocks Phase 3 | YES |
| Q3 | Publishing Method | Missing in `07_POSTING` | Manual Tracking (No external APIs yet) | Prevents scope creep | YES |
| Q4 | Analytics Source | Missing in `08_ANALYTICS` | Manual Input + CSV Import | No API integrations needed | YES |
| Q5 | Media Storage | `05_RECORDING` mentions Drive/SSD | Index-Only (No S3/Object Storage) | Keeps 4GB RAM server alive | YES |
| Q7 | Hosting Target | Cost constrained | $5-$10/mo Linux VPS (Nginx/Postgres) | Simple monolith deployment | YES |
