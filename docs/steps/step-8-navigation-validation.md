# Step 8: Execute Navigation & Validation

**WAIT** until both Cases (Step 6) and Domains (Step 7) are complete, then copy and paste the code block below into the Composer chat and hit **Enter**.

```text
You are an autonomous Documentation Engineer. Execute ONLY Navigation (Phase 4) and Validation (Phase 5).

**EXECUTE PHASE 4 (Navigation):**

**CRITICAL:** Update `docs.json` to organize documentation into 4 SEPARATE TABS using Mintlify's tab structure.

**Mintlify Tab Structure:**
In Mintlify, tabs are created by having multiple objects in the `navigation.tabs` array. Each tab is a separate object with:
- `"tab": "Tab Name"` - The name shown in the tab
- `"groups": [...]` - Array of navigation groups for that tab

**Required Structure - 4 Separate Tabs (NO SUB-GROUPS):**

**CRITICAL:** Do NOT create sub-groups within tabs. List all items directly in each tab.

You MUST structure `docs.json` with 4 separate tab objects like this:

```json
{
  "navigation": {
    "tabs": [
      {
        "tab": "Getting Started",
        "pages": [
          "index",
          "setup",
          "development",
          "ai-tools/cursor",
          "ai-tools/claude-code",
          "ai-tools/windsurf"
        ]
      },
      {
        "tab": "Business Logic",
        "pages": [
          "logic/assignment-create",
          "logic/contact-create",
          "logic/assignment-acceptance",
          "logic/assignment-rejection",
          "logic/complex-workflow-1"
          // ... all other logic files directly listed
        ]
      },
      {
        "tab": "Cases",
        "pages": [
          "cases/case-1",
          "cases/case-2",
          "cases/case-3"
          // ... all other case files directly listed
        ]
      },
      {
        "tab": "Domains",
        "pages": [
          "domains/assignment",
          "domains/contact",
          "domains/project"
          // ... all other domain files directly listed
        ]
      }
    ]
  }
}
```

**IMPORTANT:** 
- Each tab has a `"pages"` array directly (NO `"groups"` array)
- All items are listed flat in the pages array
- No sub-grouping or categorization within tabs

**Step 4.1 - Scan and Collect Files:**
- Scan all generated files in `docs/logic/`, `docs/cases/`, and `docs/domains/`
- List ALL `.mdx` files found in each directory
- Convert file paths to page references (remove `.mdx` extension, relative to `docs/` folder)

**Step 4.2 - Organize Files into 4 Tabs (NO SUB-GROUPS):**

**CRITICAL:** Do NOT create groups or sub-categories. List all items directly in each tab's `pages` array.

1. **Getting Started Tab:**
   - Add: `index`, `setup`, `development`
   - **CRITICAL:** Check if `docs/steps/step-incremental-update.mdx` exists. If it exists, add `steps/step-incremental-update` to the list.
   - Add all files from `ai-tools/` folder (e.g., `ai-tools/cursor`, `ai-tools/claude-code`, `ai-tools/windsurf`)
   - **OPTIONAL FOR GETTING STARTED TAB ONLY:** You can use groups structure to organize this tab:
     * First group with name "Essentials": `index`, `setup`, `development`, `steps/step-incremental-update` (if exists)
     * Second group with name "AI Tools": all `ai-tools/` files
   - If not using groups, list all items directly in the `pages` array
   - **CRITICAL:** Other tabs (Business Logic, Cases, Domains) must use flat `pages` array with NO groups

2. **Business Logic Tab:**
   - Scan ALL files in `docs/logic/` directory
   - Add ALL logic files directly to the `pages` array
   - Example: `["logic/assignment-create", "logic/contact-create", "logic/assignment-acceptance", ...]`
   - **DO NOT** group by category - just list all files flat
   - **CRITICAL:** Ensure you have 20+ flows. If you have fewer, check that all flows were documented.

3. **Cases Tab:**
   - Scan ALL files in `docs/cases/` directory
   - Add ALL case files directly to the `pages` array
   - Example: `["cases/case-1", "cases/case-2", "cases/case-3", ...]`
   - **DO NOT** group by interaction type - just list all files flat

4. **Domains Tab:**
   - Scan ALL files in `docs/domains/` directory
   - Add ALL domain files directly to the `pages` array
   - Example: `["domains/assignment", "domains/contact", "domains/project", ...]`
   - **DO NOT** create groups - just list all files flat

**Step 4.3 - Update docs.json with 4 Separate Tabs:**
- **CRITICAL:** Replace the existing `navigation.tabs` array with 4 separate tab objects
- Each tab must be a separate object in the array
- Each tab has a `"pages"` array directly (NO `"groups"` array)
- Use the structure shown in the example above
- Ensure file paths are correct (without `.mdx` extension, relative to `docs/` folder)
- **CRITICAL:** Verify that all 4 tabs are created as separate objects, not groups within one tab
- **CRITICAL:** Each tab should have `"pages": [...]` directly, NOT `"groups": [...]`
- Ensure all pages are properly linked and accessible

**EXECUTE PHASE 5 (Validation & Quality Control):**

**CRITICAL:** Ensure the generated files allow the site to build without crashing.

**Step 5.1 - Check Syntax:**
- Scan ALL `.mdx` files in `docs/` for unclosed tags
- Check for mismatched Mintlify components (`<Card>`, `</Card>`, `<AccordionGroup>`, `</AccordionGroup>`, etc.)
- Verify all opening tags have corresponding closing tags
- Fix any syntax errors found

**Step 5.2 - Check Escaping:**
- Scan ALL `.mdx` files for PHP generic types (e.g., `Collection<User>`, `Array<Model>`)
- Ensure generic types are either:
  * Escaped as HTML entities: `Collection&lt;User&gt;`
  * Wrapped in backticks: `` `Collection<User>` ``
- Fix any unescaped generics found

**Step 5.3 - Check Frontmatter:**
- Verify ALL `.mdx` files have proper frontmatter with:
  * `title:` as a quoted string
  * `description:` as a quoted string (if present)
- Ensure frontmatter is valid YAML (proper indentation, no syntax errors)
- Fix any frontmatter issues found

**Step 5.4 - Check JSON:**
- Validate `docs.json` (or `mint.json`) syntax
- Check for trailing commas
- Verify all JSON keys are properly quoted
- Ensure arrays and objects are properly closed
- Fix any JSON syntax errors found

**Step 5.5 - Run Build Test:**
- Attempt to run `mint dev` (or verify the structure would allow it)
- If build fails, identify and fix the issues
- Report any remaining issues that need manual attention

Report when Phase 4 (Navigation) and Phase 5 (Validation) are complete.
```

