# ARCHITECTURE RISK REGISTER

| Risk | Cause | Impact | Likelihood | Severity | Mitigation | Validation | Source |
|---|---|---|---|---|---|---|---|
| Reconstructed Script Rules | Original `04_SCRIPT.docx` is lost | AI generates incorrect prompts/rules | High | Critical | Await human review | Owner approval | `04_SCRIPT.md` (RECONSTRUCTED) |
| Pipeline Coupling | Pipeline module depends on 17 domains | Monolith becomes spaghetti | Medium | High | Strict inbound-only dependencies | Code review | Architecture |
| Corrupted Media Constraints | Zero-filled assets | UI breaks when rendering placeholders | Certain | Low | Handle null/corrupt asset URLs | UI Tests | Media Audit |
