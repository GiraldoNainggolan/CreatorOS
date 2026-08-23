# DOMAIN BOUNDARIES

| Source Domain | Target Domain | Why Dependency Exists | Data/Concept Passed | Direction | Coupling Risk | Source |
|---|---|---|---|---|---|---|
| 03_CONTENT_SYSTEM | 04_SCRIPT | Pipeline flow | ContentIdea | Unidirectional | Low | `README.md` |
| 04_SCRIPT | 05_RECORDING | Pipeline flow | ScriptDraft | Unidirectional | Low | `README.md` |
| 05_RECORDING | 06_EDITING | Pipeline flow | RawFootage | Unidirectional | Low | `README.md` |
| 06_EDITING | 07_POSTING | Pipeline flow | FinalCut | Unidirectional | Low | `README.md` |
| 01_BRAND | All Core Domains | Universal Rules | BrandGuideline | Unidirectional (Broadcast) | High | `01_BRAND.docx` |

**Circular Dependencies**: None explicitly defined in the business logic. Flow is strictly linear (append-only transitions).
