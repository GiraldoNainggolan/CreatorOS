# API Architecture & Contracts
**Status:** PROPOSED

## 9. API Architecture
- **Versioning:** URL-based (`/api/v1/`).
- **Convention:** Noun-based REST (`/api/v1/pipeline/items`).
- **Status Codes:**
  - `200 OK`: Success (Read/Update).
  - `201 Created`: Resource created.
  - `204 No Content`: Successful Delete.
  - `400 Bad Request`: Domain Exception / Business Rule Violation.
  - `401 Unauthorized`: Unauthenticated.
  - `403 Forbidden`: RBAC violation.
  - `404 Not Found`: Resource missing.
  - `422 Unprocessable Entity`: Syntactic validation failure.
- **Response Format (JSend / Envelope):**
  ```json
  {
    "success": true,
    "data": { "id": "uuid", "title": "..." },
    "meta": null
  }
  ```

## 10. API Endpoint Specification (Examples)

### Pipeline Module
**Move Content Item Stage**
- **METHOD:** POST
- **PATH:** `/api/v1/pipeline/items/{id}/advance`
- **PURPOSE:** Business use case to push an item forward in the pipeline.
- **AUTHORIZATION:** Requires `owner` role.
- **REQUEST:** 
  ```json
  { "target_stage": "SCRIPT" }
  ```
- **RESPONSE (200):** Updated Pipeline Item DTO.
- **ERROR (400):** If QualityGate blocks transition.

### Script Module
**Mark Script as Ready**
- **METHOD:** POST
- **PATH:** `/api/v1/scripts/{id}/mark-ready`
- **PURPOSE:** Finalizes drafting phase.
- **RESPONSE (200):** Script DTO with `status` = 'READY'.

## 11. API Contract Standards

**Validation Error (422)**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "title": ["Title is required"]
  }
}
```

**Business Rule Violation (400)**
```json
{
  "success": false,
  "message": "Cannot advance stage. Quality gate failed.",
  "code": "PIPELINE_GATE_FAILED"
}
```
