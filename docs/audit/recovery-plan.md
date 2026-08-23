# Recovery Plan

## RECOVERY ID: REC-001 (Script SOP)
**PATH:** `knowledge/04_SCRIPT/04_SCRIPT.docx`
**TYPE:** DOCX
**STATUS:** CORRUPTED
**PROBLEM:** Invalid OOXML Zip container. Unreadable.
**LIKELY ROOT CAUSE:** Save corruption, sync error, or improper file extension renaming.
**BUSINESS / SYSTEM IMPACT:** The `Script` module lacks definition for its entity lifecycle (Draft -> Ready -> Published).
**DEPENDENCIES:** Pipeline Module, Recording Module.
**RECOVERY STRATEGY:** Manual retrieval. Do NOT fabricate rules.
**SOURCE TO RECOVER FROM:** User's local machine, Google Drive, or original backups.
**SEARCH KEYWORDS:** "CreatorOS script lifecycle docx", "Script SOP Giraldo Nainggolan"
**EXPECTED FORMAT:** Valid DOCX.
**EXPECTED LOCATION:** `knowledge/04_SCRIPT/`
**VALIDATION CRITERIA:** Must pass `zipfile.is_zipfile` and contain headings related to Scripting.
**PRIORITY:** P0
**MANUAL ACTION:** NOT FIXED — MANUAL ACTION REQUIRED

## RECOVERY ID: REC-002 (Brand PDF)
**PATH:** `knowledge/01_BRAND/Brand Guideline-Master Book.pdf`
**TYPE:** PDF
**STATUS:** CORRUPTED
**PROBLEM:** Missing PDF Magic Header.
**LIKELY ROOT CAUSE:** Export failure from Word.
**BUSINESS / SYSTEM IMPACT:** Downstream agents relying on PDF parsers will fail to read the brand guidelines.
**DEPENDENCIES:** QualityGate Module.
**RECOVERY STRATEGY:** Local regeneration.
**SOURCE TO RECOVER FROM:** `knowledge/01_BRAND/Brand Guideline-Master Book.docx`
**EXPECTED FORMAT:** Valid PDF.
**EXPECTED LOCATION:** `knowledge/01_BRAND/`
**VALIDATION CRITERIA:** Must start with `%PDF-` bytes.
**PRIORITY:** P3
**MANUAL ACTION:** NOT FIXED — MANUAL ACTION REQUIRED

## RECOVERY ID: REC-003 (Editing PDF)
**PATH:** `knowledge/06_EDITING/06_EDITING.pdf`
**TYPE:** PDF
**STATUS:** CORRUPTED
**PROBLEM:** Missing PDF Magic Header.
**LIKELY ROOT CAUSE:** Export failure from Word.
**BUSINESS / SYSTEM IMPACT:** Minor. DOCX fallback exists.
**DEPENDENCIES:** Editing Module.
**RECOVERY STRATEGY:** Local regeneration.
**SOURCE TO RECOVER FROM:** `knowledge/06_EDITING/06_EDITING.docx`
**EXPECTED FORMAT:** Valid PDF.
**EXPECTED LOCATION:** `knowledge/06_EDITING/`
**VALIDATION CRITERIA:** Must start with `%PDF-` bytes.
**PRIORITY:** P4
**MANUAL ACTION:** NOT FIXED — MANUAL ACTION REQUIRED

## RECOVERY ID: REC-004 (Placeholders)
**PATH:** Multiple `New Microsoft Word Document.docx`
**TYPE:** Placeholder
**STATUS:** CORRUPTED / OBSOLETE
**PROBLEM:** Invalid files cluttering the repository.
**RECOVERY STRATEGY:** Safe deletion.
**PRIORITY:** P4
**MANUAL ACTION:** Can be automated in Phase 9 (Safe Fixes).
