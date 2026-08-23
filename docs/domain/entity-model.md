# ENTITY MODEL (EVIDENCE-FIRST)

| Entity | Exact Term | Semantic Equivalents | Source File | Business Meaning | Identity | Owner | Lifecycle | Invariants | Persistence | Status | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Idea | Ide | Topik, Angle | `03_CONTENT_SYSTEM` | Seed concept for content | UUID | 03_CONTENT_SYSTEM | Idea -> Script | Must align with Brand | REQUIRED | VERIFIED | High |
| Script | Naskah | Script, Draft | `04_SCRIPT` | Written narrative/hook | UUID | 04_SCRIPT | Draft -> Approved | Length, Hook within 3s | REQUIRED | RECONSTRUCTED | Medium |
| Recording | Hasil Shoot | Raw Footage | `05_RECORDING` | Raw A-Roll/B-Roll | UUID | 05_RECORDING | Recorded -> Edited | No audio clipping | REQUIRED | VERIFIED | High |
| FinalCut | Hasil Edit | Final Video | `06_EDITING` | Polished video | UUID | 06_EDITING | Editing -> Approved | Follows Brand Guidelines | REQUIRED | VERIFIED | High |
| PublishedPost | Posting | Konten Publish | `07_POSTING` | Live asset on social | URL/ID | 07_POSTING | Scheduled -> Live | Platform compliant | REQUIRED | VERIFIED | High |
| ContentItem | N/A | Pipeline Asset, Konten | N/A | Orchestration wrapper across stages | UUID | Pipeline | Idea -> Post | Valid stage transitions | TRANSIENT | ARCHITECTURAL ABSTRACTION | Low (Concept exists, term does not) |
