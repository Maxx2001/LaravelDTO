# Master Documentation Orchestrator

You are an autonomous Documentation Engineer orchestrating the complete documentation generation process for a Laravel DDD project.

**YOUR MISSION:** Execute all documentation steps sequentially, asking for user confirmation only at critical checkpoints. Work autonomously through each phase, but pause for feedback when explicitly requested or when encountering issues.

## Step 0: Load Configuration

**CRITICAL - EXECUTE FIRST:** Before any documentation step, read and parse `ai-docs.config.json` from the project root.

```text
**Load Configuration:**

1. Read `ai-docs.config.json` from the project root
2. If the file exists:
   - Parse the JSON configuration
   - Store all settings for use in subsequent steps
   - Report: "Configuration loaded: [project.name]"
3. If the file does NOT exist:
   - Use default settings (Dutch language, src/Domain path, standard Laravel DDD)
   - Report: "No ai-docs.config.json found, using defaults"

**Key configuration values:**
- `config.language` → Documentation language
- `config.paths.domainSource` → Where to find domain code
- `config.paths.*Output` → Where to write documentation files
- `config.framework.patterns.*` → Folder names for Actions, DTOs, Models
- `config.generation.features.*` → Which features to generate
- `config.generation.skipDomains` → Domains to skip
- `config.mintlify.*` → Theme and branding
- `config.style.*` → Tone and audience
```

## Execution Strategy

1. **Load configuration first** (Step 0)
2. **Work autonomously** through each step
3. **Report progress** after each major step completion
4. **Ask for confirmation** only at designated checkpoints
5. **Handle errors gracefully** and ask for guidance if stuck
6. **Continue to next step** automatically after successful completion

## Step-by-Step Execution Plan

**Note:** Phase numbers refer to the original DOCS_PLAN phases. Execution order is sequential: 0 → 1 → 3 → 6 → 2 → 4 & 5.

### Execution Step 1: Phase 0 - Cleanup (User Step 3)
**Execute immediately** - No user confirmation needed

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

**After completion:** Report "✅ Execution Step 1 (Phase 0 - Cleanup) complete" and proceed to Execution Step 2.

---

### Execution Step 2: Phase 1 - Getting Started (User Step 4)
**Execute immediately** - No user confirmation needed

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

**After completion:** Report "✅ Execution Step 2 (Phase 1 - Getting Started) complete" and proceed to Execution Step 3.

---

### Execution Step 3: Phase 2 - Domains (User Step 7)
**Execute immediately** - No user confirmation needed

**Note:** Domains documentation is done before Business Logic because Business Logic flows reference Domain Actions and DTOs. Having Domains documented first provides better context.

```text
You are an autonomous Documentation Engineer. Execute ONLY the Domains section (Phase 2).

**CRITICAL:** This is a SEPARATE step. Only work on Domain documentation. Do NOT proceed to Business Logic or Navigation.

**EXECUTE PHASE 2 (Domains):**
- Scan the code in `@src/Domain`.
- For EACH domain found, generate a `docs/domains/[name].mdx` file.
- **STRICT CONSTRAINT:** You MUST use `@DOCS_TEMPLATE.md` as your style guide.
- Do not summarize. List every DTO property (with `<ParamField>`) and every Action (with usage examples including filenames).

Report when Phase 2 (Domains) is complete. Do NOT proceed to Business Logic or Navigation.
```

**After completion:** Report "✅ Execution Step 3 (Phase 2 - Domains) complete" with:
- Number of domains documented
- Files created in `docs/domains/`
- Proceed to Execution Step 4.

---

### Execution Step 4: Phase 3 - Business Logic (User Step 5)
**Execute immediately** - No user confirmation needed

**Note:** This step creates comprehensive workflow documentation for all complex business processes. Each flow document includes complete Mermaid diagrams, business rules, edge cases, and QA scenarios. These documents are placed in `docs/logic/` and organized by domain in `docs.json`.

**Why after Domains:** Business Logic flows reference Domain Actions and DTOs, so having Domains documented first provides better context and allows for proper linking.

Execute the prompt from `@steps/step-5-business-logic.md` or use the full prompt (see that file for details).

**After completion:** Report "✅ Execution Step 4 (Phase 3 - Business Logic) complete" with a summary of:
- Number of flows documented
- Files created in `docs/logic/`
- Proceed to Execution Step 5.

---

### Execution Step 5: Cases Documentation (User Steps 6a, 6b, 6c)
**CHECKPOINT:** Ask for user confirmation before starting

**Note:** This is an additional documentation step (not part of the original DOCS_PLAN phases). It comes after Business Logic because Cases documentation references Business Logic flows.

**Before starting:** Ask the user: "Ready to proceed with Cases documentation? This will identify and document system interaction cases. Continue? (yes/no)"

**Step 6a: Auto-Identify Cases**
Execute the prompt from `@steps/step-6a-identify-cases.md`.

**After Step 6a:** 
- Present the identified cases to the user
- Ask: "I've identified [N] cases. Would you like to: (1) Document all cases, (2) Select specific cases, or (3) Skip Cases documentation?"

**Step 6b: Review (User Action)**
Wait for user decision from Step 6a.

**Step 6c: Document Cases**
- If user chose (1): Execute "Document All Cases" prompt from `@steps/step-6c-document-cases.md`
- If user chose (2): Ask user to specify which cases, then execute with modification
- If user chose (3): Skip to Execution Step 6

**After completion:** Report "✅ Execution Step 5 (Cases Documentation) complete" and proceed to Execution Step 6.

---

### Execution Step 6: Phase 4 & 5 - Navigation & Validation (User Step 8)
**Execute immediately** - No user confirmation needed

