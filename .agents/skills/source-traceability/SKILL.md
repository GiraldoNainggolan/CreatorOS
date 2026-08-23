---
name: source-traceability
description: Preserve source mapping, confidence levels, and approval status.
---

# SKILL: source-traceability

## Purpose
To ensure every piece of generated knowledge or code can be traced back to its authoritative source.

## When to use
When generating new documents, extracting knowledge, or making implementation decisions.

## Inputs
Original source file path, page range, and section.

## Procedure
1. Extract the precise source location.
2. Determine the knowledge status (e.g., LEVEL 2).
3. Append a trace block containing source file, section, page, derived artifact, and confidence.

## Safety rules
Never guess a page number. If inferred, explicitly mark as INFERRED.

## Validation
Check that the trace block accurately points to existing evidence.

## Failure handling
If trace is lost, halt and re-audit the source.

## Output
A trace block appended to the generated artifact.
