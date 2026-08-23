# CreatorOS Agent Instructions

## Mission
Ensure that all future AI agents understand the CreatorOS architecture, respect the Source of Truth, distinguish between verified and reconstructed knowledge, and strictly preserve knowledge integrity without hallucinating missing business rules or modifying protected source files.

## Repository Structure
CreatorOS is the software implementation of a Brand & Content Operating System. 
- `knowledge/`: Business rules, SOPs, workflows, and templates (Source of Truth).
- `docs/`: Technical architecture and modules.
- `.claude/` / `.agents/`: AI Rules and governance skills.

## Source of Truth
Hierarchy of evidence. Higher-level evidence always overrides lower-level inference. AI inference MUST NEVER silently override source knowledge.
1. **LEVEL 1**: Verified original source documents.
2. **LEVEL 2**: Verified knowledge derived directly from original source.
3. **LEVEL 3**: Verified technical architecture documentation.
4. **LEVEL 4**: Reconstructed knowledge explicitly labeled as reconstructed.
5. **LEVEL 5**: Proposed implementation decisions.
6. **LEVEL 6**: AI inference.

## Knowledge Status
Agents must preserve and clearly mark these distinctions:
- **VERIFIED**: Confirmed against original source.
- **RECONSTRUCTED**: Derived from surviving evidence (e.g., from an otherwise corrupted source).
- **PROPOSED**: Suggested changes awaiting approval.
- **INFERRED**: Deduced by AI (lowest confidence).
- **UNKNOWN**: Status not verifiable.
- **LOST**: Original source is missing.
- **CORRUPTED**: Original source is damaged or unreadable.

## Domain Ownership
Every authoritative rule should have ONE owner. Do not arbitrarily move rules or duplicate conflicting copies.
- 01_BRAND: Brand
- 02_AUDIENCE: Audience
- 03_CONTENT_SYSTEM: Content System
- 04_SCRIPT: Script
- 05_RECORDING: Recording
- 06_EDITING: Editing
- 07_POSTING: Posting
- 08_ANALYTICS: Analytics
- 09_DIGITAL_PRODUCT: Digital Product
- 10_PORTFOLIO: Portfolio
- 11_REPURPOSE: Repurpose
- 12_ARCHIVE: Archive
- 13_AI_LIBRARY: AI Library
- 14_KNOWLEDGE_BASE: Knowledge Base
- 15_ASSET_LIBRARY: Asset Library
- 16_BUSINESS: Business
- 17_SOP: SOP

## Protected Sources
Agents MUST NOT modify these files without explicit human approval:
- `knowledge/Paket_Lengkap.pdf`
- `04_SCRIPT.docx`
- `Brand Guideline-Master Book.pdf`
- `06_EDITING.pdf`
- `New Microsoft Word Document.docx`
- Corrupted media assets
- Any original source documents inside `knowledge/` explicitly marked as source-of-truth.

## Corrupted Files
If a file is corrupt (e.g. `04_SCRIPT.docx`):
1. Identify corruption.
2. Identify possible healthy source.
3. Document recovery path.
4. Mark status.
5. Request human action where required.
DO NOT invent contents, silently replace, or claim recovery. Mark any surviving evidence as RECONSTRUCTED.

## Media Recovery
Corrupted Meme Bank assets are operational assets. They do not block knowledge/application architecture, but remain documented as RECOVERY REQUIRED. Agents must not fabricate replacements.

## Empty Folder Policy
An empty directory is NOT automatically a defect. Before creating content, check source evidence, domain purpose, SOP requirements, and actual workflow. Do not create unnecessary files merely to make the repository look complete.

## Implementation Workflow
Before implementing any application feature:
Knowledge -> Domain rule -> Acceptance criteria -> Architecture -> Implementation -> Tests
**Never**: AI assumption -> code -> invented business rule.

Before modifying knowledge:
1. Identify the domain.
2. Identify source of truth.
3. Read relevant source.
4. Determine whether information is verified.
5. Check for conflicts.
6. Make the smallest necessary change.
7. Preserve source traceability.
8. Validate output.

For any non-trivial change: Inspect -> Plan -> Minimal Modification -> Validate -> Test -> Document.

## Human Approval
Required when:
- Original source is corrupted
- Business rule is ambiguous
- Two authoritative sources conflict
- Reconstructed knowledge becomes canonical
- Schema changes business semantics
- Destructive cleanup is proposed
- Source files need replacement
- External assets need copyright/license decisions

## Validation
Agents must validate source fidelity, business rules, terminology, workflows, metadata, implementation consistency, and tests before finalizing any change.

## Skills
Focused skills available in `.agents/skills/`:
- `knowledge-audit`: For inspecting and classifying knowledge sources.
- `source-traceability`: For preserving source mapping and confidence levels.
- `document-generation`: For generating MD, DOCX, and PDF formats securely.
- `asset-recovery`: For forensic verification and recovery workflows of corrupted assets.
- `domain-architecture`: For deriving application architecture strictly from verified knowledge.
- `quality-gate`: For validating source fidelity and business rules.

## Forbidden Actions
Explicitly prohibited:
- Hallucinating business rules.
- Silently changing terminology.
- Modifying source files without approval.
- Deleting files during exploratory work.
- Replacing corrupted source without provenance.
- Treating inferred knowledge as verified.
- Treating examples as real data.
- Implementing before domain rules are understood.
- Creating unnecessary architecture.
- Introducing dependencies without justification.

## Completion Criteria
Ensure AGENTS.md exists, skills are referenced and populated, source hierarchy is strictly followed, and no application code or original source modifications occur during governance tasks.
