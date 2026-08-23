# FINAL LIFECYCLE MATRIX

| Entity | Initial State | Trigger | Transitions | Validation | Final State | Status |
|---|---|---|---|---|---|---|
| Idea | Draft | Creator logs idea | Draft -> Selected -> Pipeline | Brand alignment check | Passed to Scripting | VERIFIED |
| Script | Draft | Pipeline assigns Idea | Draft -> Review -> Approved | Hook & Length checks | Approved for Recording | RECONSTRUCTED |
| Recording | Raw | Camera output | Raw -> Ingested -> Editing | Tech checks (audio/video) | FinalCut Input | VERIFIED |
| FinalCut | Editing | Editor submits | Editing -> Review -> Approved | Quality Gate (Brand) | Approved for Posting | VERIFIED |
| PublishedPost | Scheduled | Distributor acts | Scheduled -> Live -> Archived | Platform constraints | Live / Archived | VERIFIED |
