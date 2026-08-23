---
name: quality-gate
description: Validate source fidelity, terminology, workflows, and consistency.
---

# SKILL: quality-gate

## Purpose
To ensure no degradation of knowledge or violation of governance rules occurs during transitions.

## When to use
Before finalizing any non-trivial change or marking a phase complete.

## Inputs
Generated artifacts and original sources.

## Procedure
1. Validate source fidelity.
2. Check adherence to terminology and metadata structures.
3. Verify workflow preservation.
4. Ensure implementation consistency.

## Safety rules
Do not pass a gate if semantic coverage is low or fake data is found.

## Validation
Cross-reference outputs with the Source of Truth Hierarchy.

## Failure handling
If validation fails, mark as NEEDS REVIEW or FAIL and generate an audit report.

## Output
A Pass/Fail quality gate report.
