# Script Reconstruction

## Original Source Status
The original file `knowledge/04_SCRIPT/04_SCRIPT.docx` is completely zero-filled (destroyed). No verbatim wording is recoverable. (VERIFIED)

## Verified Script Knowledge
- **Lifecycle states**: Draft -> Ready -> Published (`docs/product.md`).
- **Validation**: Script must follow designated frameworks and vocabulary guards. (VERIFIED)

## Reconstructed Script Knowledge
- **Frameworks**: Scripts are NOT just plain text. They are structured as PAS, BAB, or Hero Journey templates (`Media sosial spesialist.pdf`).
- **Hook Integration**: The Hook is determined *during research*, not during script writing. Script pulls Hook from Hook Library. (RECONSTRUCTED)

## Technical Recommendation (EXTERNAL / ENGINEERING INFERENCE)
- **Script Data Structure**: The database `scripts` table might use JSONB fields to store specific framework parts (e.g., `part_problem`, `part_agitate`, `part_solve`), but this is an implementation recommendation, not a business rule.

## Unknown / Lost Knowledge
- Original manual review checklists specifically for scripts.
- Exact word counts or duration limitations originally set in `04_SCRIPT.docx`.

## Script -> Recording Dependency
- A script marked as 'Ready' moves to Recording. (VERIFIED)
- The script determines the Shot List and B-Roll needs. (INFERRED dependency based on standard video production pipelines, no explicit CreatorOS source found).

**Source**: `Media sosial spesialist.pdf`, `docs/product.md`.
**Confidence**: High (Business logic), Low (Original wording).
**Human Approval Required**: YES
