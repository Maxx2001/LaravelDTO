# Step 6a: Auto-Identify Cases

**WAIT** until Business Logic documentation is complete, then copy and paste the code block below into the Composer chat and hit **Enter**. This will automatically scan your codebase and identify important cases that need documentation.

```text
You are an autonomous Documentation Engineer. Execute ONLY Case Identification (Step 6a).

**CRITICAL:** This step ONLY identifies cases. Do NOT create documentation yet. 

**YOUR GOAL:** Find 10-20+ system interaction cases. If you find fewer than 8, you're not being thorough enough.

**IMPORTANT:** Document EVERY scenario where 3+ systems/domains interact, even if the interaction seems simple. Don't filter out "simple" cases.

**EXECUTE CASE IDENTIFICATION:**

**Step 6a.1 - Scan Codebase for System Interactions:**
- Scan ALL Actions in `@src/Domain` to identify Actions that:
  * Call Actions from OTHER domains (cross-domain orchestration)
  * Trigger events that are handled by listeners in OTHER domains
  * Interact with external services (FTP, APIs, third-party services, email, storage)
  * Coordinate multiple domains in a single transaction
  * Handle data synchronization between domains
  * Manage complex state transitions across multiple systems
- Scan ALL Controllers to identify endpoints that:
  * Trigger multi-domain operations
  * Coordinate multiple Actions from different domains
  * Handle external integrations (FTP uploads, API calls, webhooks)
  * Process batch operations affecting multiple domains
- Scan ALL Event Listeners to identify listeners that:
  * Perform operations in OTHER domains
  * Trigger cascading operations across systems
  * Handle cross-domain state synchronization
- Scan ALL Jobs/Queues to identify jobs that:
  * Process data from multiple domains
  * Coordinate operations across systems
  * Handle external service integrations
- Scan ALL Services to identify services that:
  * Coordinate multiple domain operations
  * Manage inter-system communication
  * Handle data transformation between systems

**Step 6a.2 - Analyze Business Logic Documentation:**
- If `@docs/logic/` exists, analyze ALL logic flow documents
- Identify flows that involve 3+ different domains/systems
- Identify flows with external dependencies (FTP, APIs, storage, email)
- Identify flows with complex data synchronization
- Identify flows with event-driven architectures spanning multiple domains

**Step 6a.3 - Identify Case Candidates:**
For each potential case, identify:
- **Case Name:** Descriptive name (e.g., "Assignment Acceptance - Systeem Interacties")
- **Primary Systems/Domains:** List ALL domains/systems involved (minimum 3)
- **Interaction Type:** 
  * Cross-domain orchestration (Action A calls Actions B, C, D from different domains)
  * Event-driven flow (Event triggers listeners in multiple domains)
  * External integration (FTP, API, third-party service)
  * Data synchronization (systems share/sync data)
  * Transaction coordination (multiple domains in single transaction)
- **Complexity Indicators:**
  * Number of systems involved (3+ = high priority)
  * Presence of external dependencies
  * Data flow complexity (bidirectional, cascading, etc.)
  * Error handling complexity (rollback across systems)
  * State management complexity (state changes in multiple systems)

**Step 6a.4 - Rank and Select Cases:**
- **DO NOT filter cases out.** Include ALL cases where 3+ systems interact.
- Prioritize cases with:
  * Highest number of system interactions (5+ systems = highest priority)
  * External dependencies (FTP, APIs, third-party services)
  * Complex data synchronization requirements
  * Critical business processes (user-facing, revenue-generating, etc.)
  * Event-driven architectures with multiple listeners
- **But also include:**
  * Simple cross-domain operations (3+ domains = case)
  * Any scenario with external service calls
  * Any scenario with event listeners in multiple domains
  * Any scenario with data synchronization between domains
- **Select ALL cases found, minimum 8-10, preferably 15-20+**
- Rank them by importance/complexity, but include all of them

**Step 6a.5 - Generate Case Suggestions:**
For EACH identified case, create a detailed suggestion with:
- **Case Name:** Clear, descriptive name
- **Suggested Filename:** `[case-name].mdx` (kebab-case, descriptive)
- **Primary Systems/Components:** List all involved domains/systems with brief descriptions
- **Interaction Scope:** Describe what interactions are involved
- **Use Case:** When is this case relevant? What is the business purpose?
- **Complexity Score:** Rate 1-5 (5 = most complex)
- **Priority:** High/Medium/Low
- **Related Logic Docs:** If `docs/logic/` exists, reference related flow documents
- **Key Code Locations:** List main Actions, Controllers, Events, or Services involved

**OUTPUT FORMAT:**
Present your findings as a numbered list of case suggestions. For each case, use this format:

```
## Case [N]: [Case Name]

**Suggested Filename:** `[case-name].mdx`

**Primary Systems/Components:**
- [Domain/System 1]: [Brief description of role]
- [Domain/System 2]: [Brief description of role]
- [Domain/System 3]: [Brief description of role]
- [Additional systems...]

**Interaction Scope:**
[Detailed description of what interactions occur between systems]

**Use Case:**
[When is this case relevant? What business purpose does it serve?]

**Complexity Score:** [1-5] | **Priority:** [High/Medium/Low]

**Related Logic Documentation:**
- [Link to related logic doc if exists, or "N/A"]

**Key Code Locations:**
- `src/Domain/[Domain1]/Actions/[ActionName].php`
- `src/Domain/[Domain2]/Actions/[ActionName].php`
- [Additional key files...]
```

**CRITICAL REQUIREMENTS:**
- Identify AT LEAST 5 cases (more is better)
- Each case MUST involve 3+ systems/domains
- Prioritize cases with external dependencies
- Prioritize cases with complex data flows
- Be specific about which domains/systems are involved
- Provide clear, actionable case descriptions

**DO NOT:**
- Create documentation yet (only identify and suggest)
- Suggest cases that are already documented in `docs/cases/`
- Suggest trivial cases (single domain operations)
- Summarize - be specific about each case

Report when case identification is complete. Present all identified cases in a clear, numbered list format.
```

