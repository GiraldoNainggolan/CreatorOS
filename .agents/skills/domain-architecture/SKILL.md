---
name: domain-architecture
description: Derive application architecture from verified knowledge.
---

# SKILL: domain-architecture

## Purpose
To construct technical architecture systematically from business rules.

## When to use
When moving from Phase 6 (Knowledge) to Phase 8 (Application Design).

## Inputs
Canonical knowledge documents.

## Procedure
1. Read knowledge -> domain -> workflow.
2. Extract rules and entities.
3. Define use cases and interfaces.
4. Formulate architecture.

## Safety rules
Do not invent domain rules. Never go from AI assumption straight to code.

## Validation
Ensure every architectural interface maps to a verified business rule.

## Failure handling
If rules are ambiguous, stop and request human approval.

## Output
Technical architecture documentation (e.g. docs/architecture.md).
