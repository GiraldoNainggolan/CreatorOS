# ENTITY PERSISTENCE DECISION

| Entity | Decision | Rationale | Evidence Status |
|---|---|---|---|
| Idea | PERSIST | Required to track historical concepts and seed production. | VERIFIED |
| Script | PERSIST | Required as the reference document for Recording. | RECONSTRUCTED |
| Recording | PERSIST | Must store metadata and cloud references for Editing. | VERIFIED |
| FinalCut | PERSIST | Must store metadata and cloud references for Posting. | VERIFIED |
| PublishedPost | PERSIST | Required to anchor Analytics metrics to a specific piece of live content. | VERIFIED |

**Note on Databases:**
We explicitly reject "one aggregate = one table" and "one context = one schema". The actual storage mechanism (Relational vs Document vs Blob) will be decided in Implementation.
