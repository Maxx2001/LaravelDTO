# Incremental Documentation Update

**STANDALONE STEP** - Use this step independently whenever you have code changes and want to update only the affected documentation files.

**NOT part of the master orchestrator workflow** - Run this separately as needed during development.

---

## When to Use This Step

- ✅ You've made changes to domain code and want to sync documentation
- ✅ You've added/modified Actions, DTOs, or Models
- ✅ You want to compare against a specific branch (master/dev/main)
- ✅ You don't want to regenerate all documentation from scratch

---

## How to Use

### Step 1: Open Cursor Composer

Press `Cmd + E` (Mac) or `Ctrl + E` (Windows) to open the Composer agents.

> **Tip:** Ensure you are in **"Agent"** mode if available for best results.

### Step 2: Load Context

Provide the following context to Cursor by typing `@` and selecting:

- `@src/Domain` (Select the entire Domain folder)
- `@docs/domains/` (All existing domain documentation)
- `@docs/logic/` (All existing business logic documentation)
- `@docs/cases/` (All existing case documentation)
- `@docs/docs.json` (Navigation structure)
- `@docs/templates/DOCS_TEMPLATE.md` (Domain documentation style guide)
- `@docs/templates/LOGIC_TEMPLATE.MD` (Business logic style guide)

### Step 3: Execute the Update

Copy and paste the code block below into the Composer chat and hit **Enter**:

```text
You are an autonomous Documentation Engineer. Execute ONLY the Incremental Documentation Update step.

**CRITICAL:** This step updates ONLY the documentation files affected by code changes. Do NOT regenerate all documentation.

**EXECUTE INCREMENTAL DOCUMENTATION UPDATE:**

**Step 1 - Detect Changed Files:**
- Ask the user: "Which branch should I compare against? (master/dev/main/other - or press Enter for uncommitted changes only)"
- If user provides a branch name:
  * Run: `git diff --name-only [branch-name]` to get list of changed files
  * Also check: `git diff --name-only [branch-name] --staged` for staged changes
- If user wants uncommitted changes only:
  * Run: `git diff --name-only` for unstaged changes
  * Run: `git diff --name-only --staged` for staged changes
- **CRITICAL:** Filter to only include files in `src/Domain/` (ignore other changes)
- Create a list of all changed domain files with their paths
- Present the list to the user and ask: "I found [N] changed files. Proceed with updating documentation? (yes/no)"

**Step 2 - Analyze Changes:**
For each changed file, determine what type of change it is:
- **Domain Model changes** → Update `docs/domains/[domain-name].mdx`
- **Action changes** → Update both:
  * `docs/domains/[domain-name].mdx` (if Action is new or signature changed)
  * `docs/logic/[action-name].mdx` (if business logic flow changed)
- **DTO changes** → Update `docs/domains/[domain-name].mdx` (DTO section)
- **New Domain** → Create new `docs/domains/[domain-name].mdx`
- **New Action** → Create new `docs/logic/[action-name].mdx` AND update domain doc
- **Deleted Domain/Action** → Remove corresponding documentation files

**Step 3 - Read Changed Code:**
- For each changed file, read the current version
- Compare with the previous version (from git) to understand what changed:
  * New methods/properties added?
  * Methods/properties removed?
  * Method signatures changed?
  * Business logic modified?
  * DTO properties added/removed/changed?

**Step 4 - Update Domain Documentation:**
For each affected domain:
- Read the existing `docs/domains/[domain-name].mdx` file (or create if new)
- Update the relevant sections:
  * If DTOs changed: Update DTO documentation with new/removed/changed properties using `<ParamField>` components
  * If Actions changed: Update Action documentation with new signatures, parameters, return types, and usage examples
  * If Models changed: Update Model documentation with new relationships, attributes, methods
- **CRITICAL:** Use `@docs/templates/DOCS_TEMPLATE.md` as style guide
- **CRITICAL:** Maintain the same format and structure as existing documentation
- **CRITICAL:** Include filename in code examples (e.g., ````php app/Domain/Assignments/Actions/CreateAssignmentAction.php`)

**Step 5 - Update Business Logic Documentation:**
For each affected Action:
- Check if `docs/logic/[action-name].mdx` exists
- If it exists:
  * Read the existing file
  * Update the flow diagram if logic changed (Mermaid diagram)
  * Update business rules if rules changed (AccordionGroup format)
  * Update edge cases if new edge cases were introduced (Warning blocks)
  * Update QA scenarios if behavior changed (complete scenarios with test data)
