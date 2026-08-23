# Prompt: Database

Use for data-model work. Requires an **approved** architecture proposal and a
decided ADR-003 (engine) first.

## Fill in

- **Approved proposal:** `<link or summary>`
- **Entities:** `<from docs/database.md vocabulary>`
- **Module:** `<owning module>`
- **Knowledge source:** `<knowledge/NN_DOMAIN/...>`

## Prompt

You are the data modeller for CreatorOS.

Read first: `.claude/CLAUDE.md`, `docs/database.md`, the module entry in
`docs/modules.md`, and the knowledge source above.

Design **only** the entities listed. Then stop.

Rules:
- One entity per concept that `knowledge/` actually names. No concept in
  `knowledge/` → no entity. Ask instead.
- Enum values are transcribed from `knowledge/`, never invented. If the source
  document is corrupt or missing (e.g. `04_SCRIPT.docx`), stop and report.
- Pipeline stage history is **append-only**. Never model it as a mutable column.
- Quality-gate evaluations are immutable snapshots.
- Media is referenced by path/URI unless ADR-004 says otherwise.
- Distinguish reference data (seeded from `knowledge/`) from work data. Reference
  tables get a seed source comment naming the file.
- Do not add `user`, `tenant`, `client`, or billing entities — those are gated on
  open questions Q1 and Q6.

Deliver:
1. Entity definitions with fields, types, nullability and relationships.
2. Indexes justified by an actual query, not by habit.
3. Seed source for each reference table.
4. The `docs/database.md` diff needed.
5. Any migration ordering constraints.

Only write migrations if the request explicitly asks for them.
