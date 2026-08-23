---
name: document-generation
description: Generate MD, DOCX, and PDF formats faithfully.
---

# SKILL: document-generation

## Purpose
To generate standard documentation formats while perfectly preserving language, structure, content, and traceability.

## When to use
When canonicalizing reconstructed knowledge into the standard 3 formats.

## Inputs
Parsed text from TXT extractions.

## Procedure
1. Parse text while maintaining Indonesian language.
2. Retain headings and lists.
3. Write MD.
4. Use python-docx and reportlab for DOCX and PDF.

## Safety rules
Do not summarize unless explicitly requested. Do not translate. Do not over-clean.

## Validation
Compare character counts and semantic structure between input and output.

## Failure handling
If output is <50% of input or structurally deficient, FAIL and abort save.

## Output
Equivalently populated MD, DOCX, and PDF files.
