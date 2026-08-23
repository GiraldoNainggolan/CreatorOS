# AGGREGATE BOUNDARY CHALLENGE

| Entity | Aggregate Classification | Rationale |
|---|---|---|
| **Idea** | AGGREGATE ROOT | Has identity. Has independent lifecycle (Ideation -> Approval). Protects its own consistency. |
| **Script** | AGGREGATE ROOT (Tentative) | Has identity. Cannot be a child of Idea because it modifies the Idea's state and has a completely separate lifecycle (Draft -> Review -> Approved). However, status is UNRESOLVED due to corrupted source. |
| **Recording** | PERSISTED ARTIFACT | Does not protect complex child invariants. Does not have transactional consistency requirements. It is an immutable media artifact referenced by other aggregates. |
| **FinalCut** | PERSISTED ARTIFACT | Same as Recording. It is the output asset of Editing. It enforces Quality Rules prior to creation, but once created, it is a static artifact, not a transactional aggregate root. |
| **PublishedPost** | AGGREGATE ROOT | Has identity (URL/Platform ID). Manages its own lifecycle (Scheduled -> Live). Protects invariants (Platform metadata compliance). |

**Aggregate Test Notes:**
- We explicitly reject "one entity = one aggregate".
- Recording and FinalCut are persisted records, but they are NOT aggregate roots because they do not control a graph of child entities with transactional invariants.
