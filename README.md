# CreatorOS

> AI-First Knowledge Operating System

CreatorOS is the software implementation of an existing Brand & Content Operating System.

Its purpose is to transform knowledge into content, portfolio, digital products, and business assets through a documentation-first workflow.

**Current Status**

Workspace initialized.

No application code exists.

Architecture has not yet been approved.

---

# Repository Structure

```
CreatorOS
│
├── .claude/
├── knowledge/
├── docs/
├── prompts/
├── backend/
├── frontend/
├── infrastructure/
└── README.md
```

---

# Source of Truth

| Layer | Location | Purpose |
|--------|----------|----------|
| Business | knowledge/ | Business rules, SOP, workflows, templates |
| Technical | docs/ | Architecture, database, modules, roadmap (API and deployment: planned) |
| AI Rules | .claude/CLAUDE.md | Permanent Claude Code instructions |

Priority

```
knowledge/

↓

docs/

↓

code
```

Business documentation always overrides AI assumptions.

---

# Content Pipeline

Canonical source: `knowledge/03_CONTENT_SYSTEM/Content Operating System.txt`

```
IDEA

↓

RESEARCH

↓

HOOK

↓

SCRIPT

↓

RECORD

↓

EDIT

↓

CAPTION

↓

HASHTAG

↓

THUMBNAIL

↓

UPLOAD

↓

ANALYTICS

↓

REPURPOSE

↓

ARCHIVE
```

13 stages.

This workflow is considered stable.

Never redesign it unless explicitly requested.

The source file names the first stage `IDE` (Indonesian). It is written `IDEA` in technical documentation and code to avoid collision with "Integrated Development Environment".

---

# Documentation

| File | Purpose |
|------|---------|
| docs/context.md | Repository overview |
| docs/vision.md | Product vision |
| docs/product.md | Product specification |
| docs/roadmap.md | Development roadmap |
| docs/architecture.md | Software architecture |
| docs/modules.md | Module definitions |
| docs/database.md | Database design |

---

# Claude Code Workflow

Before doing any task:

1. Read README.md
2. Read .claude/CLAUDE.md
3. Read only the relevant knowledge documents
4. Read only the relevant technical documents
5. Ask if business rules are ambiguous

Do not scan unrelated files.

Do not overwrite business documentation.

---

# Current Phase

Phase 1

Workspace Initialization

Current Objective

Convert business knowledge into technical architecture.

No application code should be generated until the architecture is approved.