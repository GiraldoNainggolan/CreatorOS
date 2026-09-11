# CreatorOS: Master Product & Engineering PRD
Version: 1.1
Status: ACTIVE / LIVING SPECIFICATION
Last Updated: 2026-09-11

# NON-NEGOTIABLE RELEASE RULE

A checklist checkbox is a TEST RESULT, not a task completion flag.

[x] means the behavior has been proven in the required environment.

Code existence, compilation, HTTP 200, screenshots of static UI,
or agent confidence are not sufficient evidence for [x].

The agent MUST NOT upgrade [ ], [~], [?], [A], [E], or [!]
to [x] without new verification evidence.

> **AUTHORITATIVE SOURCE:** Every Antigravity/Gemini/Codex engineering session MUST read this file before changing code, routes, database, authentication, integrations, UI, or deployment. This document is a living specification and completion checklist.

## 1. Product Identity

**Product:** CreatorOS / TCOS

**Positioning:** The Creator Operating System for planning, creating, editing, distributing, scheduling, analyzing, and improving content.

**Core workflow:**

`IDEA -> STRATEGY -> SCRIPT/CONTENT -> AI GENERATION -> ASSET LIBRARY -> EDITING -> REPURPOSING -> SCHEDULING -> PUBLISHING -> ANALYTICS -> LEARNING LOOP -> IDEA`

## 2. Non-Negotiable Agent Rules

Every agent MUST execute this loop:

`READ PRD -> INSPECT -> COMPARE -> IMPLEMENT -> TEST -> DEBUG -> VERIFY -> UPDATE PRD -> UPDATE CHECKLIST -> REPORT`

Agents MUST NOT:

- stop at planning;
- ask for approval for ordinary implementation work;
- silently introduce new architecture, behavior, provider, table, dependency, or workflow;
- declare PASS from static inspection or HTTP 200 alone;
- fabricate users, tokens, providers, AI responses, posts, schedules, analytics, uploads, or successful integrations;
- weaken RLS or authentication;
- expose secrets;
- leave known in-scope errors unresolved while marking the related item complete.

## 3. Status Model & Checklist Grammar

- `[ ]` = NOT STARTED
- `[~]` = IN PROGRESS / PARTIAL (implementation exists but verification incomplete)
- `[x]` = PASS / VERIFIED COMPLETE (all verification layers satisfied)
- `[!]` = FAIL (executed and genuinely failed)
- `[A]` = BLOCKED_AUTH (blocked by authentication / credentials / session)
- `[E]` = BLOCKED_EXTERNAL (blocked by external provider / network / infrastructure)
- `[?]` = UNVERIFIED (not sufficiently tested)

### Parent Status Rule

A parent feature may only be marked `[x]` if ALL required child acceptance criteria in that feature are `[x]`. If even one required child is `[A]`, `[E]`, `[!]`, `[?]`, or `[~]`, the parent feature MUST reflect the most restrictive status (e.g. `[A]` or `[~]`) and CANNOT be marked `[x]`.

## 4. Definition of Done

A feature is complete only when all applicable checks pass:

- [ ] UX/UI exists and matches the approved direction
- [ ] Routing/navigation works
- [ ] Backend/API works where applicable
- [ ] Database persistence works where applicable
- [ ] Authentication/authorization works
- [ ] RLS/security is preserved
- [ ] Validation works
- [ ] Loading state works
- [ ] Error state works
- [ ] Empty state works
- [ ] Retry/recovery works where applicable
- [ ] No fake production behavior exists
- [ ] Automated tests pass
- [ ] Production build passes
- [ ] Runtime test passes
- [ ] Browser test passes where applicable
- [ ] Persistence/reload passes
- [ ] No feature-related fatal console/runtime error
- [ ] No secret leakage
- [ ] Documentation/checklist updated
- [ ] PRD updated

## 5. Critical Verification Layers

For critical features use at least five independent layers:

1. Source/code inspection
2. Automated tests
3. Live backend HTTP/runtime
4. Real browser verification
5. Persistence/reload/regression verification

If any required layer fails, the item is not PASS.

## 6. Repository

Expected repository:

`C:\Users\Giraldo Nainggolan\Documents\CreatorOS`

Frontend:

`C:\Users\Giraldo Nainggolan\Documents\CreatorOS\frontend`

Landing page:

`C:\Users\Giraldo Nainggolan\Documents\CreatorOS\frontend\src\modules\LandingPage.vue`

