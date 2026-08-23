# Technical Design Specification
**Status:** PROPOSED

## A. ARCHITECTURE

### 1. System Architecture
CreatorOS utilizes a **Modular Monolith** architecture optimized for a single-operator high-cadence workflow. 
- **Frontend (Vue.js SPA):** Renders UI, maintains presentation state (Pinia), and handles client-side routing. Interacts with the backend via REST JSON API.
- **Backend (Laravel API):** A single deployable service divided into strict internal modules. Receives HTTP requests, maps them to Application DTOs/Commands, and executes them within isolated Bounded Contexts.
- **Database (PostgreSQL):** A single physical database instance where modules own specific tables exclusively (via prefixing).
- **Communication Flow:**
  - **Synchronous:** HTTP Request → Controller (Presentation) → Application Service → Aggregate Root (Domain) → Repository (Infrastructure) → DB. Domain Events are dispatched and handled synchronously within the same database transaction.
  - **Asynchronous:** Reserved only for external API integrations (if any) or non-critical background jobs (e.g., generating exports, heavy data analytics crunching if implemented). Core business logic is synchronous to prevent eventual consistency headaches for a single user.

### 2. Architectural Pattern
- **Modular Monolith in Laravel:** Instead of standard MVC (`app/Models`, `app/Http/Controllers`), code resides in `app/Modules/{ModuleName}/`.
- **Clean Architecture:** Each module contains:
  - `Presentation`: HTTP concerns (Controllers, Requests, Resources).
  - `Application`: Use Cases, DTOs, Event Listeners.
  - `Domain`: Aggregate Roots, Entities, Value Objects, Repository Interfaces, Exceptions.
  - `Infrastructure`: Eloquent Models, Database access, external integrations.
- **Dependency Direction:** Presentation → Application → Domain ← Infrastructure. (Infrastructure implements Domain interfaces).
- **Module Boundaries:** Regulated by ADR-002. Modules communicate via Application layer DTOs, never via direct DB joins or Domain Entity leakage.

### 3. Module Architecture
See `docs/module-dependency-map.md` for detailed visual mapping and boundaries.

## B. BACKEND — LARAVEL

### 4. Laravel Folder Structure
```text
app/
├── Modules/
│   ├── Brand/
│   │   ├── Application/ (UseCases, DTOs)
│   │   ├── Domain/ (Aggregates: BrandProfile, QAChecklist)
│   │   ├── Infrastructure/ (Eloquent Models: BrandProfileModel)
│   │   └── Presentation/ (Controllers: BrandProfileController)
│   ├── Audience/
│   ├── ContentSystem/
│   ├── Script/
│   ├── Recording/
│   ├── Editing/
│   ├── Pipeline/ (Cross-cutting: Orchestrator)
│   ├── QualityGate/ (Cross-cutting: Evaluator)
│   └── Generator/ (Cross-cutting: Content Generator)
└── Shared/
    ├── Domain/ (ValueObjects: Platform, Shared Events)
    └── Infrastructure/ (Base classes, Event Dispatchers)
```
- **Domain Layer:** Pure PHP. No Laravel dependencies (no `Illuminate\*`).
- **Application Layer:** Orchestrates Domain. May use Laravel's synchronous Event Dispatcher.
- **Infrastructure Layer:** Where Eloquent models live. Models implement Repository Interfaces defined in Domain.
- **Presentation Layer:** Laravel Controllers and FormRequests. Maps HTTP to Application DTOs.

### 5. Backend Dependency Strategy
- **PHP Version:** `8.3` (Latest stable, robust typing).
- **Laravel Version:** `11.x` (Latest stable, minimal skeleton).
- **Required Packages:**
  - `ramsey/uuid`: For generating UUIDv7 in the Application layer before DB insertion.
  - `laravel/sanctum`: For lightweight SPA authentication.
- **Optional/Deferred Packages:**
  - `league/flysystem-aws-s3-v3`: Deferred until Q5 (Storage Strategy) is decided.
- **Why no complex CQRS/Event Sourcing packages?** To respect the 4GB RAM constraint and ADR-001 (Monolith). Laravel's native event dispatcher is sufficient for Synchronous Choreography.

