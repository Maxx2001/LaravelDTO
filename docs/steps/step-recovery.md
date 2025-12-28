# Error Recovery Step

**STANDALONE STEP** - Use this step when you encounter errors during documentation generation.

---

## When to Use This Step

- ❌ MDX syntax errors (unescaped generics, unclosed tags)
- ❌ Incomplete generation (context window full)
- ❌ Missing files or broken links
- ❌ Validation failures during `mint dev`
- ❌ Corrupted or malformed JSON files

---

## Recovery Prompts

### 1. Fix MDX Syntax Errors

**Common Issue:** PHP generics like `Collection<User>` break MDX parsing.

```text
You are a Documentation Engineer fixing MDX syntax errors.

**TASK:** Fix all MDX syntax errors in the docs/ folder.

**COMMON ISSUES TO FIX:**

1. **Unescaped Generics:**
   - Find: `Collection<User>`, `array<string>`, `Request<T>`
   - Replace with: `Collection&lt;User&gt;` OR wrap in backticks: `Collection<User>`

2. **Unclosed Tags:**
   - Find unclosed Mintlify components: `<Card>`, `<Note>`, `<Warning>`, `<AccordionGroup>`, `<Accordion>`, `<Steps>`, `<Step>`
   - Ensure every opening tag has a matching closing tag

3. **Invalid Frontmatter:**
   - Ensure title and description are quoted strings
   - Example: title: "My Page" (not title: My Page)

4. **Broken Mermaid Diagrams:**
   - Check for special characters in node labels
   - Ensure proper indentation
   - Verify arrow syntax: --> not ->

**EXECUTE:**
1. Scan all .mdx files in docs/
2. Identify syntax errors
3. Fix each error
4. Report what was fixed

Fix all errors now.
```

---

### 2. Resume Incomplete Generation

**Common Issue:** Context window full, generation stopped midway.

```text
You are a Documentation Engineer resuming an incomplete documentation generation.

**SITUATION:** The previous generation was interrupted. Some files may be incomplete or missing.

**TASK:** Identify what's missing and complete the generation.

**EXECUTE:**

1. **Check docs/domains/:**
   - List all .mdx files
   - Compare against domains in @src/Domain
   - Identify missing domain documentation

2. **Check docs/logic/:**
   - List all .mdx files
   - Identify any incomplete files (check for proper closing tags)

3. **Check docs.json:**
   - Verify all created files are in navigation
   - Check for broken references

4. **Report:**
   - List missing domains
   - List incomplete files
   - List navigation issues

5. **Resume:**
   - Generate missing domain documentation
   - Complete incomplete files
   - Update docs.json navigation

What is missing and what needs to be completed?
```

---

### 3. Fix Broken Links and References

**Common Issue:** Links to pages that don't exist or wrong paths.

```text
You are a Documentation Engineer fixing broken links and references.

**TASK:** Find and fix all broken links in the documentation.

**EXECUTE:**

1. **Scan docs.json:**
   - List all pages in navigation
   - Verify each file exists in docs/
   - Report missing files

2. **Scan internal links:**
   - Find all href="/..." links in .mdx files
   - Verify each target exists
   - Fix or remove broken links

3. **Scan CardGroup links:**
   - Find all Card components with href
   - Verify targets exist
   - Fix broken references

4. **Check cross-references:**
   - Domain docs linking to logic docs
   - Logic docs linking to domain docs
   - Case docs linking to both

**FIX:**
- Remove links to non-existent pages
- Update incorrect paths
- Report unfixable issues

Find and fix all broken links now.
```

---

### 4. Fix JSON Syntax Errors

**Common Issue:** Malformed docs.json prevents site from building.

```text
You are a Documentation Engineer fixing JSON syntax errors.

**TASK:** Fix the docs.json file.

**COMMON JSON ISSUES:**

1. **Trailing commas:**
   ```json
   // WRONG
   { "pages": ["a", "b",] }
   
   // CORRECT
   { "pages": ["a", "b"] }
   ```

2. **Missing commas:**
   ```json
   // WRONG
   { "a": 1 "b": 2 }
   
   // CORRECT
   { "a": 1, "b": 2 }
   ```

3. **Unquoted keys:**
   ```json
   // WRONG
   { pages: ["a"] }
   
   // CORRECT
   { "pages": ["a"] }
   ```

4. **Single quotes:**
   ```json
   // WRONG
   { 'pages': ['a'] }
   
   // CORRECT
   { "pages": ["a"] }
   ```

**EXECUTE:**
1. Read docs/docs.json
2. Identify syntax errors
3. Fix all errors
4. Validate JSON is parseable

Fix docs.json now.
```

---

### 5. Regenerate Single Domain

**Common Issue:** Need to regenerate just one domain's documentation.

```text
You are a Documentation Engineer regenerating documentation for a single domain.

**TASK:** Regenerate documentation for the [DOMAIN_NAME] domain only.

**CONTEXT NEEDED:**
- @src/Domain/[DOMAIN_NAME]
- @docs/templates/DOCS_TEMPLATE.md

**EXECUTE:**

1. Read all files in @src/Domain/[DOMAIN_NAME]
2. Following @DOCS_TEMPLATE.md strictly:
   - Document all DTOs with <ParamField> for each property
   - Document all Actions with functionality and usage examples
   - Document all Models with relationships, scopes, accessors
3. Write to docs/domains/[domain-name].mdx
4. Update docs.json if needed

Generate documentation for [DOMAIN_NAME] now.
```

**Usage:** Replace `[DOMAIN_NAME]` with the actual domain name (e.g., `Assignments`, `Users`).

---

### 6. Validate and Report All Issues

**Common Issue:** Need a full health check of documentation.

```text
You are a Documentation Engineer performing a health check.

**TASK:** Validate all documentation and report issues.

**CHECKS TO PERFORM:**

1. **File Structure:**
   - docs/domains/ exists and has .mdx files
   - docs/logic/ exists (if business logic enabled)
   - docs/cases/ exists (if cases enabled)
   - docs.json exists and is valid JSON

2. **MDX Syntax:**
   - All .mdx files have valid frontmatter
   - No unclosed tags
   - No unescaped generics

3. **Navigation:**
   - All files in docs.json exist
   - No orphaned files (files not in navigation)
   - Tab structure is correct (4 tabs)

4. **Content Quality:**
   - No empty files
   - All domains have DTOs and Actions sections
   - All logic files have flow diagrams

**OUTPUT FORMAT:**

## Validation Report

### ✅ Passed
- [list of passed checks]

### ❌ Failed
- [list of failed checks with details]

### ⚠️ Warnings
- [list of warnings]

### Recommended Fixes
1. [fix 1]
2. [fix 2]

Run the health check now.
```

---

## Quick Reference

| Issue | Recovery Prompt |
|-------|-----------------|
| `Collection<User>` errors | Use prompt #1 |
| Generation stopped | Use prompt #2 |
| 404 errors in docs | Use prompt #3 |
| `mint dev` JSON error | Use prompt #4 |
| Redo one domain | Use prompt #5 |
| Full health check | Use prompt #6 |

---

## Prevention Tips

1. **Before generating:** Ensure adequate context window (use Agent mode)
2. **Large codebases:** Split generation by domain groups
3. **After generating:** Always run `mint dev` to validate
4. **Regular maintenance:** Run health check monthly



