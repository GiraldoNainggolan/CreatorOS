# AGGREGATE MODEL

| Aggregate Root | Boundaries | Owned Entities | Owner Context | Rationale |
|---|---|---|---|---|
| Idea | Single concept | Idea | Content Production | Independent creation |
| Script | Narrative | Script | Content Production | Modifies Idea conceptually, but is a distinct asset |
| MediaAsset | Physical file | Recording, FinalCut | Content Production | Represents the physical video file |
| Post | Platform representation | PublishedPost | Content Distribution | Tied to platform APIs |

*Note: Since ContentItem is an ARCHITECTURAL ABSTRACTION, it is NOT an Aggregate Root. The system tracks the flow via correlation IDs between Idea -> Script -> MediaAsset -> Post.*
