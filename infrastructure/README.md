# Infrastructure

**Empty by design.** Nothing is provisioned or scripted here yet.

Infrastructure work is blocked on decisions that have not been made:

| Blocker | Where |
|---|---|
| ADR-003 — database engine | `docs/architecture.md` |
| ADR-008 — hosting target and CI | `docs/architecture.md` |
| Q7 — hosting budget and platform | `docs/context.md` |
| Q5 — media storage strategy | `docs/context.md` |

## Constraint to carry into any future decision

The primary development machine has **4 GB RAM and 128 GB storage**
(`knowledge/05_RECORDING/kecilan.docx`). A multi-container local stack is not
viable as the default developer path. Local development must be runnable without
Docker; containerisation, if adopted, is for deployment.

## What will live here once decided

Deployment configuration, environment templates (never actual secrets), CI
pipeline definitions, and backup/restore procedures for application data —
following the same 3-2-1 rule the business already applies to media
(`knowledge/05_RECORDING`, `11_BACKUP`).
