# ENTITY CATALOG

| Entity | Domain Owner | Business Meaning | Responsibilities | Identity | Lifecycle | Relationships | Source | Confidence |
|---|---|---|---|---|---|---|---|---|
| ContentIdea | 03_CONTENT_SYSTEM | Seed for content | Track inspiration | UUID | Idea -> Script | -> Audience | `README.md` | High |
| ScriptDraft | 04_SCRIPT | Written narrative | Guide recording | UUID | Draft -> Final | -> ContentIdea | `04_SCRIPT.md` (RECONSTRUCTED) | Medium (RECONSTRUCTED DEPENDENCY) |
| RawFootage | 05_RECORDING | Unedited video | Store camera output | UUID | Recorded -> Edited | -> ScriptDraft | `05_RECORDING.docx` | High |
| FinalCut | 06_EDITING | Polished video | Ready for upload | UUID | Editing -> Review -> Approved | -> RawFootage | `06_EDITING.docx` | High |
| PublishedPost | 07_POSTING | Live asset on social | Track URLs and views | URL/ID | Scheduled -> Live | -> FinalCut | `Paket_Lengkap.pdf` | High |
| BrandGuideline (Value Object) | 01_BRAND | Brand rules | Provide Tone of Voice | Singleton | Static | N/A | `01_BRAND.docx` | High |