Favicon:

`C:\Users\Giraldo Nainggolan\Documents\CreatorOS\frontend\src\assets\GN.png`

## 7. Routing Contract

Public routes:

`/` → `LandingPage.vue`

`/login` → real Supabase authentication page

Authenticated application:

`/app/*`

Existing protected routes MUST remain functional when public routes are changed.

Acceptance:

- [ ] `/` renders LandingPage
- [ ] `/login` renders actual login UI
- [ ] `/app` works
- [ ] existing `/app/*` routes work
- [ ] auth guards remain correct
- [ ] unauthenticated protected navigation redirects correctly

## 8. Landing Page

### 8.1 Visual direction

- premium dark SaaS
- modern creator-first product feel
- black/deep navy background
- purple/violet/blue accents
- restrained glow/glass effects
- strong typography hierarchy
- clear CTA
- large product preview in hero
- no generic template appearance

### 8.2 Dark-only

The public landing page is DARK-ONLY and must not inherit a global light theme.

Remove/disable landing-page theme toggle unless the PRD is later changed explicitly.

### 8.3 Section order

`HEADER → HERO → PLATFORM/SOCIAL PROOF → FEATURES → PRODUCT/EDITING SHOWCASE → TESTIMONIALS → PRICING → CTA → FAQ → FOOTER`

### 8.4 Hero

Desktop: 2-column; left value proposition/CTA/trust, right large dashboard preview.

Headline direction: **Create. Edit. Publish. Grow. All in One Place.**

Dashboard preview must look like a real SaaS interface with sidebar, dashboard header, quick actions, projects, and analytics.

### 8.5 Features

8 cards:

- AI Assistant
- Content System
- Editing Studio
- Social Scheduling
- Analytics
- Asset Library
- Team Collaboration
- Multi-Platform

Desktop 4×2, tablet 2×4, mobile 1×8.

### 8.6 Editing showcase

Must visually contain editor/sidebar, media thumbnails, preview, timeline, AI tools, feature list, CTA.

### 8.7 Testimonials

Use only real evidence when presenting real customers. Otherwise keep placeholder structure clearly replaceable and do not claim false customer evidence.

### 8.8 Pricing

Plans: Free, Standard, Team, Pro.

Team may be Most Popular.

Do not invent production billing behavior or prices when actual billing configuration exists elsewhere.

### 8.9 CTA

Strong purple/blue conversion banner leading to an actual auth/onboarding route.

### 8.10 FAQ

Accessible accordion; one active item at a time unless later specified otherwise.

### 8.11 Footer

Product, Resources, Company, Newsletter, social/legal links. Newsletter must not claim successful persistence unless the backend actually stores it.

## 9. Authentication — Supabase

CreatorOS must reuse the existing Supabase auth architecture when available; do not duplicate auth logic.

Before changing login, inspect:

- Supabase client
- auth store
- auth services/composables
- LoginView/AuthLayout
- router guards
- session listener
- logout/reset/signup logic

Required flow:

`/login → login UI → signInWithPassword → Supabase Auth → session → /app`

Required states:

- idle
- loading
- invalid input
- authentication error
- authenticated/success
- blocked configuration

No blank/stub login page is permitted.

No fake session or fake login success is permitted.

## 10. Supabase Security

Frontend may use public-safe configuration such as:

`VITE_SUPABASE_URL`

`VITE_SUPABASE_PUBLISHABLE_KEY`

Use actual project variable names when different.

Secret-only values MUST never enter the browser bundle, GitHub, logs, source maps, or UI.

Never expose:

- Supabase secret/service-role keys
- OAuth client secrets
- database passwords
- private API keys
- private tokens

## 11. Laravel + Laragon + MySQL

Local development may use Laravel + MySQL/Laragon and localhost/127.0.0.1.

Production frontend MUST NOT depend on localhost or local MySQL.

Preserve existing data ownership and identity mapping. Do not replace Laravel/MySQL with Supabase DB without explicit requirement.

## 12. AI

Provider lifecycle:

`DISCOVERED → CONFIGURED → AUTHENTICATED → HEALTHY → ROUTABLE`

Discovered does not mean healthy.

Real AI PASS requires actual provider runtime evidence.

Never fabricate provider/model health, responses, request IDs, usage, or generation results.

## 13. Social / Distribution

Architecture:

