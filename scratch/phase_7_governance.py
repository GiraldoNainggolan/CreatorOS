import os

agents_md_content = """# CreatorOS Agent Instructions

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
"""

def get_skill_content(name, description, purpose, when_to_use, inputs, procedure, safety_rules, validation, failure_handling, output):
    return f"""---
name: {name}
description: {description}
---

# SKILL: {name}

## Purpose
{purpose}

## When to use
{when_to_use}

## Inputs
{inputs}

## Procedure
{procedure}

## Safety rules
{safety_rules}

## Validation
{validation}

## Failure handling
{failure_handling}

## Output
{output}
"""

skills = {
    "knowledge-audit": {
        "description": "Inspect knowledge, classify source status, identify gaps/conflicts.",
        "purpose": "To systematically inspect knowledge sources, classify their status, and identify gaps or conflicts while avoiding hallucination.",
        "when_to_use": "When reviewing repository knowledge, starting a new domain task, or attempting to resolve contradictory rules.",
        "inputs": "Domain files, raw extractions, PDF sources.",
        "procedure": "1. Locate relevant domain files.\n2. Cross-reference with Level 1/2 Sources of Truth.\n3. Classify information status (e.g. VERIFIED, RECONSTRUCTED).\n4. Report evidence.",
        "safety_rules": "Do not hallucinate missing business rules. Do not modify protected sources.",
        "validation": "Verify that all classifications have a clear evidence trail.",
        "failure_handling": "If source cannot be found, mark as UNKNOWN or LOST and escalate to human.",
        "output": "A knowledge audit report with clear source mapping."
    },
    "source-traceability": {
        "description": "Preserve source mapping, confidence levels, and approval status.",
        "purpose": "To ensure every piece of generated knowledge or code can be traced back to its authoritative source.",
        "when_to_use": "When generating new documents, extracting knowledge, or making implementation decisions.",
        "inputs": "Original source file path, page range, and section.",
        "procedure": "1. Extract the precise source location.\n2. Determine the knowledge status (e.g., LEVEL 2).\n3. Append a trace block containing source file, section, page, derived artifact, and confidence.",
        "safety_rules": "Never guess a page number. If inferred, explicitly mark as INFERRED.",
        "validation": "Check that the trace block accurately points to existing evidence.",
        "failure_handling": "If trace is lost, halt and re-audit the source.",
        "output": "A trace block appended to the generated artifact."
    },
    "document-generation": {
        "description": "Generate MD, DOCX, and PDF formats faithfully.",
        "purpose": "To generate standard documentation formats while perfectly preserving language, structure, content, and traceability.",
        "when_to_use": "When canonicalizing reconstructed knowledge into the standard 3 formats.",
        "inputs": "Parsed text from TXT extractions.",
        "procedure": "1. Parse text while maintaining Indonesian language.\n2. Retain headings and lists.\n3. Write MD.\n4. Use python-docx and reportlab for DOCX and PDF.",
        "safety_rules": "Do not summarize unless explicitly requested. Do not translate. Do not over-clean.",
        "validation": "Compare character counts and semantic structure between input and output.",
        "failure_handling": "If output is <50% of input or structurally deficient, FAIL and abort save.",
        "output": "Equivalently populated MD, DOCX, and PDF files."
    },
    "asset-recovery": {
        "description": "Forensic verification and recovery workflows for corrupted assets.",
        "purpose": "To safely handle corrupted files without silent overwrites or fabricated replacements.",
        "when_to_use": "When encountering a corrupted file (e.g. 04_SCRIPT.docx, corrupted media).",
        "inputs": "Path to the corrupted asset.",
        "procedure": "1. Identify the corrupted asset.\n2. Perform forensic verification (check file size, header).\n3. Determine purpose.\n4. Create a recovery specification.\n5. Wait for human search/download.\n6. Validate replacement.",
        "safety_rules": "Do not automatically download replacements. Do not invent contents.",
        "validation": "Ensure the recovery specification matches the original asset's intent.",
        "failure_handling": "If unrecoverable, document as LOST and use only surviving evidence (RECONSTRUCTED).",
        "output": "A recovery specification or RECONSTRUCTED knowledge block."
    },
    "domain-architecture": {
        "description": "Derive application architecture from verified knowledge.",
        "purpose": "To construct technical architecture systematically from business rules.",
        "when_to_use": "When moving from Phase 6 (Knowledge) to Phase 8 (Application Design).",
        "inputs": "Canonical knowledge documents.",
        "procedure": "1. Read knowledge -> domain -> workflow.\n2. Extract rules and entities.\n3. Define use cases and interfaces.\n4. Formulate architecture.",
        "safety_rules": "Do not invent domain rules. Never go from AI assumption straight to code.",
        "validation": "Ensure every architectural interface maps to a verified business rule.",
        "failure_handling": "If rules are ambiguous, stop and request human approval.",
        "output": "Technical architecture documentation (e.g. docs/architecture.md)."
    },
    "quality-gate": {
        "description": "Validate source fidelity, terminology, workflows, and consistency.",
        "purpose": "To ensure no degradation of knowledge or violation of governance rules occurs during transitions.",
        "when_to_use": "Before finalizing any non-trivial change or marking a phase complete.",
        "inputs": "Generated artifacts and original sources.",
        "procedure": "1. Validate source fidelity.\n2. Check adherence to terminology and metadata structures.\n3. Verify workflow preservation.\n4. Ensure implementation consistency.",
        "safety_rules": "Do not pass a gate if semantic coverage is low or fake data is found.",
        "validation": "Cross-reference outputs with the Source of Truth Hierarchy.",
        "failure_handling": "If validation fails, mark as NEEDS REVIEW or FAIL and generate an audit report.",
        "output": "A Pass/Fail quality gate report."
    }
}

