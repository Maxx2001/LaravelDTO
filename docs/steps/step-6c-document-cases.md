# Step 6c: Document Selected Cases

**WAIT** until you've reviewed the suggested cases from Step 6a, then copy and paste the code block below into the Composer chat and hit **Enter**.

## Option 1: Document All Suggested Cases (Recommended)

```text
You are an autonomous Documentation Engineer. Document ALL cases identified in Step 6a.

**CRITICAL:** Use the case suggestions from Step 6a. Document EACH case that was identified.

**EXECUTE CASE DOCUMENTATION:**
- For EACH case identified in Step 6a, generate `docs/cases/[case-name].mdx` file using `@SPECIFIC_CASE_TEMPLATE.md` as the style guide.
- **STRICT CONSTRAINT:** You MUST use `@SPECIFIC_CASE_TEMPLATE.md` (or `@docs/templates/SPECIFIC_CASE_TEMPLATE.md`) as your template.
- **OUTPUT LOCATION:** All case documentation should be placed in `docs/cases/` directory with descriptive filenames matching the suggestions from Step 6a.
- **NAVIGATION:** After creating all case documents, update `docs.json` to add them to the "Cases" tab in the navigation structure.

**For EACH case, include MANDATORY SECTIONS:**
  * **Scope & Context:** Clearly define what is and is NOT covered in this documentation
  * **Systeem Overzicht:** Overview of all involved systems with their roles and responsibilities (use CardGroup)
  * **Interactie Diagram:** Mermaid diagram showing all system interactions (graph TB format)
  * **Gedetailleerde Interacties:** Document each interaction in detail (use AccordionGroup)
  * **Volledige Flow:** Sequence diagram showing the complete flow (sequenceDiagram format)
  * **Data Synchronisatie:** If systems share/sync data, document this thoroughly
  * **Afhankelijkheden & Constraints:** Document all dependencies between systems (use CardGroup)
  * **Edge Cases & Foutscenario's:** Specific edge cases that arise from system interactions (use Warning blocks)
  * **Test Scenario's:** Test scenarios for this specific case (Happy Path + minimum 3 edge cases)
  * **Betrokken Code:** Links to all relevant code (use CardGroup)
  * **Gerelateerde Documentatie:** Links to related domain/logic documentation (use CardGroup)

**LEVEL OF DETAIL:** This documentation should be MORE detailed than standard logic flows because it focuses on system interactions:
  * Document EVERY interaction between systems
  * Show data flow for each interaction (input, output, side effects)
  * Document timing and dependencies
  * Explain error handling for each interaction
  * Document data consistency concerns
  * Include system-specific edge cases
  * Reference the related logic documentation if it exists

**DO NOT:** 
  * Summarize interactions - document each one explicitly
  * Skip system dependencies
  * Omit error scenarios
  * Create generic documentation - this must be specific to each case
  * Skip any case that was identified in Step 6a

**Work through each case systematically:**
1. Start with the highest priority case
2. Complete ALL sections for that case
3. Move to the next case
4. Continue until all cases are documented

Report when ALL case documentation is complete. List all created files.
```

## Option 2: Document Specific Cases Only

If you only want to document specific cases, modify the prompt above to include:

```text
**CRITICAL:** Only document the following specific cases:
- [Case Name 1]
- [Case Name 2]
- [Case Name 3]
[etc...]

For each case, use the case details from Step 6a.
```