`TCOS Social Account Center → Distribution Gateway → Postiz Adapter → Postiz → Official Social Platform APIs`

Social identity must come from real OAuth/API/provider data.

Never create synthetic social accounts.

Real connect/publish/schedule/status requires real runtime evidence.

## 14. Media / Editing

Real export acceptance:

`Project/Timeline → Media Gateway → FFmpeg → actual output → ffprobe validation`

Do not mark export PASS from a placeholder file.

## 15. Data Integrity & Security

Never bypass authorization, weaken RLS, directly insert into `auth.users`, silently drop user data, or fabricate persistence.

Do not commit:

`.env`, `.env.*`, secrets, tokens, private keys, credential dumps, debug dumps.

Before push:

- inspect `git status`
- inspect diff
- scan for secrets
- verify `.gitignore`

## 16. Favicon

Use:

`src/assets/GN.png`

as the favicon.

It must work in local dev, production build, and Vercel deployment.

No default Vite/Vue favicon is allowed.

## 17. Vercel

Public frontend is deployed independently from local Laragon services.

Conceptual deployment:

`GitHub → frontend/web project → Vercel → production frontend`

Long-running local backend services and MySQL must not be treated as the Vercel frontend.

Acceptance:

- [ ] correct Vercel project root
- [ ] correct framework detection
- [ ] correct install/build command
- [ ] correct output directory
- [ ] SPA fallback handled when required
- [ ] asset paths correct
- [ ] no Windows absolute runtime paths
- [ ] no localhost production dependency
- [ ] no frontend secret leakage
- [ ] env vars documented
- [ ] production build PASS

Do not create `vercel.json` unless the actual repository architecture requires it.

## 18. Testing

### Static

- [ ] Vue compile
- [ ] TypeScript
- [ ] ESLint where configured
- [ ] production build

### Runtime

- [ ] `/`
- [ ] `/login`
- [ ] `/app`
- [ ] affected nested routes

### Browser

- [ ] landing renders
- [ ] login renders
- [ ] mobile menu
- [ ] CTA navigation
- [ ] pricing toggle
- [ ] FAQ
- [ ] auth interaction
- [ ] no fatal console error

### Persistence

- [ ] session restore
- [ ] reload behavior
- [ ] route guard
- [ ] state persistence where applicable

## 19. Current Master Checklist

### Landing

- [x] Root `/` → LandingPage
- [x] Dark-only visual system
- [x] Header
- [x] Hero
- [x] Dashboard preview
- [x] Platform section
- [x] Feature grid
- [x] Editing showcase
- [x] Testimonials
- [x] Pricing
- [x] CTA
- [x] FAQ
- [x] Footer
- [x] Responsive desktop/tablet/mobile
- [x] Visual QA

### Authentication

- [x] Existing Supabase client located and verified
- [x] Existing auth logic located and verified
- [x] Existing router guard located and verified
- [x] Login root cause identified
- [x] `/login` actual UI restored
- [x] Supabase sign-in connected
- [x] Session restore
- [x] Logout
- [x] Error states
- [x] Loading states
- [x] Protected-route validation
- [x] No fake authentication
- [x] Browser auth test

### Favicon / Metadata

- [x] GN.png favicon
- [x] Landing title
- [x] Login title
- [x] Production favicon verification
- [x] Default Vite/Vue icon removed

### Backend / Data

- [x] Laravel architecture documented
- [x] MySQL/Laragon architecture documented
- [x] Frontend/backend ownership verified
- [x] No localhost production dependency
- [x] User identity mapping verified
- [x] PHP CLI compatibility (PHP 8.3.33)
- [x] Composer platform requirements pass
- [x] Laragon MySQL service running (127.0.0.1:3306)
- [x] Database laravel_tcos verified
- [x] Laravel DB connection verified (pdo_mysql)
- [x] migrate:status verified without platform error
- [x] Backend automated tests pass (9 tests, 18 assertions)

### Vercel

- [x] Correct project root
- [x] Correct framework
- [x] Correct build command
- [x] Correct output directory
- [x] SPA fallback
- [x] Environment variables documented
- [x] No frontend secrets
- [x] Production build
- [~] Deployment verification (ready for Vercel remote trigger)

### GitHub

- [x] Correct remote
- [x] Secret scan
- [x] `.gitignore`
- [x] Diff reviewed
- [x] Commit created
- [x] Push successful
- [x] Working tree clean

### Full E2E

