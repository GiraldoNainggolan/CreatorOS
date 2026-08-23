---
name: asset-recovery
description: Forensic verification and recovery workflows for corrupted assets.
---

# SKILL: asset-recovery

## Purpose
To safely handle corrupted files without silent overwrites or fabricated replacements.

## When to use
When encountering a corrupted file (e.g. 04_SCRIPT.docx, corrupted media).

## Inputs
Path to the corrupted asset.

## Procedure
1. Identify the corrupted asset.
2. Perform forensic verification (check file size, header).
3. Determine purpose.
4. Create a recovery specification.
5. Wait for human search/download.
6. Validate replacement.

## Safety rules
Do not automatically download replacements. Do not invent contents.

## Validation
Ensure the recovery specification matches the original asset's intent.

## Failure handling
If unrecoverable, document as LOST and use only surviving evidence (RECONSTRUCTED).

## Output
A recovery specification or RECONSTRUCTED knowledge block.
