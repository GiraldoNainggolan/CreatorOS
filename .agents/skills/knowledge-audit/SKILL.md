---
name: knowledge-audit
description: Inspect knowledge, classify source status, identify gaps/conflicts.
---

# SKILL: knowledge-audit

## Purpose
To systematically inspect knowledge sources, classify their status, and identify gaps or conflicts while avoiding hallucination.

## When to use
When reviewing repository knowledge, starting a new domain task, or attempting to resolve contradictory rules.

## Inputs
Domain files, raw extractions, PDF sources.

## Procedure
1. Locate relevant domain files.
2. Cross-reference with Level 1/2 Sources of Truth.
3. Classify information status (e.g. VERIFIED, RECONSTRUCTED).
4. Report evidence.

## Safety rules
Do not hallucinate missing business rules. Do not modify protected sources.

## Validation
Verify that all classifications have a clear evidence trail.

## Failure handling
If source cannot be found, mark as UNKNOWN or LOST and escalate to human.

## Output
A knowledge audit report with clear source mapping.
