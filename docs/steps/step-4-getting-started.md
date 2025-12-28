# Step 4: Execute Getting Started Section

**WAIT** until Phase 0 (Cleanup) is complete, then copy and paste the code block below into the Composer chat and hit **Enter**. Wait for completion before proceeding.

```text
You are an autonomous Documentation Engineer. Execute ONLY the Getting Started section (Phase 1).

**CRITICAL:** This is a SEPARATE step. Only work on Getting Started files. Do NOT proceed to Domains or Business Logic.

**EXECUTE PHASE 1 (Getting Started - Essentials):**
- Create or update `docs/index.mdx` (this is the Introduction page - do NOT create a separate `introduction.mdx` file).
- Create `docs/setup.mdx` and `docs/development.mdx`.
- **CRITICAL:** All introduction content should go into `index.mdx`, not a separate introduction file.
- Ensure the Setup guide includes the specific Docker/OrbStack cards as defined in `@DOCS_PLAN.md`.
- **CRITICAL FOR DEVELOPMENT.MDX:** The very first step of the workflow MUST be: "Check the `docs/ai-tools` documentation and generate/apply the correct `.cursorrules` files for your domain."
- **CRITICAL FOR INDEX.MDX:** After the Navigation CardGroup, add a new section titled "Documentatie Workflows" with a CardGroup containing:
  * A Card linking to `/development` (Development Workflow)
  * A Card linking to `/steps/step-incremental-update` (Incremental Documentation Updates) explaining that developers can use this to keep documentation in sync during development
  * The Card should mention: "Update documentation incrementally when making code changes - no need to regenerate everything"
- **CRITICAL FOR DEVELOPMENT.MDX:** After the "Frontend Component" step, add a new step titled "Documentatie Bijwerken" that explains:
  * After making code changes (Models, DTOs, Actions), developers should update documentation
  * Use the incremental update step: `docs/steps/step-incremental-update.mdx`
  * This step detects git changes and updates only affected documentation files
  * Can compare against a branch (master/dev) or use uncommitted changes
  * Include a brief example workflow showing how to use it
- **CRITICAL FOR STEP-INCREMENTAL-UPDATE.MDX:** Create `docs/steps/step-incremental-update.mdx` file:
  * **STEP 1:** Check if `docs/steps/step-incremental-update.md` exists. If it exists, read it to extract the prompt text (the content between ```text and ```).
  * **STEP 2:** Create `docs/steps/step-incremental-update.mdx` with the following structure:
    - Frontmatter with: title "Incremental Documentation Updates", description about updating docs incrementally, icon "arrows-rotate"
    - Overview section explaining what the step does (detects changes, updates only affected files, validates, etc.)
    - "When to Use" section with bullet points
    - "How to Use" section with 3 subsections:
      - Stap 1: Open Cursor Composer
      - Stap 2: Load Context (list the required @ references)
      - Stap 3: Voer de Update uit - **CRITICAL:** Include the FULL prompt text from the .md file in a code block (```text ... ```). The prompt should start with "You are an autonomous Documentation Engineer..." and include all 9 steps.
    - Comparison modes section explaining Branch Comparison vs Uncommitted Changes
    - Usage examples section with 3 examples
    - Benefits section
  * **CRITICAL:** The prompt code block in "Stap 3" must contain the COMPLETE prompt text extracted from `step-incremental-update.md`, including all 9 steps. Do NOT just reference the file - include the full text.
  * **CRITICAL:** If `step-incremental-update.md` does not exist, create the .mdx file with a standard structure and include a placeholder note that the prompt should be added.
  * The page must be self-contained - users should be able to copy the prompt directly from the page without needing to find the .md file.
- Analyze `@composer.json` and `@package.json` for accurate commands.

Report when Phase 1 (Getting Started) is complete. Do NOT proceed to Domains or Business Logic.
```

