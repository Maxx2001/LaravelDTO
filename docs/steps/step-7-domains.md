# Step 7: Execute Domains Section

**WAIT** until Cases documentation (Step 6) is complete, then copy and paste the code block below into the Composer chat and hit **Enter**. Wait for completion before proceeding.

```text
You are an autonomous Documentation Engineer. Execute ONLY the Domains section (Phase 2).

**CRITICAL:** This is a SEPARATE step. Only work on Domain documentation. Do NOT proceed to Navigation or Validation.

**EXECUTE PHASE 2 (Domains):**
- Scan the code in `@src/Domain`.
- For EACH domain found, generate a `docs/domains/[name].mdx` file.
- **STRICT CONSTRAINT:** You MUST use `@DOCS_TEMPLATE.md` as your style guide.
- Do not summarize. List every DTO property (with `<ParamField>`) and every Action (with usage examples including filenames).

Report when Phase 2 (Domains) is complete. Do NOT proceed to Navigation or Validation.
```

