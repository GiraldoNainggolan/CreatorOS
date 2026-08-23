# Source-of-Truth Map

| Domain | Primary Source | Secondary Source | Supporting Source | Legacy Source | Conflicting Source |
|---|---|---|---|---|---|
| **Brand** | `01_BRAND.txt` | `Brand Guideline-Master Book.docx` | None | None | None |
| **Audience** | `Media sosial spesialist.pdf` (Page 19) | `Ide konten kreator.xlsx` (Sheet 2025) | None | None | None |
| **ContentSystem** | `Content Operating System.txt` | `Media sosial spesialist.pdf` | `Ide konten kreator.xlsx` (2025) | `Ide konten kreator.xlsx` (2023) | 2023 vs 2025 sheets |
| **Script** | `Media sosial spesialist.pdf` (Frameworks) | `docs/product.md` (Lifecycle) | None | `04_SCRIPT.docx` (Lost) | None |
| **Recording** | `05_RECORDING.docx` | `kecilan.docx` | None | None | None |
| **Editing** | `06_EDITING.docx` | None | None | None | None |
| **Posting - Archive** | `Media sosial spesialist.pdf` | None | None | None | None |
| **AI Agents** | `docs/technical-design-specification.md` | `.claude/CLAUDE.md` | `AGENTS.md` (Missing) | None | `.claude` vs `AGENTS.md` standard |

## Conflicts and Resolutions

**CONFLICT 1: Ide konten kreator.xlsx (2023 vs 2025)**
- **SOURCE A**: Sheet 2023 (Generic entertainment ideas)
- **SOURCE B**: Sheet 2025 (IT / Digital Skills ideas)
- **EVIDENCE**: 2025 aligns with `Brand Guideline-Master Book.docx` (Tech Educator).
- **LIKELY AUTHORITY**: Sheet 2025.
- **RECOMMENDED RESOLUTION**: Treat 2023 as legacy/unrelated. Extract 2025 into formal `03_CONTENT_SYSTEM` taxonomy.

**CONFLICT 2: AI Agent Rules Configuration**
- **SOURCE A**: `.claude/CLAUDE.md`
- **SOURCE B**: ECC / Antigravity standard (`AGENTS.md`)
- **EVIDENCE**: Project is migrating to Antigravity-native agents.
- **LIKELY AUTHORITY**: `AGENTS.md` (once created).
- **RECOMMENDED RESOLUTION**: Port rules from `CLAUDE.md` to `AGENTS.md` during Phase 9.
