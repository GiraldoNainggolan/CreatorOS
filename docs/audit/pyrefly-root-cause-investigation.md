# Pyrefly Root Cause Investigation

## Diagnostic IDs
- `C:\__pyrefly_virtual__\inmemory\55-0.py`
- `C:\__pyrefly_virtual__\inmemory\63-2.py`

## Physical File Verification
- `C:\__pyrefly_virtual__` directory: **Does not exist**
- `55-0.py` / `63-2.py`: **Do not exist physically** in the workspace.

## Virtual Buffer Evidence
Because `__pyrefly_virtual__` is a virtual path schema, the buffer exists entirely in the IDE's memory (RAM) or the Language Server's internal temporary cache. It is inaccessible to the agent's physical file-reading tools.

## Exact Virtual Buffer Content
- **55-0.py virtual content**: UNKNOWN — IDE INTERNAL BUFFER
- **63-2.py virtual content**: UNKNOWN — IDE INTERNAL BUFFER
- **Origin**: IDE INTERNAL BUFFER (Most likely the IDE's Chat Window/Conversation pane or a stale language server cache).

## Source Correlation
- **Virtual File**: `55-0.py` and `63-2.py`
- **Virtual Content**: (Inferred from errors) A standalone snippet containing `    doc.build(Story)`.
- **Source Document**: UNKNOWN — IDE INTERNAL BUFFER
- **Source Location**: N/A
- **Trigger**: The text `    doc.build(Story)`
- **Why Pyrefly Parses it as Python**: The IDE intercepts Markdown code blocks anywhere in its UI (including the Chat Pane, Conversation Transcript, or old cached `.md` files) and sends them to Pyrefly to provide syntax highlighting. Because the snippet is isolated, it lacks the surrounding `def` block, causing "Unexpected indentation", and lacks imports, causing "Could not find name `doc`".

## Current Triggers
A full workspace search reveals that `doc.build(Story)` now exists **only** in three valid Python files:
1. `scratch/pilot_07_posting.py`
2. `scratch/generate_all_domains.py`
3. `scratch/generate_domain_documents.py`

There are no remaining Markdown files in the repository containing this snippet as a code block.

## Previous Trigger Verification
The previous markdown snippets in `docs/audit/phase-7-1-tooling-fix-report.md` and `docs/audit/phase-8-tooling-notes.md` were successfully neutralized in the previous phase. They no longer contain Python code block formatting. 

## Python Script Verification
- `doc` is defined locally in the scripts.
- `Story` is defined locally in the scripts.
- `doc.build(Story)` occurs in a valid Python context.
- Execution of `python -m py_compile` against all three scripts returned **0 errors**. The repository Python files are syntactically perfect.

## Root Cause
The naming convention `55-0.py` strongly indicates "Chat Turn 55, Snippet 0" (or similar conversation transcript indexing). Pyrefly is extracting code blocks from the IDE's internal Chat Window (where you pasted the error, and where I previously responded with the code) or from a stale language server cache. It is linting the conversation itself, not the repository files.

## Classification
**STALE IDE CACHE / MARKDOWN EXTRACTION ERROR (Chat UI)**

## Recommended Fix
**DO NOT MODIFY REPOSITORY FILES.** The repository is clean and syntactically valid.
To clear the diagnostic from the IDE Problems pane, the human operator must:
1. Restart the IDE or the Python Language Server (e.g., in VS Code: `Ctrl+Shift+P` -> `Python: Restart Language Server`).
2. Close the active Chat session/pane if the IDE is aggressively linting the conversation history.

## What Must NOT Be Modified
Do not modify the `scratch/*.py` files to fake a fix (e.g., adding `# type: ignore` or removing indentation). Doing so would break actual, valid Python code to silence a ghost diagnostic originating from the chat interface.
