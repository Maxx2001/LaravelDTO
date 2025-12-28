# Step 5: Execute Business Logic Section

**WAIT** until Getting Started is complete, then copy and paste the code block below into the Composer chat and hit **Enter**. Wait for completion before proceeding.

<Note>
**Extended Business Logic Documentation:**
This step creates comprehensive workflow documentation for all complex business processes. Each flow document includes complete Mermaid diagrams, business rules, edge cases, and QA scenarios. These documents are placed in `docs/logic/` and organized by domain in `docs.json`.
</Note>

```text
You are an autonomous Documentation Engineer. Execute ONLY the Business Logic section (Phase 3).

**CRITICAL:** This is a SEPARATE step. Only work on Business Logic flows. Do NOT proceed to Domains.

**CRITICAL REMINDER:** You MUST document EVERY piece of complex logic. Do NOT skip or summarize. Go through EVERY Action, EVERY flow, and EVERY business rule systematically.

**OUTPUT LOCATION:** All business logic documentation should be placed in `docs/logic/` directory with descriptive filenames (e.g., `assignment-acceptance-by-tk.mdx`, `delivery-item-update.mdx`).

**EXECUTE PHASE 3 (Business Logic):**
- **MANDATORY LEVEL OF DETAIL:** Every Business Logic flow document MUST include the same level of detail as the examples created (contact-creation, property-creation, registration-acceptance, property-override, document-upload, etc.). This means:
  * **Complete Mermaid diagrams** with EVERY step, decision point, branch, and error path clearly labeled
  * **ALL business rules** documented in AccordionGroup format with implementation details and consequences
  * **ALL edge cases** documented with Warning blocks explaining what happens in each scenario
  * **Complete QA scenarios** covering Happy Path + minimum 3-5 edge cases per flow
  * **All involved Actions and Domains** linked via CardGroup
  * **No summarization** - every step, every rule, every edge case must be explicitly documented

**Step 3.1 - Comprehensive Action Discovery:**
- Scan ALL Actions in `@src/Domain` (every single Action class in every domain).
- For EACH Action class found, analyze it completely:
  * Read the full class code
  * Identify the main `execute()` method
  * Check for any public methods that perform business operations
  * Look for method calls to other Actions
  * Check for event dispatching
  * Look for database transactions
  * Check for conditional logic (if/else, switch, ternary)
  * Identify guard-specific behavior
  * Check for relationship management
  * Look for calculations or transformations
- Create a COMPLETE inventory of ALL Actions with their file paths.

**Step 3.1.5 - Comprehensive Flow Collection (CRITICAL - DO NOT SKIP):**

**MANDATORY:** Before generating ANY documentation, you MUST first collect ALL business logic flows and present them as a complete list.

**CRITICAL RULE: Document EVERY Action as a flow, even simple ones!**

**DO NOT filter out "simple" flows.** Every Action that performs ANY business operation should be documented as a flow. This includes:
- Simple CRUD operations (Create, Read, Update, Delete)
- Single-step operations
- Operations with just one conditional branch
- Operations that only update one field
- Operations that only create one record
- ANY operation that has business meaning

**Your goal: Find 20-30+ flows minimum. If you find fewer than 15, you're not being thorough enough.**

**Collection Strategy - Scan EVERYTHING:**

1. **Scan ALL Controllers (EVERY method = potential flow):**
   - Go through EVERY Controller in `app/Http/Controllers/` and ALL subdirectories
   - For EACH controller method (index, show, store, update, destroy, and custom methods):
     * **EVERY method that calls an Action = a flow** (even if it's just one Action)
     * Identify which Actions are called (even if just one)
     * Check if multiple Actions are called in sequence
     * Identify any conditional logic based on request data
     * Check for guard-specific routes (CRM vs Portal) - each guard variant = separate flow
     * Look for batch operations
     * Identify API endpoints that trigger flows
     * **Even simple methods like "show" or "index" that call Actions should be flows**
   - **Count:** You should find 10-20+ controller methods that call Actions
   - Document: Controller name, method name, HTTP method, route, Actions called, guard type

2. **Scan ALL Actions (EVERY Action = a flow):**
   - For EACH Action identified in Step 3.1:
     * **EVERY Action class = at least one flow** (even if it's simple)
     * If an Action has multiple public methods that perform operations, each method = separate flow
     * Trace ALL method calls within the Action
     * Identify if it calls other Actions (create a call graph)
     * Check for event dispatching (`event()`, `dispatch()`, `broadcast()`)
     * Identify database operations (create, update, delete, transactions)
     * Check for conditional branches (if/else, switch, match) - each branch path = potential separate flow
     * Identify loops and iterations
     * Check for guard-specific behavior - CRM vs Portal = separate flows
     * Look for state changes
     * Identify side effects (emails, notifications, logs)
   - **Count:** You should find 15-30+ Actions. If you find fewer, scan more domains.
   - For Actions that call other Actions, create a dependency tree
   - **Important:** Even if an Action just creates one record with no conditions, it's still a flow!
   - Document: Action name, domain, method name (if multiple), called Actions, events, guard type, complexity score

3. **Scan ALL Event Listeners:**
   - Find ALL event listeners in `app/Listeners/` or `app/Observers/`
   - For EACH listener:
     * Identify which events it listens to
     * Check what Actions or operations it performs
     * Identify if it triggers other events or Actions
     * Check for cross-domain operations
     * Identify side effects
   - Document: Listener name, events handled, Actions called, complexity

4. **Scan ALL Jobs/Queues:**
   - Find ALL Job classes in `app/Jobs/`
   - For EACH job:
     * Identify what business logic it performs
     * Check if it calls Actions
     * Identify retry logic and error handling
     * Check for batch processing
   - Document: Job name, Actions called, complexity

5. **Scan ALL Services:**
   - Find ALL Service classes (in `app/Services/` or domain Services folders)
   - For EACH service:
     * Identify what it coordinates
     * Check which Actions it calls
     * Identify business rules it enforces
   - Document: Service name, Actions called, complexity

6. **Scan ALL Models for Business Logic:**
   - Check Model classes for:
     * Accessors/Mutators with business logic
     * Scopes with complex queries
     * Model events (creating, created, updating, updated, etc.)
     * Relationship definitions that affect business logic
     * Model methods that perform operations
   - Document: Model name, business logic found, complexity

7. **Scan ALL Middleware:**
   - Check middleware for business logic that affects flows
   - Document: Middleware name, business logic, complexity

**Step 3.1.6 - Flow Aggregation & Listing:**

After completing the comprehensive scan above, you MUST:

1. **Create a COMPLETE list of ALL identified flows:**
   - **CRITICAL:** You MUST have at least 15-20 flows. If you have fewer, go back and scan more thoroughly.
   - Group flows by domain AND by category (see categories below)
   - For EACH flow, provide:
     * **Flow Name:** Descriptive name (e.g., "Assignment Acceptance by TK", "Contact Creation", "Property Update")
     * **Category:** Assign to one of these categories:
       - **CRUD Operations** (Create, Read, Update, Delete)
       - **State Transitions** (Status changes, approvals, rejections)
       - **Relationships** (Linking entities, managing associations)
       - **Calculations** (Computations, validations, transformations)
       - **Notifications** (Email, SMS, in-app notifications)
       - **Integrations** (External APIs, FTP, third-party services)
       - **Batch Operations** (Bulk updates, imports, exports)
       - **Workflows** (Multi-step processes, orchestrations)
       - **Guards & Permissions** (CRM vs Portal, role-based)
       - **Events & Listeners** (Event-driven flows)
     * **Trigger:** What starts this flow? (Controller endpoint, Event, Job, etc.)
     * **Entry Point:** The first Action or method called
     * **Flow Path:** List ALL Actions/methods called in order
     * **Complexity Indicators:**
       - Number of Actions involved
       - Number of conditional branches
       - Number of events triggered
       - Number of database operations
       - Guard-specific behavior (yes/no)
       - External integrations (yes/no)
     * **Domain(s):** Which domain(s) are involved
     * **File Locations:** All relevant file paths
     * **Priority:** High/Medium/Low based on complexity and business importance

2. **Present the complete list to the user:**
   - Format as a numbered list
   - **Show total count prominently** (e.g., "Found 23 business logic flows")
   - **If count is less than 15, explicitly state: "WARNING: Only [N] flows found. Expected 15-30+. Re-scanning more thoroughly..."**
   - Group by domain AND by category
   - Include a summary table with: Flow Name | Domain | Category | Complexity | Priority
   - Show distribution: "CRUD: 8 flows, State Transitions: 5 flows, Workflows: 4 flows, etc."

3. **CRITICAL:** Do NOT proceed to documentation generation until you have:
   - Scanned ALL the locations listed above
   - Created a COMPLETE list of ALL flows
   - Presented the list to the user
   - Confirmed the list is comprehensive

**Example Output Format:**

```
## Complete Business Logic Flow Inventory

