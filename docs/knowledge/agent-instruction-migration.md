# AGENT INSTRUCTION MIGRATION

## Analysis of Legacy `.claude/CLAUDE.md` vs New `AGENTS.md`

### Rules Preserved
- `knowledge/` is read-only and overrides code/AI assumptions.
- The 13-stage content pipeline from `README.md` is strictly enforced.
- Domain to technical module mapping is preserved but expanded to all 17 domains.
- Implementation workflows (Architecture before implementation) are maintained.

### Rules Superseded
- `AGENTS.md` supersedes the basic 6-domain mapping in `CLAUDE.md` with a comprehensive 17-domain mapping and explicit domain ownership.
- The concept of "Sources of Truth" is expanded into a precise 6-Level Evidence Hierarchy (Verified -> Reconstructed -> Architecture -> Implementation -> AI Inference).

### Rules Missing in Legacy
- **Corruption Policy**: Handling of zero-filled media and lost original DOCX files.
- **Empty Folder Policy**: Rules against artificially populating empty directories.
- **Agent Skills**: `CLAUDE.md` lacked specific `.agents/skills` workflows for Knowledge Audit, Source Traceability, Asset Recovery, and Quality Gates.

### Conflicts
- None identified. `AGENTS.md` acts as a strict superset of `CLAUDE.md` governance principles.

### Required Human Review
- Should `CLAUDE.md` be deprecated in favor of `AGENTS.md`, or should they run in parallel?