## E. AUTHENTICATION & AUTHORIZATION

### 12. Authentication
*Based on Single-User Constraint, preparing for future expansion (Q1).*
- **Mechanism:** Laravel Sanctum (SPA Cookie-Based Authentication).
- **Token Strategy:** Stateful session cookies for web application.
- **Password Policy:** Minimum 12 characters, enforced via Laravel defaults.
- **Logout:** Standard session invalidation.
- **CSRF:** Enforced natively by Sanctum's CSRF protection for SPA.
- **Rate Limiting:** `throttle:api` middleware (e.g., 60 req/min) on all endpoints to prevent brute-force or runaway API calls.
- **DECISION REQUIRED:** Multi-tenant/Client portal auth flow is currently excluded until Q1 is finalized.

### 13. Authorization / RBAC
- **Roles:** Single hardcoded `owner` role for the primary user.
- **Permissions:** `owner` has root access.
- **Policies:** Laravel Policies will be implemented checking if `user()->role === 'owner'`. This separates auth from business logic and prepares the app for future `editor` or `client` roles.

## F. FRONTEND — VUE

### 14. Vue Architecture
- **Framework:** Vue 3 (Composition API, `<script setup>`).
- **Language:** TypeScript (Strict mode) to enforce API contracts (DTOs).
- **State Management:** Pinia.
- **Router:** Vue Router.
- **API Client:** Axios with global interceptors for auth headers and error handling.
- **Styling:** TailwindCSS (aligned with existing Brand UI guidelines).
- **Architecture:** Feature-based modules mirroring backend bounded contexts.

