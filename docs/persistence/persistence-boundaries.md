# PERSISTENCE BOUNDARIES

| Data Category | Owning Context | Access Pattern |
|---|---|---|
| Production Flow (Idea, Script, Media) | Content Production Context | High Write (during creation), High Read (pipeline views) |
| Distribution Flow (Post, Metrics) | Content Distribution Context | Append-only Writes (metrics), High Read (dashboards) |
| Brand Rules | Brand Strategy Context | Read-heavy (validation), Rare Writes |