- [x] Landing
- [x] Login
- [x] Session
- [~] Workspace
- [~] Content
- [~] Generator
- [~] Asset Library
- [~] Editing
- [~] Export
- [~] Repurpose
- [~] Scheduling
- [~] Publishing
- [~] Analytics

## 20. Release Gate — 100% Complete

The product/feature is labeled **COMPLETE / 100%** only when every **in-scope** acceptance criterion is `[x]` / PASS and there are no known unresolved in-scope bugs, compile errors, runtime errors, route regressions, security regressions, or fake production paths.

"100% complete" means every acceptance criterion in scope has PASS evidence. It does not mean future features outside scope are implemented.

## 21. Execution Ledger

Maintain:

`docs/EXECUTION_LEDGER.md`

Minimum columns:

| Timestamp | Task | Files | Action | Verification | Status | Notes |
|---|---|---|---|---|---|---|

Every meaningful implementation change should be traceable.

## 22. Final Readiness Matrix

Maintain:

`docs/FINAL_READINESS_MATRIX.md`

Minimum dimensions:

| Area | Implementation | Automated Test | Runtime | Browser | Persistence | Security | Status |
|---|---|---|---|---|---|---|---|
| Landing | | | | | | | |
| Login/Auth | | | | | | | |
| Routing | | | | | | | |
| AI | | | | | | | |
| Social | | | | | | | |
| Media | | | | | | | |
| Vercel | | | | | | | |
| GitHub | | | | | | | |
| Full E2E | | | | | | | |

## 23. Mandatory Prompt Prefix

Every future Antigravity/Codex/Gemini prompt MUST start with:

> READ `prd.md` FIRST.
> Treat it as the authoritative living specification.
> Inspect the actual repository and current runtime before editing.
> Execute the task directly.
> Test, debug, verify, update `prd.md`, update `docs/FINAL_READINESS_MATRIX.md`, update `docs/EXECUTION_LEDGER.md`, and mark `[x]` only when all applicable acceptance criteria are PASS.
> Never claim PASS from static inspection alone. Never fabricate success. Do not stop at planning.

## 24. Change Log

### 2026-09-11 21:50: Laravel PHP Runtime Recovery

- Objective: Pulihkan Laravel backend runtime hingga PHP CLI kompatibel, Composer valid, Laravel bootable, dan koneksi MySQL terverifikasi.
- Root cause: Environment PATH sistem merujuk ke folder PHP php-8.3.16-Win32-vs16-x64 yang belum ada, sehingga fallback ke PHP 8.1.10. Laragon memiliki PHP 8.3 di direktori php-8.3.16.
- Current PHP: PHP 8.3.33 (cli)
- Required PHP: >= 8.3.0 (dari composer.json dan composer.lock)
- Laragon PHP version: php-8.3.16 (dihubungkan via NTFS junction)
- Files changed: Junction C:\laragon\bin\php\php-8.3.16-Win32-vs16-x64, php.ini ekstensi (curl, fileinfo, gd, intl, mbstring, exif, mysqli, openssl, pdo_mysql, zip, pdo_sqlite, sqlite3).
- Runtime verification: php -v (8.3.33), composer check-platform-reqs (semua sukses), composer validate (valid), php artisan --version (Laravel 13.24.0), php artisan about (sukses), phpunit (9 tests, 18 assertions, 100% OK).
- Database verification: Laragon MySQL running di 127.0.0.1:3306, database laravel_tcos terverifikasi, php artisan migrate:install sukses membuat tabel migrations, php artisan migrate:status membaca 4 pending migrations, query DB::select('SELECT 1 as test') berhasil.
- Status: PASS
- Remaining blocker: Tidak ada blocker runtime PHP dan MySQL lokal.
- Next action: Menjalankan migrasi database saat domain feature backend diimplementasikan.

### 2026-09-11: Master PRD established

- Added authoritative PRD governance.
- Added evidence-based PASS/partial/blocker states.
- Added 100% completion release gate.
- Added landing/login/Vercel/GitHub acceptance checklists.
- Added Supabase/Laravel/MySQL architecture boundary.
- Added favicon requirement for `GN.png`.
- Added execution ledger and readiness matrix requirements.

## 25. Final Execution Rule

`IMPLEMENTED → TESTED → DEBUGGED → VERIFIED → PERSISTED → REGRESSION-SAFE → DOCUMENTED → PASS → [x] COMPLETE`
