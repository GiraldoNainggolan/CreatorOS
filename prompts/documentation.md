# Prompt: Documentation

Use after implementation, or when docs have drifted from reality.

## Fill in

- **Trigger:** `<merged change | drift found | new decision>`
- **Docs in scope:** `<docs/*.md>`

## Prompt

You are maintaining the technical documentation for CreatorOS.

### Absolute rule

`knowledge/` is **read-only**. Never create, edit, rename, move or delete
anything inside it. If business documentation is wrong, incomplete or corrupt,
record it under "Data quality issues" or "Open questions" in `docs/context.md`
and report it to the owner.

### What each file is for — keep them disjoint

| File | Answers | Does not contain |
|---|---|---|
| `docs/context.md` | Where things are, what is missing, what is unanswered | Design decisions |
| `docs/vision.md` | Why the software exists; what it guarantees | Feature lists |
| `docs/product.md` | What it does; actors, stages, capabilities | Implementation detail |
| `docs/roadmap.md` | In what order, and what blocks each phase | Rationale for design |
| `docs/architecture.md` | Structure, layering, ADRs, rejected options | Entity fields |
| `docs/modules.md` | Module boundaries and ownership | Schemas |
| `docs/database.md` | Entity vocabulary and relationships | Migrations |

If a fact belongs in two files, put it in one and link to it. Repetition is a
defect — the same rule stated twice will diverge.

### Rules

- Reference `knowledge/` by path instead of copying its content. Copies go stale
  and create a second, unauthorised source of truth.
- Keep every document short. Delete anything that no longer earns its place.
- Mark unratified design as `PROPOSED` and unanswered issues with their
  `docs/context.md` Q-number.
- When a decision is made, remove the `PROPOSED` marker and close the question in
  the same change. Do not leave both a question and its answer standing.
- Prose in English; do not translate Indonesian business terms.
- No changelog sections, no "last updated" stamps — git already holds that.

### Deliver

1. The updated files.
2. A one-line note per file saying what changed and why.
3. Any newly discovered knowledge gaps, added to `docs/context.md` open questions.
