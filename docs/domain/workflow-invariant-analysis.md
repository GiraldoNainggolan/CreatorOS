# WORKFLOW INVARIANT ANALYSIS

## Challenge: "Pipeline stages cannot be skipped"

**Is this a true domain invariant?**
No. 

**Analysis:**
The rule that "Script must precede Recording" is a WORKFLOW CONSTRAINT and an APPLICATION ORCHESTRATION RULE. 
If an operator manually creates a Recording without a formal Script, the `Recording` business entity is not inherently invalid in the real world (e.g., impromptu vlog). The rigid factory pipeline enforces this to maintain quality, making it a system rule, not a pure domain invariant.

**Classification:** APPLICATION ORCHESTRATION RULE
**Confidence:** High
**Status:** VERIFIED

## Cross-Context Relationships (Semantic)
- `Content System` -> (Artifact Transfer: Idea) -> `Content Production`
- `Content Production` -> (Artifact Transfer: FinalCut) -> `Content Distribution`
- `Content Distribution` -> (Event: PostPublished) -> `Analytics`
- `Pipeline` -> (Orchestration) -> All Contexts