### 15. Vue Folder Structure
```text
src/
├── core/
│   ├── api/ (Axios instance, interceptors)
│   ├── components/ (Generic UI: Buttons, Modals)
│   ├── layouts/ (AppLayout, AuthLayout)
│   └── router/ (Global route config)
├── modules/
│   ├── pipeline/ (Pipeline Board View)
│   ├── content-system/ (Idea Bank, Libraries)
│   ├── script/ (Script Editor)
│   └── ... (Mirroring Backend Modules)
└── stores/ (Global shared state: auth, brand config)
```
- **modules/**: Contains domain-specific Vue components, composables, and local state.
- **core/**: App-wide infrastructure and dumb components.

### 16. State Management
- **Local State:** Component-specific (e.g., modal visibility, form inputs) managed via `ref()` and `reactive()`.
- **Shared State:** Global concerns (e.g., active user, loaded Brand Tokens) managed via Pinia (`authStore`, `brandStore`).
- **Server State:** Data fetched from API (e.g., Content Items, Scripts). Will be managed via composables (like `usePipelineQuery()`) with caching strategies, rather than stuffing everything into Pinia.
- **URL State:** Filters, pagination, and active tabs managed via Vue Router query parameters.

## G. CONTENT CREATOR WORKFLOW

### 17. Mapping CreatorOS Workflow
*Pipeline: IDEA → RESEARCH → SCRIPT → RECORDING → EDITING → REVIEW → READY → SCHEDULED → PUBLISHED → ANALYZED → REPURPOSED → ARCHIVED*

- **Example Stage: SCRIPT**
  - **Input:** ContentItem (Hook attached).
  - **Processing:** User authors script parts using ContentSystem Frameworks.
  - **Output:** Script marked 'Ready'.
  - **Database State:** `script_records` updated. `pipeline_stage_history` appends `SCRIPT`.
  - **Responsible Module:** `Script` (authoring), `Pipeline` (stage advancement).
  - **User Action:** Clicks "Move to Record".
  - **Automation:** `QualityGate` validates vocabulary. If passed, `ContentItemStageAdvanced` event is dispatched.

### 18. State Machine (Script Lifecycle)
```text
DRAFT
  ↓ (Action: Mark Ready)
READY
  ↓ (Action: Pipeline Advance to Published)
PUBLISHED
```
- **Valid Transitions:** DRAFT → READY. READY → PUBLISHED.
- **Side Effects:** Publishing locks the script (immutable).

## H. FILE & MEDIA

### 19. File Storage Architecture
**DECISION REQUIRED (Q5)**: Index-only vs Object Storage.
**Recommended Architecture (Assuming Index-Only for resource limits):**
- **Abstraction:** Infrastructure layer implements `MediaRepositoryInterface`.
- **Storage:** Files remain on local SSD or Google Drive.
- **Database:** `raw_assets` stores absolute/relative URIs (e.g., `file://D:/CreatorOS/RAW/...`).
- **Upload Flow:** None (frontend accesses files via local path mapping if applicable, or backend serves static symlinks).
- **Why:** Saves 4GB RAM server from processing/uploading gigabytes of 4K video.

## I. EVENTS / QUEUES / JOBS

### 20. Event Architecture
- **Domain Events (Synchronous):** `ContentItemStageAdvanced`, `GateEvaluationPassed`, `ScriptMarkedReady`.
- Dispatched inside DB Transaction. Listeners run in the same transaction.

### 21. Queue Architecture
- **Queues:** Deferred until external API integrations (e.g., YouTube API) are confirmed (Q3). 
- If implemented: `default` queue for webhook processing, `publishing` for external API calls. 
- **Retry Policy:** 3 retries, exponential backoff.

## J. NOTIFICATION

### 22. Notification Architecture
- **Scope:** In-app only (No email infrastructure needed for single-operator).
- **Events:** "Quality Gate Failed", "Upload Scheduled".
- **State:** `is_read` boolean flag in `notifications` table.

## K. AUDIT & OBSERVABILITY

### 23. Audit Logging
- **Target Entities:** `Pipeline` stage transitions, `QualityGate` evaluations.
- **Mechanism:** Append-only tables (`content_item_stages`, `gate_evaluations`). Captures User ID, Timestamp, Action, and Snapshot JSON (for Gate).

### 24. Observability
- **Application Logs:** Laravel daily log files (`storage/logs`).
- **Structured Logging:** JSON formatted logs for easier parsing if a stack like ELK is added later.

## L. SECURITY

### 25. Security Architecture
- **SQL Injection:** Mitigated via Laravel Eloquent Query Builder (parameterized).
- **XSS:** Vue.js auto-escapes templates.
- **CSRF:** Laravel Sanctum middleware.
- **Mass Assignment:** Enforced via DTO mapping; Eloquent models do not use `request()->all()`.
- **Secrets:** Handled strictly in `.env`.
- **API Abuse:** Rate limiting (Throttle).
- **CreatorOS Checklist:** 
  - [ ] No hardcoded tokens.
  - [ ] Validation in Domain (Semantic) AND Request (Syntactic).
  - [ ] QualityGate acts as a security boundary against brand contamination.

## M. TESTING

### 26. Testing Strategy
- **Unit Tests (Domain):** 100% coverage for Aggregate Roots and Value Objects (No framework/DB).
- **Integration Tests (Application/Infrastructure):** SQLite in-memory testing for Application Services and Repositories.
- **E2E Tests:** Playwright testing the critical 13-stage pipeline flow via Vue.

### 27. Acceptance Criteria (Pipeline Module)
- **Functional:** Content Item can advance 13 stages.
- **API:** Responds with 422 if attempting to advance past an open QualityGate.
- **Database:** Stage history contains exactly N append-only records corresponding to advancements.

## N. DEPLOYMENT

### 28. Deployment Architecture
- **Target:** Single VPS (e.g., DigitalOcean Droplet, 4GB RAM).
- **Stack:** Linux, Nginx, PHP 8.3 (FPM), PostgreSQL 16.
- **Vue:** Compiled to static HTML/JS (`npm run build`) and served via Nginx.
- **Laravel:** Serves `/api` requests via Nginx reverse proxy.
- **Database:** Running on the same VPS, backed up daily via `pg_dump` to an external S3 bucket (Cron job).

## P. DECISION REGISTER

See `docs/technical-design-specification.md` implementation section.

## Q. FINAL ARCHITECTURE VALIDATION
Done via self-review. All parameters strictly adhere to Modular Monolith constraints and existing ADRs.
