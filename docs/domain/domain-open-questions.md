# DOMAIN OPEN QUESTIONS

1. **ContentItem Persistence**: If `ContentItem` is just an orchestration correlation ID, do we need a dedicated `content_items` table, or do we just link `Idea.id` -> `Script.idea_id` -> `Media.script_id`?
2. **Reconstructed Script Invariants**: Are the hook/length constraints strictly enforced or soft warnings?
3. **Corrupted Media Definitions**: How do we define the lifecycle of meme assets if the originals are corrupt?
