# Documentation Master Plan (Mintlify & Laravel DDD)

This file contains the instructions to generate the complete documentation for this project.

## Configuration

**CRITICAL:** Before executing any phase, read the `ai-docs.config.json` file in the project root. This configuration file controls:

- **Project Info:** `config.project.name`, `config.project.description`
- **Language:** `config.language` (default: `nl`)
- **Paths:** `config.paths.*` for all input/output directories
- **Framework:** `config.framework.patterns.*` to locate Actions, DTOs, Models
- **Features:** `config.generation.features.*` to determine which sections to generate
- **Options:** `config.generation.options.*` for generation behavior
- **Style:** `config.style.*` for tone and audience

**If `ai-docs.config.json` is not found**, use these defaults:
- Language: Dutch (`nl`)
- Domain Path: `src/Domain`
- Docs Output: `docs`
- Framework: Laravel with standard DDD patterns

---

**Goal:** Create a comprehensive documentation site using Mintlify.
**Language:** Read from `config.language` (default: Dutch/Nederlands).
**Tone:** Read from `config.style.tone` (default: Professional, clear, developer-focused).

## Global Style Rules (Crucial)
1. **Mintlify Components:** Use `<Card>`, `<Steps>`, `<Note>`, `<Warning>` aggressively.
2. **Code Blocks:**
   - Always specify the language (php, bash, json).
   - **ALWAYS** include the filename or class name in the code block header.
   - Example format:
     ```php app/Http/Controllers/InvoiceController.php
     class InvoiceController ...
     ```

---

## Phase 1: Essentials (Static Pages)

### 1. Introduction (`docs/index.mdx`)
Create a high-level overview.
- **Header:** Welcome & note about DDD architecture.
- **Architecture:** Explain why we use DDD (Business Logic separated from Framework).
- **Visual:** Use `<Steps>` to show the request flow: Controller -> DTO -> Domain Action.
- **Navigation:** Use `<CardGroup>` to link to Setup, Development Workflow, Business Logic, and Domains.
- **Documentation Workflows:** After the Navigation CardGroup, add a section "Documentatie Workflows" with a CardGroup containing:
  * Card for Development Workflow
  * Card explaining incremental documentation updates (reference `docs/steps/step-incremental-update.md`)
  * Mention that developers can keep docs in sync during development without regenerating everything

### 2. Setup / Quickstart (`docs/setup.mdx`)
Create a DDEV-focused installation guide.
- **Prerequisites:** Docker, DDEV.
- **Steps:** Use `<Steps>` component.
  1. Clone & `ddev start`.
  2. Backend: `ddev composer install`, `cp .env.example .env`, `ddev artisan key:generate`.
  3. Database: `ddev artisan migrate:fresh --seed` (Emphasize seeds!).
  4. Frontend: `ddev npm install` & build.
- **Troubleshooting:** Add common issues in an `<AccordionGroup>`.

### 3. Development Workflow (`docs/development.mdx`)
Create a guide for adding features.
- **Workflow:** Use `<Steps>` to explain the flow: Create Model -> Create DTO -> Create Action -> Create Controller.
- **Documentation Step:** After the "Frontend Component" step, add a step "Documentatie Bijwerken" that:
  * Explains that after making code changes, documentation should be updated
  * References the incremental update step: `docs/steps/step-incremental-update.md`
  * Explains it detects git changes and updates only affected documentation files
  * Mentions it can compare against a branch (master/dev) or use uncommitted changes
  * Includes a brief example showing the workflow
- **Quality:** Document commands for PHPStan, Pint/CS-Fixer, and Tests (Pest/PHPUnit). Use `<CodeGroup>` with filenames (e.g., `composer.json` scripts).
- **Diagram:** Include a Mermaid.js sequence diagram of the data flow.

---

## Phase 2: Domain Documentation (Detailed Deep Dive)

**Target:** Iterate through every domain folder in `config.paths.domainSource` (default: `src/Domain`).
**Output:** Create files in `config.paths.domainsOutput` (default: `docs/domains/[domain-name].mdx`).
**Skip:** Any domains listed in `config.generation.skipDomains`.
**Priority:** Process domains in `config.generation.priorityDomains` first.

