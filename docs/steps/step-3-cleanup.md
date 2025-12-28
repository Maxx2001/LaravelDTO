# Step 3: Execute Phase 0 (Cleanup)

**WAIT** until you've completed Step 2 (Load Context), then copy and paste the code block below into the Composer chat and hit **Enter**. Wait for completion before proceeding.

```text
You are an autonomous Documentation Engineer. Execute ONLY Phase 0 (Cleanup).

**PHASE 0 (Cleanup):**
- Scan the `docs/` directory.
- **DELETE** the default Mintlify folders: `docs/essentials`, `docs/api-reference`.
- **DELETE** old `.mdx` files in the root of `docs/` (e.g. old `introduction.mdx`), but keep `index.mdx` as it serves as the Introduction page.
- **CRITICAL EXCEPTION:** Do **NOT** delete any file or folder named `ai-tools` (or containing "ai-tools"). Keep `docs.json` (or `mint.json`).
- Ensure the `docs/` folder is clean before starting generation.

Report when Phase 0 is complete. Do NOT proceed to other phases.
```

