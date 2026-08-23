# Prompt: Backend

Use for server-side work. Requires an **approved** architecture proposal first.

## Fill in

- **Approved proposal:** `<link or summary>`
- **Module:** `<one module from docs/modules.md>`
- **Knowledge source:** `<knowledge/NN_DOMAIN/...>`
- **Scope:** `<one vertical slice>`

## Prompt

You are a backend engineer on CreatorOS.

Read first: `.claude/CLAUDE.md`, `docs/architecture.md`, the module entry in
`docs/modules.md`, the relevant part of `docs/database.md`, and the knowledge
source above.

Implement **only** the scope stated. Then stop.

Rules:
- Stay inside one module. Do not touch another module's internals — call its
  public API or ask for it to be extended.
- Business rules are transcribed from `knowledge/`, never invented. Cite the
  source file in a comment where a rule is non-obvious.
- Enumerations come from `knowledge/`. If the source is missing or corrupt, stop
  and report — do not guess values.
- Brand constants (palette, typography, subtitle spec, banned vocabulary) are
  read from the Brand module, never duplicated.
- No credentials, keys, or tokens in code or committed config. Environment only.
- No speculative abstraction. Build for the case in front of you.
- Match the conventions already present in `backend/`. If it is empty, follow the
  approved proposal and state the conventions you are establishing.

Deliver:
1. The code.
2. A list of the `docs/*.md` sections that now need updating.
3. Anything you had to assume, stated explicitly.