**CRITICAL INSTRUCTION:** Do not summarize. Be exhaustive. List every property, every action, and every relation found in the code.

**Structure per Domain Page:**

### 1. Concept
- Analyze the domain name and files to write a functional summary.
- Use a bullet list to explain what a user/developer can do in this domain (CRUD, specific features).

### 2. Data Structuur (DTOs)
- Scan the `DataTransferObjects` folder.
- **For EVERY DTO class found:**
  - Create a generic header (e.g. `### EventEntity`).
  - Add a short description.
  - **Iterate through every property** in the DTO constructor/class.
  - Generete a Mintlify `<ParamField>` for each property:
    - `path`: The property name.
    - `type`: The PHP type (string, int, Carbon, etc).
    - `required`: If it's nullable or has a default, it's not required.
    - `Description`: Infer from docblocks or variable name.

### 3. Belangrijkste Acties (Actions)
- Scan the `Actions` folder.
- **For EVERY Action class:**
  - Create a header (e.g. `### CreateEventAction`).
  - **Functionaliteit:** Bullet points explaining the business logic inside the `execute` method.
  - **Gebruik:** A PHP code block showing how to instantiate and call `$action->execute(...)`.

### 4. Services (Optional)
- Scan the `Services` folder (if present).
- Follow the same structure as Actions (Functionality + Code Example).

### 5. Gebruik (Controller Examples)
- Look for Controllers that use this domain.
- Create real-world examples:
  - "Event aanmaken": Show a Controller method injecting the Action and DTO.
  - "Data ophalen": Show a Controller method using a Retrieval Action.
- Ensure strict strict typing is visible in the examples.

### 6. Model Details (Eloquent)
- Scan the `Models` folder.
- **Relaties:** List all methods returning `BelongsTo`, `HasMany`, etc.
- **Scopes:** List all methods starting with `scope...`.
- **Accessors:** List all `get...Attribute` methods or Attribute return types.

## Phase 3: Business Logic (Workflows, Rules & QA)

**Target:** Identify complex business processes (e.g., Event Creation, Invoice Calculation, State Transitions).
**Output:** Create files in `config.paths.logicOutput` (default: `docs/logic/[process-name].mdx`).
**Enabled:** Only if `config.generation.features.businessLogic` is `true`.

**CRITICAL INSTRUCTION:** Use `DOCS_LOGIC_TEMPLATE.md` as the source of truth. The output must appeal to Developers AND Project Managers.

**Structure per Logic Page:**

1. **Het Doel (The "Why"):**
   - Simple, non-technical explanation ("Jip-en-Janneke").

2. **De Flow (Mermaid Visualisation):**
   - Generate a `graph TD` Mermaid diagram.
   - Visualize decision points and Actions.

3. **Business Regels & Validaties:**
   - Use `<AccordionGroup>`.
   - Document specific rules, implementations, and consequences.

4. **Edge Cases:**
   - Use `<Warning>` blocks for "What if" scenarios.

5. **QA & Test Scenario's (Crucial for PMs):**
   - List concrete test scenarios (Happy Path + Edge Cases).
   - Format: **Scenario** -> **Verwachting**.

6. **Betrokken Code:**
   - Use a `<CardGroup>` linking back to the technical domain docs.

---

## Phase 4: Navigation (`docs.json`)

Update `config.mintlify.configFile` (default: `docs.json` or `mint.json`).
Apply theme colors from `config.mintlify.colors` and branding from `config.mintlify.logo`.

- **Tab: Getting Started** (Introduction, Setup, Development)
- **Tab: Business Logic** (List logic pages)
- **Tab: Cases** (List specific case documentation pages)
- **Tab: Domains** (List all generated domain pages alphabetically)

---

## Phase 5: Validation & Quality Control (Auto-Fix)

**Goal:** Ensure the generated files allow the site to build without crashing.

**Steps to execute:**
1. **Check Syntax:** Scan for unclosed tags (`<Card>` without `</Card>`).
2. **Check Escaping:** Ensure generic types like `Collection<User>` are escaped as `Collection&lt;User&gt;` or wrapped in backticks.
3. **Check Frontmatter:** Ensure title and description are quoted strings.
4. **Check JSON:** Ensure `docs.json` has no trailing commas.