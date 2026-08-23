# ENTITY OWNERSHIP CHALLENGE

## 1. ContentItem
**Status:** ARCHITECTURAL ABSTRACTION / TRANSIENT ORCHESTRATION STATE
**Analysis:** The `Pipeline` module owns and maintains the *orchestration state* across the content factory. It does NOT own the underlying business entities (Idea, Script, Recording, etc.). We must explicitly distinguish ORCHESTRATION OWNERSHIP (Pipeline tracking progress) from BUSINESS ENTITY OWNERSHIP (domain contexts owning the data and rules).

## 2. Idea
**Business Meaning:** The seed concept, topic, and angle for content.
**Source:** `03_CONTENT_SYSTEM`
**Source Evidence:** Extracts state that content begins with an idea formulation before scripting.
**Proposed Owner:** Content System Context
**Alternative Owner:** Content Production Context
**Why Owner:** The Idea is generated and validated conceptually before production ever begins. It belongs to the ideation and strategy phase.
**Confidence:** High
**Status:** VERIFIED

## 3. Script
**Business Meaning:** The written narrative and hook.
**Source:** `04_SCRIPT` (Corrupted)
**Source Evidence:** Mentions of "Naskah" and "Hook" in surrounding documents.
**Proposed Owner:** Content Production Context
**Alternative Owner:** Content System Context
**Why Owner:** The script is the first physical production asset, translating an Idea into an actionable production plan.
**Confidence:** Low
**Status:** UNRESOLVED (Due to RECONSTRUCTED logic).

## 4. Recording
**Business Meaning:** The raw A-Roll/B-Roll footage.
**Source:** `05_RECORDING`
**Source Evidence:** "Hasil Shoot"
**Proposed Owner:** Content Production Context
**Why Owner:** It is the direct output of the recording domain.
**Status:** VERIFIED
**Classification:** Persisted Artifact / Asset (Not a true aggregate root, as it has no complex transactional children).

## 5. FinalCut
**Business Meaning:** The polished video ready for publishing.
**Source:** `06_EDITING`
**Source Evidence:** "Hasil Edit"
**Proposed Owner:** Content Production Context
**Why Owner:** It is the final output of the production line before handoff.
**Status:** VERIFIED

## 6. PublishedPost
**Business Meaning:** A live asset deployed to a social platform.
**Source:** `07_POSTING`
**Source Evidence:** "Posting" / "Konten Publish"
**Proposed Owner:** Content Distribution Context
**Alternative Owner:** Analytics Context
**Why Owner:** Distribution creates and publishes the post. Analytics merely *consumes* metrics about it. This strictly distinguishes CONTENT OWNERSHIP (Distribution) from ANALYTICS CONSUMPTION (Analytics).
**Confidence:** High
**Status:** VERIFIED
