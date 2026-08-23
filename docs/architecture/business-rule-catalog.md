# BUSINESS RULE CATALOG

| Rule ID | Rule | Owner Domain | Consumer | Source | Status | Confidence | Implementation Impact |
|---|---|---|---|---|---|---|---|
| BR-01 | Tone of Voice must match Guidelines | 01_BRAND | 04_SCRIPT | `01_BRAND.docx` | VERIFIED | High | QualityGate validation in Script phase |
| BR-02 | Hook must capture attention in 3s | 04_SCRIPT | 04_SCRIPT | `04_SCRIPT.md` | RECONSTRUCTED | Medium | RECONSTRUCTED DEPENDENCY. AI Prompts rely on this. |
| BR-03 | Audio must not clip | 05_RECORDING | 05_RECORDING | `05_RECORDING.docx` | VERIFIED | High | Recording checklist validation |
| BR-04 | Only approved FinalCuts can be posted | 06_EDITING | 07_POSTING | `Paket_Lengkap.pdf` | VERIFIED | High | Pipeline state constraint |
