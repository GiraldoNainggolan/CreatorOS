# ADR-005: Application Architecture

## Status
Proposed

## Context
Having established a Modular Monolith (ADR-001), defined strict Module Boundaries (ADR-002), and chosen a Rich Domain Model (ADR-004), we must now define how the Application Layer interacts with the Domain Layer. We need a consistent architecture to coordinate use cases, manage transactions, and handle data flow between the presentation layer and the database, while strictly ensuring the Domain Layer remains independent of any infrastructure or framework concerns.

## Problem
Without a strictly defined application architecture, developers tend to leak business logic into controllers, infrastructure concerns (like ORM methods) into the domain, or cross-module boundaries via direct database access. This results in tightly coupled, untestable code that destroys the benefits of the modular monolith and domain-driven design, making future evolution and maintenance highly risky.

## Decision

We will adopt **Clean Architecture** principles within each module to structure the codebase.

1. **Layered architecture:** Each module will be internally divided into four distinct layers: Presentation, Application, Domain, and Infrastructure.
2. **Responsibilities of each layer:**
   - **Presentation:** Handles HTTP routing, request parsing, and formatting responses. Maps external requests to Application commands/queries.
   - **Application:** Orchestrates use cases. Fetches aggregates from repositories, invokes domain methods, and saves them. Does not contain business logic.
   - **Domain:** The core. Contains Aggregate Roots, Entities, Value Objects, and Domain Services (per ADR-004). Enforces all business invariants.
   - **Infrastructure:** Implements the repository interfaces, database persistence (PostgreSQL/Laravel), and external API integrations.
3. **Dependency direction:** The Dependency Rule applies strictly: dependencies must always point *inward* toward the Domain layer. The Domain layer depends on nothing.
4. **Application services:** Act as use case orchestrators. They receive DTOs, execute the required transaction, and return DTOs. 
5. **Domain services:** Hold domain logic that spans multiple aggregates within the same module, remaining completely ignorant of application context or infrastructure.
6. **Repository interfaces:** Defined inside the Domain layer (to establish contracts) but implemented inside the Infrastructure layer. This Dependency Inversion keeps the Domain completely agnostic to the database.
7. **DTO strategy:** Data Transfer Objects (DTOs) are used for all communication crossing the Application boundary (both incoming from Presentation and crossing between different modules as per ADR-002). Domain Entities must never cross these boundaries.
8. **Command / Query separation:** We conceptually separate reads from writes. Commands mutate the domain via Aggregate Roots. Queries bypass the domain entirely, using the Infrastructure layer to project database rows directly into Read DTOs (aligning with ADR-004 Read Model strategy).
9. **Domain Event handling:** Aggregate Roots record Domain Events internally during mutation. The Application Service dispatches these events via Laravel's synchronous event dispatcher within the same database transaction. Subscribing modules handle these events synchronously, participating in the parent transaction.
10. **Validation strategy:** 
    - **Syntactic Validation:** Format, presence, and type checking occur at the Presentation layer (e.g., HTTP Form Requests).
    - **Semantic Validation:** Business rule validation occurs exclusively inside the Domain layer (Aggregate Roots and Value Objects).
11. **Transaction coordination:** The Application Service acts as the transaction boundary for a single use case. It opens the transaction, coordinates the domain, and commits. For cross-module coordination, we mandate *synchronous* Domain Events (Hybrid Choreography) instead of sagas or asynchronous queues to maintain core transactional integrity.
12. **Error handling philosophy:** The Domain layer throws specific Domain Exceptions (e.g., `InvalidStageTransitionException`). The Application layer allows these to bubble up to the Presentation layer, which maps them to appropriate HTTP status codes (e.g., 400 Bad Request or 422 Unprocessable Entity).
13. **Module interaction rules:** Modules interact exclusively by injecting and calling the Application Services (or a dedicated Module Facade) of other modules, passing and receiving only DTOs.
14. **Testing boundaries:**
    - **Domain:** Unit tested in absolute isolation (no framework, no database).
    - **Application:** Integration tested using in-memory or test databases and mocked external services.
    - **Presentation:** End-to-End/Feature tested via HTTP requests.

## Alternatives Considered

- **Clean Architecture (Accepted):** Provides the necessary Dependency Inversion to protect the Rich Domain Model (ADR-004) from the Laravel infrastructure, ensuring long-term maintainability.
- **Traditional Layered Architecture (Rejected):** (Presentation -> Application -> Domain -> Infrastructure). In this model, the Domain depends on Infrastructure, which couples business rules to the database and violates our requirement for infrastructure independence.
- **Hexagonal Architecture / Ports and Adapters (Rejected in name only):** Conceptually identical to our application of Clean Architecture. We rejected the specific "Hexagonal" terminology in favor of Clean Architecture's concentric layer vocabulary, which maps more intuitively to directory structures in modern PHP frameworks.
- **Onion Architecture (Rejected in name only):** Similarly, provides the same dependency inversion benefits, but Clean Architecture provides a more universally understood set of terms for this ecosystem.

## Consequences

### Positive Consequences
- **Testability:** The domain logic can be tested instantly without booting the framework or database.
- **Maintainability:** Infrastructure changes (e.g., swapping a third-party API or changing the database schema) do not affect business logic.
- **Clear Boundaries:** Prevents the accidental leakage of HTTP context (e.g., Requests, Sessions) into the business logic.

### Negative Consequences
- **Boilerplate:** Requires creating interfaces for repositories, mapping entities to DTOs, and separating layers, which slows down initial development compared to RAD (Rapid Application Development) approaches.
- **Complexity:** Developers must understand the distinct responsibilities of Application Services vs. Domain Services.

### Trade-offs & Future Risks
- **Framework Friction:** Laravel is heavily optimized for Active Record (Eloquent) and MVC. Forcing Clean Architecture introduces friction against the framework's default patterns. We accept this trade-off to protect the integrity of the knowledge domains in the long term.

## Out of Scope
This ADR strictly defines the application architecture and coordination strategy. It **does NOT** define:
- APIs or API protocols (REST/GraphQL)
- Controllers or Routes
- Database tables or Entity-Relationship Diagrams (ERDs)
- Specific framework implementations (e.g., how Laravel Service Providers will bind interfaces)