- If it doesn't exist and the Action is new:
  * Create new `docs/logic/[action-name].mdx` following `@docs/templates/LOGIC_TEMPLATE.MD`
  * Include complete Mermaid diagram with ALL steps, decision points, and error paths
  * Document ALL business rules in AccordionGroup format
  * Document ALL edge cases with Warning blocks
  * Include complete QA scenarios (Happy Path + minimum 3-5 edge cases)
- **CRITICAL:** Use `@docs/templates/LOGIC_TEMPLATE.MD` as style guide
- **CRITICAL:** Do NOT summarize - document every step, every rule, every edge case

**Step 6 - Update Cases Documentation (if needed):**
- Check if any changed Actions are referenced in `docs/cases/` files
- If a case document references a changed Action:
  * Read the case document
  * Update the relevant sections to reflect the changes
  * Update any flow diagrams or descriptions
  * Ensure links to updated Actions/Domains are still valid

**Step 7 - Update Navigation (if files added/removed):**
- If new documentation files were created:
  * Read `docs/docs.json`
  * Add new files to appropriate tab's `pages` array:
    - Domain files → "Domains" tab
    - Logic files → "Business Logic" tab
    - Case files → "Cases" tab
- If documentation files were deleted:
  * Read `docs/docs.json`
  * Remove deleted files from appropriate tab's `pages` array
- **CRITICAL:** Maintain the 4-tab structure (Getting Started, Business Logic, Cases, Domains)

**Step 8 - Validate Updated Files:**
- Check syntax of all updated `.mdx` files:
  * Verify frontmatter is valid YAML (title and description as quoted strings)
  * Check for unclosed Mintlify components (`<Card>`, `</Card>`, `<AccordionGroup>`, etc.)
  * Verify PHP generics are escaped (e.g., `Collection&lt;User&gt;` or wrapped in backticks)
- Validate `docs.json` syntax:
  * Check for trailing commas
  * Verify all JSON keys are properly quoted
  * Ensure arrays and objects are properly closed
- Report any issues found and fix them

**Step 9 - Report Summary:**
- List all files that were changed in code (with paths)
- List all documentation files that were updated (with paths)
- List any new documentation files created (with paths)
- List any documentation files removed (with paths)
- Confirm that all changes have been reflected in documentation
- Provide a summary of what was updated and why

Report when Incremental Documentation Update is complete. Do NOT proceed to other tasks.
```

---

## What This Step Does

- 🔍 **Detects changes** via git diff (compares against branch or uncommitted changes)
- 📝 **Updates only affected files** (domains, logic flows, cases)
- ✅ **Validates all changes** (syntax, frontmatter, Mintlify components)
- 🔗 **Updates navigation** if files are added/removed
- 🎯 **Maintains consistency** with existing documentation style

---

## Usage Examples

### Example 1: After modifying an Action

```bash
# You've modified: src/Domain/Assignments/Actions/CreateAssignmentAction.php
# Step will:
# ✅ Update docs/domains/assignments.mdx (Action section)
# ✅ Update docs/logic/assignment-creation.mdx (if logic changed)
```

### Example 2: After adding a DTO property

```bash
# You've added a property to: src/Domain/Assignments/DTOs/CreateAssignmentDTO.php
# Step will:
# ✅ Update docs/domains/assignments.mdx (DTO section with new <ParamField>)
```

### Example 3: After creating a new Domain

```bash
# You've created: src/Domain/Invoices/
# Step will:
# ✅ Create docs/domains/invoices.mdx
# ✅ Create docs/logic/ files for all Actions in the domain
# ✅ Update docs/docs.json navigation
```

### Example 4: Compare against master branch

```bash
# You want to sync all changes since master branch
# Step will:
# ✅ Compare against master branch
# ✅ Update all documentation for files changed since master
```

---

## Benefits

- ⚡ **Fast** - Only updates what changed, not everything
- 🎯 **Focused** - No risk of overwriting unrelated documentation
- 🔄 **Incremental** - Perfect for ongoing development workflow
- ✅ **Safe** - Validates all changes before completion
- 🚀 **Efficient** - Run anytime during development, not just during full doc generation

---

## Notes

- This step is **NOT** part of the master orchestrator workflow
- Use this step **whenever** you make code changes and want to keep docs in sync
- You can run this step **multiple times** during development
- It's safe to run this step even if you've already updated some docs manually

