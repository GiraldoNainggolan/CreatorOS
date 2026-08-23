# MODULE CONTRACTS

## Pipeline (Orchestration Module)
- **Purpose**: Cross-domain process manager moving an item through the 13 stages.
- **Type**: Application Service (Not a business entity).
- **Public Inputs**: State transition requests.
- **Public Outputs**: Pipeline Status.
- **Dependencies**: Depends on ALL domain modules.
- **Invariants**: Cannot skip stages.

## QualityGate (Orchestration Module)
- **Purpose**: Evaluates rules at stage boundaries.
- **Type**: Application Service (Not a business entity).
- **Public Inputs**: Content Item snapshot, Target State.
- **Public Outputs**: Pass/Fail List.
- **Dependencies**: 01_BRAND (for rules).
- **Invariants**: Pure function, no state mutations.