**Total Flows Identified: [N]**

### Domain: Assignments
1. **Flow:** Assignment Acceptance by TK
   - Trigger: POST /api/assignments/{id}/accept
   - Entry Point: AcceptAssignmentByTkAction
   - Flow Path: AcceptAssignmentByTkAction → CreateTokenAction → SendEmailAction → CreateDeliveryAction
   - Complexity: High (4 Actions, 3 branches, 2 events, guard-specific)
   - Priority: High
   - Files: src/Domain/Assignment/Actions/AcceptAssignmentByTkAction.php, ...

2. **Flow:** Assignment Rejection
   - ...
   
[... continue for ALL flows ...]

### Summary Table
| Flow Name | Domain | Actions | Branches | Events | Priority |
|-----------|--------|---------|----------|--------|----------|
| Assignment Acceptance by TK | Assignments | 4 | 3 | 2 | High |
| ... | ... | ... | ... | ... | ... |
```

**ONLY AFTER presenting this complete list, proceed to Step 3.2.**

**Step 3.2 - Flow Identification & Validation:**

Using the complete list from Step 3.1.6, validate and enhance:

- **Verify completeness:** Ensure the list from Step 3.1.6 includes ALL flows. If you find any missing flows during validation, add them to the list.
- **For EACH flow in the complete list:**
  * Verify the flow path is accurate
  * Trace the COMPLETE execution path from start to finish
  * Identify ALL conditional branches (if/else, switch cases, match statements)
  * Map ALL error paths and rollback scenarios
  * Document guard-specific behavior (CRM vs Portal differences)
  * Identify early returns and exit conditions
  * Map loop iterations and batch processing
  * List ALL side effects (notifications, emails, events, logs)
  * Identify data transformations and calculations
  * Map state transitions
- **Cross-reference:** Ensure every Action that calls other Actions is represented in a flow
- **Final validation:** Count the flows - you should have 15-30+ flows for a typical project. If you have fewer than 10, you're missing flows. Re-scan more thoroughly.

**Step 3.3 - Business Rules Extraction:**
- For EACH flow, extract ALL business rules:
  * Validation rules (what data is required/allowed, format constraints, size limits)
  * Business constraints (what can/cannot happen, state requirements)
  * State transitions (how entities change state, when transitions occur)
  * Relationship rules (how entities relate to each other, cascade behaviors)
  * Calculation logic (how values are computed, formatted, converted)
  * Permission/authorization rules (who can perform actions, guard-specific behavior)
  * Transaction rules (what happens in transactions, rollback conditions)
  * Data integrity rules (foreign key constraints, unique constraints, null handling)
- Document EVERY rule with:
  * Clear explanation of the rule
  * Implementation details (code snippets with file paths)
  * Consequences of the rule (what it means for the system)
  * Examples where applicable

**Step 3.4 - Documentation Generation:**

**CRITICAL:** You MUST document EVERY flow from the complete list created in Step 3.1.6. Do NOT skip any flows. Do NOT summarize multiple flows into one document.

- **Use the complete flow list from Step 3.1.6** - This is your source of truth
- **For EACH flow in that list**, generate a separate `docs/logic/[flow-name].mdx` file
- **Count verification:** If your list has 20 flows, you MUST create 20 documentation files. If you create fewer, you're missing flows.
- **STRICT CONSTRAINT:** You MUST use `@DOCS_LOGIC_TEMPLATE.md` as your style guide.
- For EACH flow document, include:
  * **"Het Doel" section:** Clear, non-technical explanation of what the flow accomplishes
  * **Complete Mermaid diagram (`graph TD`):**
    - Show ALL steps with descriptive labels
    - Include ALL decision points (diamonds) with conditions
    - Show ALL branches (yes/no paths)
    - Include error paths (dotted lines)
    - Label all nodes clearly
  * **Business Regels & Validaties (AccordionGroup):**
    - Minimum 3-7 business rules per flow
    - Each rule in its own Accordion
    - Include implementation code snippets with file paths
    - Explain consequences clearly
  * **Edge Cases (Warning blocks):**
    - Minimum 3-5 edge cases per flow
    - Each edge case explains what happens in that scenario
    - Include potential data inconsistencies or error conditions
  * **QA & Test Scenarios:**
    - Happy Path scenario (complete expected behavior)
    - Minimum 3-5 edge case scenarios
    - Each scenario with clear "Scenario" and "Verwachting" (expectation)
  * **Betrokken Code (CardGroup):**
    - Links to ALL involved Actions
    - Links to related Domain documentation
    - Links to related flow documents
- **DO NOT SUMMARIZE:** Document every step, every rule, every edge case explicitly.
- **Reference Examples:** Use existing flow documents (contact-creation, property-creation, property-override, document-upload, etc.) as templates for the level of detail required.

**Step 3.5 - Verification & Completeness Check:**

**CRITICAL VERIFICATION STEPS:**

1. **Count Verification:**
   - Count the flows in your list from Step 3.1.6: [N] flows
   - Count the documentation files created in `docs/logic/`: [M] files
   - **These numbers MUST match.** If M < N, you're missing flows. Go back and document the missing ones.

2. **Cross-reference Verification:**
   - Every flow from Step 3.1.6 MUST have a corresponding documentation file
   - Every Action that calls other Actions MUST be in a flow document
   - Every Controller endpoint that performs complex operations MUST be documented
   - Every Event listener with business logic MUST be included
   - Every Action with guard-specific behavior MUST be documented
   - Every Action with transaction handling MUST be documented
   - Every Action with multi-model operations MUST be documented
   - Every Job that performs business logic MUST be documented

3. **Quality Verification:**
   - For EACH flow document, verify it has:
     * Complete Mermaid diagram (no missing steps or branches)
     * Minimum 3 business rules documented
     * Minimum 3 edge cases documented
     * Complete QA scenarios
     * All code links working
     * All Actions in the flow path are documented

4. **Final Report:**
   - Report: "✅ Phase 3 (Business Logic) complete"
   - Provide summary:
     * Total flows identified: [N]
     * Total documentation files created: [M]
     * Files location: `docs/logic/`
     * Domains covered: [list]
   - If M < N, report which flows are missing and create them now.

**If any business logic is missing documentation, create it now before proceeding.**

Report when Phase 3 (Business Logic) is complete. Do NOT proceed to Domains.
```

