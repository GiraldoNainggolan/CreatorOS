# Asset Recovery Manifest

This manifest documents missing, corrupted, or invalid assets that require human recovery. No automated downloading or replacing is permitted.

## 1. 04_SCRIPT.docx
- **CURRENT PATH**: `knowledge/04_SCRIPT/04_SCRIPT.docx`
- **STATUS**: CORRUPTED (100% null bytes, 21KB).
- **EXPECTED PURPOSE**: Master SOP for Script domain.
- **EXPECTED FORMAT**: Valid OOXML `.docx`
- **POSSIBLE SOURCE**: Owner's local backup or cloud drive (Google Drive/OneDrive).
- **DESTINATION**: `knowledge/04_SCRIPT/04_SCRIPT.docx`
- **PRIORITY**: P0
- **CONFIDENCE**: HIGH. (Note: Partial knowledge recovered via `Media sosial spesialist.pdf`, but original file is still requested).

## 2. Brand Guideline-Master Book.pdf
- **CURRENT PATH**: `knowledge/01_BRAND/Brand Guideline-Master Book.pdf`
- **STATUS**: CORRUPTED (Missing PDF magic header).
- **EXPECTED PURPOSE**: Visual read-only copy of Brand Guidelines.
- **EXPECTED FORMAT**: Valid `.pdf`
- **POSSIBLE SOURCE**: Can be re-exported by Owner/AI from healthy `Brand Guideline-Master Book.docx`.
- **DESTINATION**: `knowledge/01_BRAND/Brand Guideline-Master Book.pdf`
- **PRIORITY**: P3 (Healthy DOCX exists).
- **CONFIDENCE**: HIGH.

## 3. 06_EDITING.pdf
- **CURRENT PATH**: `knowledge/06_EDITING/06_EDITING.pdf`
- **STATUS**: CORRUPTED (Missing PDF magic header).
- **EXPECTED PURPOSE**: Visual read-only copy of Editing SOP.
- **EXPECTED FORMAT**: Valid `.pdf`
- **POSSIBLE SOURCE**: Can be re-exported by Owner/AI from healthy `06_EDITING.docx`.
- **DESTINATION**: `knowledge/06_EDITING/06_EDITING.pdf`
- **PRIORITY**: P3 (Healthy DOCX exists).
- **CONFIDENCE**: HIGH.

## 4. Paket_Lengkap.pdf
- **CURRENT PATH**: `knowledge/Paket_Lengkap.pdf`
- **STATUS**: UNREADABLE (Parser returned empty text).
- **EXPECTED PURPOSE**: Unknown (Orphan file).
- **EXPECTED FORMAT**: Text-searchable `.pdf`
- **POSSIBLE SOURCE**: Human verification needed.
- **DESTINATION**: To be determined.
- **PRIORITY**: P4
- **CONFIDENCE**: HIGH.
