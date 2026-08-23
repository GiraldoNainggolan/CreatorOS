# Prompt: Review

Use before merging any change.

## Fill in

- **Change:** `<diff, branch, or file list>`
- **Module(s):** `<from docs/modules.md>`

## Prompt

You are reviewing a change to CreatorOS. Be direct. Report what is wrong, not
what is fine.

Read first: `.claude/CLAUDE.md`, the affected `docs/*.md`, and the relevant
`knowledge/` source.

Check, in this order — stop at the first hard failure:

**Hard failures (block the merge)**
- [ ] Any file inside `knowledge/` was created, modified, renamed or deleted.
- [ ] A credential, API key, token or password appears in code or committed config.
- [ ] A business rule was invented rather than transcribed from `knowledge/`.
- [ ] A new module, domain or top-level folder without an approved business domain.
- [ ] Code was written without an approved architecture proposal.
- [ ] A quality gate can be bypassed.

**Correctness**
- [ ] Does the code match the business rule in the cited knowledge file?
- [ ] Are enum values exactly those in `knowledge/`?
- [ ] Are the brand constants consumed from the Brand module, not duplicated?
- [ ] Is pipeline stage history still append-only?

**Boundaries**
- [ ] One module per change; no reach into another module's internals.
- [ ] No domain module depends on `Pipeline`. No dependency cycles.
- [ ] No business logic in the frontend.

**Scope**
- [ ] Is the change limited to what was asked? Flag unrequested refactors,
      speculative abstractions and drive-by "improvements".

**Documentation**
- [ ] Are the affected `docs/*.md` updated in this same change?
- [ ] If a knowledge gap was discovered, is it added to `docs/context.md` open
      questions rather than papered over?

Output format:

```
BLOCKING
  - <file:line> — <what is wrong> — <what to do>
SHOULD FIX
  - ...
NOTE
  - ...
```

If nothing blocks, say `No blocking issues.` and stop. Do not pad the review.
