# ADR-001: Overall Software Architecture

## Status
Proposed

## Context
CreatorOS is an AI-first Knowledge Operating System designed to transform structured business knowledge into content, digital products, and business assets. The initial deployment target is a single operator while keeping the architecture extensible for future multi-user support, maintaining a high operational cadence. Local development must remain lightweight and runnable on low-resource environments, making efficient local tooling a necessity. The initial implementation covers the six fully specified business domains (Brand, Audience, ContentSystem, Script, Recording, Editing). Approved domains 07–17 already exist as business domains and will be integrated incrementally once their technical specifications are completed.

## Problem
We need to determine the high-level system architecture that supports rapid workflows for the initial deployment target (while extensible for multi-user) and enforces strict alignment with the existing business knowledge domains, while ensuring local development remains lightweight and runnable on low-resource environments.

## Decision
We will adopt a **Modular Monolith** architecture consisting of one deployable backend (Laravel/REST) and one deployable frontend. The frontend technology stack will be finalized in a dedicated Frontend ADR.

The backend module boundaries will exactly mirror the approved business knowledge domains. Initially, this includes:
1. Brand
2. Audience
3. ContentSystem
4. Script
5. Recording
6. Editing
7. Analytics

Additionally, the backend will contain:
- A `Pipeline` module that orchestrates Content Items and depends on the domains (dependencies point inward).
- A `QualityGate` that evaluates Brand rules and persists immutable evaluation results (`GateEvaluation`).

## Alternatives Considered
- **Microservices:** Rejected. The initial deployment target is a single operator and there is no immediate scaling driver. Services would introduce unnecessary network failure modes and deployment complexity.
- **Event Sourcing across all modules:** Rejected. The complexity far exceeds the domain's needs. An append-only stage transition history for Content Items is sufficient for auditability.
- **Local Docker Compose (Multi-container):** Rejected as the default path due to the low-resource environment constraint. The stack must remain lightweight and runnable without heavy local virtualization.

## Consequences
- **Positive:** Local development remains fast and feasible on low-resource environments.
- **Positive:** Strict 1:1 mapping between business knowledge folders and code modules simplifies the AI agent workflow and mental model.
- **Positive:** A single deployment artifact reduces operational overhead for the initial deployment target.
- **Positive:** The frontend remains free of business rules, solely rendering the results of the backend `QualityGate`.
- **Negative:** The backend must be strictly disciplined about module boundaries (using public module APIs only) to prevent spaghetti code within the monolith.
- **Negative:** Harder to scale horizontally on a per-module basis, though this is acceptable given the initial deployment target.
