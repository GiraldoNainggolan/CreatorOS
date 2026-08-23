# API READINESS

| Use Case | Actor | Input | Output | Validation | Side Effect | Authorization | Domain Owner | Readiness |
|---|---|---|---|---|---|---|---|---|
| Create Idea | Creator | Text | ContentIdea | None | Persist Idea | Logged In | 03_CONTENT_SYSTEM | NOT READY |
| Submit Script | Creator | Text | ScriptDraft | QualityGate | Persist Script | Logged In | 04_SCRIPT | NOT READY |
| Approve Cut | Editor | UUID | FinalCut | QualityGate | Update State | Logged In | 06_EDITING | NOT READY |
