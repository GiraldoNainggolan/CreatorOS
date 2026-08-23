# Vision

The brand vision is owned by the business, not by this document.
**Canonical source:** `knowledge/01_BRAND/01_Vision/` and
`knowledge/01_BRAND/Brand Guideline-Master Book.docx`.

This file records only what the *software* must achieve to serve that vision.

## Business anchor (reference, do not restate elsewhere)

| Concept | Source file |
|---|---|
| Vision | `knowledge/01_BRAND/01_Vision/Vision.txt` |
| Mission (5 points) | `knowledge/01_BRAND/01_Vision/Mission.txt` |
| Purpose | `knowledge/01_BRAND/01_Vision/Brand Purpose.txt` |
| Brand Promise (6 rules) | `knowledge/01_BRAND/01_Vision/Brand Promise.txt` |
| Core Values (8) | `knowledge/01_BRAND/01_Vision/Core Values.txt` |
| Goals 1 / 3 / 5 years | `knowledge/01_BRAND/01_Vision/Goals *.txt` |
| Positioning, USP, Archetype | `knowledge/01_BRAND/02_Positioning/` |

## Product vision

> CreatorOS turns a personal tech-education brand into a repeatable production
> system: one body of knowledge becomes content, portfolio, digital products and
> business assets — all on-brand, QA-passed, and traceable back to a pillar, a
> persona, and a result.

Content is the first output, not the only one. Portfolio
(`knowledge/10_PORTFOLIO`), digital products (`knowledge/09_DIGITAL_PRODUCT`)
and business assets (`knowledge/16_BUSINESS`) are approved business domains whose
technical specification is pending — see `docs/modules.md`.

## What the software must guarantee

Derived directly from Brand Promise and the publication QA checklist
(Master Book, page 11). These are product requirements, not aspirations.

1. **On-brand by construction.** Colour, typography, subtitle spec, watermark and
   CTA rules are enforced by the system, not remembered by a human.
2. **Nothing ships unchecked.** No item reaches `Published` without passing the
   QA checklist for its type (social asset vs. technical/code asset).
3. **Anti-clickbait.** Banned vocabulary (`Auto Kaya`, `Pasti Viral`, `Hacks`, …)
   is blocked at authoring time; preferred vocabulary is surfaced.
4. **Traceability.** Every asset links to its pillar, persona, hook, script,
   raw footage and export version.
5. **Repurpose-first.** One source recording is modelled as many derived assets,
   never as a duplicated record.
6. **Evidence-based.** Analytics feed back into the idea bank so the next cycle
   is informed by the previous one.

## Explicit non-goals

- CreatorOS is not a video editor, not a design tool, and not a rendering engine.
  Editing stays in CapCut / Premiere / Canva (`knowledge/06_EDITING/`).
- CreatorOS does not host media bytes. Raw media stays where `05_RECORDING` says
  it stays; CreatorOS indexes it. Cataloguing is owned by
  `knowledge/15_ASSET_LIBRARY` — business domain exists but technical
  specification is pending. *(Storage decision: `docs/context.md` Q5.)*
- CreatorOS does not generate brand strategy. It executes the strategy in
  `knowledge/01_BRAND/`.

## Horizon

| Term | Business goal source | Software implication |
|---|---|---|
| 1 year | `Goals 1 Tahun.txt` — 20k organic followers | Single-operator system must sustain a high, consistent publishing cadence. |
| 3 years | `Goals 3 Tahun.txt` — profitable agency / SaaS | The system must be able to become multi-user. *(Q1 blocking.)* |
| 5 years | `Goals 5 Tahun.txt` | Currently identical to the 3-year file — see `docs/context.md`, data quality issues. |
