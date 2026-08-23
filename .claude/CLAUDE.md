# CLAUDE.md — CreatorOS

Operating rules for any AI agent working in this repository.

These rules override default behavior and are mandatory.

---

# Repository Purpose

CreatorOS is an AI-first Knowledge Operating System.

Its purpose is to transform structured knowledge into software that supports content creation, portfolio building, digital products, and business workflows.

Business documentation already exists.

Your responsibility is to translate approved business knowledge into technical architecture and implementation while preserving documentation integrity.

---

# 1. Sources of Truth

| Layer | Location | Authority |
|-------|----------|-----------|
| Business | `knowledge/` | **Single Source of Truth.** Business rules, workflows, SOPs, brand, audience, content system, and product knowledge. |
| Technical | `docs/` | **Single Source of Truth.** Architecture, modules, database, roadmap, API, deployment. |
| Prompts | `prompts/` | Reusable prompt templates. |
| Code | `backend/`, `frontend/`, `infrastructure/` | Implementation only. Never the source of truth. |

Priority:

Business Knowledge

↓

Technical Documentation

↓

Implementation

If code conflicts with documentation:

- `knowledge/` wins.
- `docs/` must be updated to match `knowledge/`.
- Code must be updated to match `docs/`.

---

# 2. Context Loading Strategy

To minimize token usage:

1. Read `README.md` once at the beginning.
2. Read only the `knowledge/` files relevant to the current task.
3. Read only the matching documentation inside `docs/`.
4. Never scan the entire repository unless explicitly requested.
5. Reuse existing context whenever possible.
6. Do not repeatedly read files that are already in context.

---

# 3. Hard Rules

1. **knowledge/** is read-only.

   Never create, rename, delete, move, or reorganize anything inside `knowledge/`.

2. Never overwrite business documentation.

   If business information appears incorrect, report it instead of editing it.

3. Read before coding.

   Before implementing anything, read the relevant business documentation and technical documentation.

4. Architecture before implementation.

   New modules, services, APIs, database tables, or integrations require architectural approval before implementation.

5. Never redesign approved business workflows.

   Business processes defined inside `knowledge/` must remain unchanged unless explicitly requested.

6. Implement incrementally.

   One feature.

   One module.

   One vertical slice.

7. Keep documentation synchronized.

   Every implementation that changes the system must update the relevant documentation.

8. Minimize token usage.

   Avoid unnecessary explanations.

   Avoid repository-wide scans.

   Read only what is necessary.

---

# 4. Definition of Done

A task is complete only if:

- Relevant business documentation was read.
- Relevant technical documentation was read.
- Architecture was approved (if required).
- Implementation remains within the requested scope.
- Documentation has been updated.
- No files inside `knowledge/` were modified.
- No secrets or credentials were introduced.

---

# 5. Domain Mapping

| Business Domain | Technical Module | Documentation |
|----------------|------------------|---------------|
| `knowledge/01_BRAND/` | Brand | `docs/modules.md#brand` |
| `knowledge/02_AUDIENCE/` | Audience | `docs/modules.md#audience` |
| `knowledge/03_CONTENT_SYSTEM/` | Content System | `docs/modules.md#content-system` |
| `knowledge/04_SCRIPT/` | Script | `docs/modules.md#script` |
| `knowledge/05_RECORDING/` | Recording | `docs/modules.md#recording` |
| `knowledge/06_EDITING/` | Editing | `docs/modules.md#editing` |

Future domains must be approved before creation.

Do not invent new business domains.

---

# 6. Communication Rules

If something is unclear:

- Ask before making assumptions.
- Do not invent business rules.
- Explain architectural decisions briefly.
- Keep responses concise.
- Avoid repeating previously established context.

---

# 7. Decision Priority

When making decisions, always follow this order:

Business Knowledge

↓

Technical Documentation

↓

Approved Architecture

↓

Existing Implementation

↓

AI Reasoning

AI assumptions must never override repository documentation.

---

# 8. Repository Goal

Transform:

Knowledge

↓

Architecture

↓

Software

↓

Content

↓

Portfolio

↓

Digital Products

↓

Business

The knowledge repository is the heart of CreatorOS.

Protect it.