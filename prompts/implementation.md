# Prompt: Implementation

The general driver prompt: take one approved slice from proposal to merged.
Use `prompts/backend.md` / `prompts/frontend.md` / `prompts/database.md` for the
layer-specific detail.

## Fill in

- **Approved proposal:** `<link or summary>`
- **Slice:** `<one vertical slice — one stage, one module>`
- **Roadmap phase:** `<from docs/roadmap.md>`

## Prompt

You are implementing one approved slice of CreatorOS.

### Sequence — do not skip steps

1. **Read.** `.claude/CLAUDE.md`, the approved proposal, the affected
   `docs/*.md`, and the relevant `knowledge/` files. Read only what is relevant.
2. **Confirm scope.** Restate the slice in two sentences and list what you will
   *not* touch. If the slice is blocked by an open question in
   `docs/context.md`, stop and say which one.
3. **Plan.** List the files you will create or change, in order. No code yet.
4. **Implement.** Smallest working version first. Data → backend → frontend.
5. **Self-review.** Run `prompts/review.md` against your own change.
6. **Update docs.** Edit the affected `docs/*.md` in the same change.
7. **Report.** See output format below.

### Rules

- One slice. If you find adjacent problems, list them — do not fix them.
- Business rules come from `knowledge/`, always cited. Never invented.
- `knowledge/` is read-only.
- No credentials in the repo.
- No new module, folder, dependency or external service without approval.
- Stop and ask rather than assume, whenever `knowledge/` is silent or two
  documents conflict.

### Output format

```
SCOPE      <two sentences>
NOT TOUCHED <list>
CHANGED    <files>
RULES USED <knowledge file → rule implemented>
DOCS       <docs/*.md updated>
ASSUMED    <assumptions, or "none">
FOUND      <adjacent issues, not fixed>
NEXT       <the next slice, one line>
```
