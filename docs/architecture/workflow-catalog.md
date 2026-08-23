# WORKFLOW CATALOG

## Core Content Pipeline Workflow

| Trigger | Input | Steps | Decisions | Output | Next Domain | Failure State | Owner | Source |
|---|---|---|---|---|---|---|---|---|
| Inspiration | ContentIdea | Research -> Hook -> Script | Script Approved? | ScriptDraft | 05_RECORDING | Rejected | 04_SCRIPT | `README.md` & `04_SCRIPT.md` (RECONSTRUCTED) |
| Script Ready | ScriptDraft | Record -> Audio Check | Quality Pass? | RawFootage | 06_EDITING | Needs Reshoot | 05_RECORDING | `05_RECORDING.docx` |
| Footage Ready | RawFootage | Assembly -> VFX -> Polish | Brand rules pass? | FinalCut | 07_POSTING | Revision | 06_EDITING | `06_EDITING.docx` |
| Final Cut Ready | FinalCut | Caption -> Hashtag -> Upload | CDPS Review | PublishedPost | 08_ANALYTICS | Flagged | 07_POSTING | `Paket_Lengkap.pdf` |