report_content = """# PHASE 7 — AGENT GOVERNANCE & SKILLS REPORT

## Execution Summary
The operational governance layer for CreatorOS AI agents has been successfully generated without modifying any application code or protected sources.

## Completion Checklist
- [x] AGENTS.md exists in the repository root.
- [x] .agents/skills/ directory exists.
- [x] All 6 required skills exist:
  - knowledge-audit
  - source-traceability
  - document-generation
  - asset-recovery
  - domain-architecture
  - quality-gate
- [x] Every skill has complete instructions (Purpose, When to use, Inputs, Procedure, Safety rules, Validation, Failure handling, Output).
- [x] AGENTS.md references the skills.
- [x] Source hierarchy (Levels 1-6) is explicitly defined.
- [x] Domain ownership (01_BRAND through 17_SOP) is defined.
- [x] Corruption policy (Forensic verification, no silent recovery) is defined.
- [x] Human approval policy is defined.
- [x] Empty folder policy is defined.
- [x] No application code created.
- [x] No original source modified.

## Final Status
Governance layer generation is complete. Agents are now equipped with strict operational parameters to preserve the CreatorOS Source of Truth.
"""

def main():
    base_dir = r"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS"
    
    # 1. Write AGENTS.md
    with open(os.path.join(base_dir, "AGENTS.md"), "w", encoding="utf-8") as f:
        f.write(agents_md_content)
        
    # 2. Write Skills
    skills_dir = os.path.join(base_dir, ".agents", "skills")
    for skill_name, data in skills.items():
        skill_path = os.path.join(skills_dir, skill_name)
        os.makedirs(skill_path, exist_ok=True)
        content = get_skill_content(
            skill_name, data["description"], data["purpose"], data["when_to_use"],
            data["inputs"], data["procedure"], data["safety_rules"],
            data["validation"], data["failure_handling"], data["output"]
        )
        with open(os.path.join(skill_path, "SKILL.md"), "w", encoding="utf-8") as f:
            f.write(content)
            
    # 3. Write Report
    report_dir = os.path.join(base_dir, "docs", "audit")
    os.makedirs(report_dir, exist_ok=True)
    with open(os.path.join(report_dir, "phase-7-agent-governance-report.md"), "w", encoding="utf-8") as f:
        f.write(report_content)
        
    print("PHASE 7 GOVERNANCE CREATION COMPLETE.")

if __name__ == "__main__":
    main()
