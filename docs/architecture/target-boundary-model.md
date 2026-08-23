# TARGET BOUNDARY MODEL

## Option B: Consolidated Business-Capability Modules (RECOMMENDED)

Rather than 17 independent application modules, the system will be built around 6 Bounded Contexts, orchestrated by the Pipeline.

### 1. Content Production Context (CORE)
- **Knowledge Domains**: 03_CONTENT_SYSTEM, 04_SCRIPT, 05_RECORDING, 06_EDITING
- **Entities Owned**: `ContentItem`, `ScriptDraft`, `RawFootage`, `FinalCut`
- **Responsibility**: Takes an Idea and turns it into an approved FinalCut.
- **Why Merged**: Highly cohesive. Separating them creates distributed monolith anti-patterns over a single lifecycle.

### 2. Content Distribution Context (CORE)
- **Knowledge Domains**: 07_POSTING, 08_ANALYTICS, 11_REPURPOSE
- **Entities Owned**: `PublishedPost`, `AnalyticsMetric`
- **Responsibility**: Distributes FinalCuts, tracks them, and feeds winning metrics back into Repurpose hooks.
- **Why Merged**: Tight feedback loop between posting and analytics.

### 3. Brand Strategy Context (SUPPORTING)
- **Knowledge Domains**: 01_BRAND, 02_AUDIENCE
- **Entities Owned**: `BrandGuideline` (Value Object), `AudiencePersona`
- **Responsibility**: Immutable rules engine for QualityGate validation.

### 4. Asset Management Context (REFERENCE)
- **Knowledge Domains**: 13_AI_LIBRARY, 14_KNOWLEDGE_BASE, 15_ASSET_LIBRARY
- **Entities Owned**: `AssetItem`, `AIPrompt`, `ReferenceDoc`
- **Responsibility**: Generic storage and retrieval of reusable production components.

### 5. Business Operations Context (GENERIC)
- **Knowledge Domains**: 09_DIGITAL_PRODUCT, 10_PORTFOLIO, 16_BUSINESS, 17_SOP
- **Entities Owned**: `Product`, `PortfolioItem`, `BusinessReport`
- **Responsibility**: Secondary tracks outside the daily high-cadence content factory.

### 6. Archive Context (GENERIC)
- **Knowledge Domains**: 12_ARCHIVE
- **Entities Owned**: `ArchivedItem`
- **Responsibility**: Cold storage.

## Orchestration Modules (Not Bounded Contexts)
- **Pipeline**: Application service orchestrating `ContentItem` through the Production Context.
- **QualityGate**: Stateless cross-domain validation service.
