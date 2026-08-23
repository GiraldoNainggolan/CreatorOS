# Module Dependency Map
**Status:** PROPOSED

## Dependency Rules
As dictated by ADR-002:
1. Dependencies always point INWARD towards the core domains.
2. `Pipeline` depends on ALL domains.
3. Domains DEPEND ON NOTHING (except Shared Kernel).
4. `QualityGate` depends on `Brand` (to read rules).
5. `Generator` depends on `Brand`, `Audience`, `ContentSystem`, `Pipeline`, and `Script`.

## Mermaid Architecture Map

```mermaid
graph TD
    %% Core Domains
    Brand[Brand]
    Audience[Audience]
    ContentSystem[ContentSystem]
    Script[Script]
    Recording[Recording]
    Editing[Editing]
    Analytics[Analytics]

    %% Cross-cutting
    Pipeline[Pipeline Orchestrator]
    QualityGate[Quality Gate Evaluator]
    Generator[Content Generator]

    %% Dependencies
    Pipeline --> Brand
    Pipeline --> Audience
    Pipeline --> ContentSystem
    Pipeline --> Script
    Pipeline --> Recording
    Pipeline --> Editing
    Pipeline --> Analytics
    Pipeline --> QualityGate

    QualityGate --> Brand

    Generator --> Brand
    Generator --> Audience
    Generator --> ContentSystem
    Generator --> Pipeline
    Generator --> Script

    %% Shared Kernel
    Shared[Shared Kernel: UUIDs, Enums, Interfaces]
    Brand -.-> Shared
    Audience -.-> Shared
    ContentSystem -.-> Shared
    Script -.-> Shared
    Pipeline -.-> Shared
```

*Note: Arrows indicate code dependencies (e.g., `Pipeline` Application layer calls `Script` Application layer via DTOs). Dispatched Domain Events follow inverse pub/sub flows at runtime but do not create compile-time dependencies.*