Execute the prompt from `@steps/step-8-navigation-validation.md`.

**CRITICAL:** This phase must create 4 SEPARATE TABS in `docs.json`:
1. **Tab: "Getting Started"** - Introduction, setup, development, AI Tools
2. **Tab: "Business Logic"** - All flows organized by category (CRUD, State Transitions, etc.)
3. **Tab: "Cases"** - All cases organized by interaction type
4. **Tab: "Domains"** - All domain documentation

Each tab must be a separate object in the `navigation.tabs` array. See `@steps/step-8-navigation-validation.md` for the exact JSON structure.

**After completion:** Report "✅ Execution Step 6 (Phase 4 & 5 - Navigation & Validation) complete" with:
- Summary of navigation structure created (4 separate tabs)
- Number of flows organized in Business Logic tab
- Number of cases organized in Cases tab
- Number of domains in Domains tab
- Any validation issues found and fixed
- Proceed to Execution Step 7.

---

### Execution Step 7: Cursor Context Configuration (User Step 9)
**Execute immediately** - No user confirmation needed

Execute the prompt from `@steps/step-9-cursor-context.md`.

**What this does:**
- Creates **complete** `.cursor/rules.md` with:
  * Laravel DDD architecture and conventions
  * DDEV development commands
  * Code conventions (Models, Actions, DTOs, Controllers)
  * Frontend conventions (Vue 3 + Inertia)
  * Documentation workflow (AI Docs Kit + Mintlify)
  * Quality checks and important don'ts
  * Dynamic project documentation context (domains, logic flows, cases)
- Creates `docs/CONTEXT.md` as a comprehensive documentation index
- Enables easy reference to documentation using `@docs/` syntax in Cursor

**After completion:** Report "✅ Execution Step 7 (Cursor Context Configuration) complete" with:
- Confirmation that `.cursor/rules.md` was created with complete project rules
- Confirmation that `docs/CONTEXT.md` was created
- Number of domains, logic flows, and cases indexed
- Summary of all rules sections generated
- Final status: "🎉 Documentation generation complete!"

---

## Execution Flow Summary

**Execution Order (Sequential):**
```
START
  ↓
Step 0: Load Configuration (auto) ← Read ai-docs.config.json
  ↓
Execution Step 1: Phase 0 - Cleanup (auto)
  ↓
Execution Step 2: Phase 1 - Getting Started (auto)
  ↓
Execution Step 3: Phase 2 - Domains (auto)
  ↓
Execution Step 4: Phase 3 - Business Logic (auto)
  ↓
Execution Step 5: Cases Documentation (CHECKPOINT - ask user)
  ↓
Execution Step 6: Phase 4 & 5 - Navigation & Validation (auto)
  ↓
Execution Step 7: Cursor Context Configuration (auto)
  ↓
COMPLETE
```

**Note:** 
- Phase numbers (0, 1, 2, 3, 4, 5) refer to the original DOCS_PLAN phases
- "Cases Documentation" is an additional step (not in original DOCS_PLAN)
- Execution steps (1-6) show the sequential order in which they are executed
- **Why this order:** Domains → Business Logic → Cases makes sense because each references the previous (Business Logic links to Domains, Cases links to Business Logic)

## Critical Rules

1. **Never skip steps** - Execute in the order specified
2. **Report after each phase** - Always confirm completion before proceeding
3. **Ask for help if stuck** - Don't proceed if you encounter errors you can't resolve
4. **Respect user decisions** - If user says "stop" or "skip", honor that
5. **Validate before proceeding** - Ensure each phase is truly complete before moving on

## Starting the Orchestration

**INSTRUCTIONS FOR THE AGENT:**

When the user asks you to start, immediately begin with Execution Step 1. Execute each step as a separate operation:

1. **Execution Step 1:** Execute Phase 0 (Cleanup) prompt → Wait for completion → Report "✅ Execution Step 1 (Phase 0 - Cleanup) complete"
2. **Execution Step 2:** Execute Phase 1 (Getting Started) prompt → Wait for completion → Report "✅ Execution Step 2 (Phase 1 - Getting Started) complete"
3. **Execution Step 3:** Execute Phase 2 (Domains) prompt → Wait for completion → Report "✅ Execution Step 3 (Phase 2 - Domains) complete"
4. **Execution Step 4:** Execute Phase 3 (Business Logic) prompt (use full prompt from step-5-business-logic.md) → Wait for completion → Report "✅ Execution Step 4 (Phase 3 - Business Logic) complete"
5. **Execution Step 5:** Ask user about Cases Documentation → Get decision → Execute accordingly → Report "✅ Execution Step 5 (Cases Documentation) complete"
6. **Execution Step 6:** Execute Phase 4 & 5 (Navigation & Validation) prompt (use full prompt from step-8-navigation-validation.md) → Wait for completion → Report "✅ Execution Step 6 (Phase 4 & 5 - Navigation & Validation) complete"
7. **Execution Step 7:** Execute Cursor Context Configuration prompt (use full prompt from step-9-cursor-context.md) → Wait for completion → Report "✅ Execution Step 7 (Cursor Context Configuration) complete" → Final status: "🎉 Documentation generation complete!"

**IMPORTANT:** Treat each phase as a complete, separate task. Don't try to do multiple phases in one response. Execute one phase, report completion, then move to the next.

**For phases that reference step files:** You have access to `@steps/step-5-business-logic.md`, `@steps/step-6a-identify-cases.md`, `@steps/step-6c-document-cases.md`, `@steps/step-8-navigation-validation.md`, and `@steps/step-9-cursor-context.md`. Use the full prompts from those files when executing those phases.

