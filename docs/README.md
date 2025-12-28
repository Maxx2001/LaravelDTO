# 📚 AI Docs Kit

**Automated documentation generation for Laravel Domain Driven Design projects using Cursor AI.**

Generate a comprehensive, professional documentation site (Mintlify) from your codebase in minutes. Covers **Setup**, **Development Workflows**, **Technical Domain Documentation**, and **Business Logic**.

-----

## 🚀 Quick Start

### Step 1: Copy to Your Laravel Project

Copy this kit into your Laravel DDD project:

```bash
# Copy the entire kit to your project's docs folder
cp -r /path/to/ai-docs/* /path/to/your/laravel-project/docs/

# Or clone directly into your project
git clone https://github.com/your-org/ai-docs.git docs/
```

### Step 2: Configure `ai-docs.config.json`

Edit `ai-docs.config.json` in your project root with your project details:

```json
{
  "project": {
    "name": "My Laravel App",
    "description": "Description of your project"
  },
  "language": "en",
  "paths": {
    "domainSource": "src/Domain"
  }
}
```

**Key settings to customize:**

| Setting | What to change |
|---------|----------------|
| `project.name` | Your project name |
| `language` | `"nl"`, `"en"`, `"de"`, `"fr"`, or `"es"` |
| `paths.domainSource` | Path to your DDD domains (default: `src/Domain`) |
| `generation.skipDomains` | Domains to exclude, e.g. `["Legacy", "Deprecated"]` |
| `mintlify.colors.primary` | Your brand color |

### Step 3: Run the Automation

1. **Open Cursor Composer:** Press `Cmd + E` (Mac) or `Ctrl + E` (Windows)

2. **Load context** by typing `@` and selecting:
   - `@ai-docs.config.json`
   - `@templates/`
   - `@steps/`
   - `@src/Domain`
   - `@docs.json`

3. **Paste this prompt:**

```text
I want you to act as an autonomous Documentation Engineer and execute the complete documentation generation workflow.

Follow the instructions in @steps/master-orchestrator.md.

**Your task:**
1. Load configuration from @ai-docs.config.json
2. Execute Phase 0 (Cleanup) - automatically
3. Execute Phase 1 (Getting Started) - automatically
4. Execute Phase 2 (Domains) - automatically
5. Execute Phase 3 (Business Logic) - automatically
6. **PAUSE** - Ask me about Cases documentation
7. Execute Phase 4 & 5 (Navigation & Validation) - automatically

Start now.
```

4. **Done!** The agent generates all documentation automatically. You only confirm once at the Cases checkpoint.

-----

## ⚙️ Configuration Reference

Full `ai-docs.config.json` options:

```json
{
  "project": {
    "name": "Your Project Name",
    "description": "Brief description"
  },

  "language": "nl",

  "paths": {
    "domainSource": "src/Domain",
    "docsOutput": "docs",
    "domainsOutput": "docs/domains",
    "logicOutput": "docs/logic",
    "casesOutput": "docs/cases"
  },

  "framework": {
    "type": "laravel",
    "version": "11.x",
    "patterns": {
      "actions": "Actions",
      "dtos": "DataTransferObjects",
      "models": "Models",
      "services": "Services"
    }
  },

  "generation": {
    "features": {
      "domains": true,
      "businessLogic": true,
      "cases": true,
      "gettingStarted": true,
      "cursorContext": true
    },
    "skipDomains": [],
    "priorityDomains": []
  },

  "mintlify": {
    "theme": "mint",
    "colors": {
      "primary": "#16A34A",
      "light": "#07C983",
      "dark": "#15803D"
    }
  },

  "style": {
    "tone": "professional",
    "audience": "developers"
  },

  "git": {
    "defaultCompareBranch": "master"
  }
}
```

**No config file?** The kit uses sensible defaults (Dutch, `src/Domain`, all features enabled).

-----

## 📦 What's Inside

| File | Purpose |
|------|---------|
| `ai-docs.config.json` | Project configuration |
| `templates/DOCS_PLAN.md` | Master execution plan with all rules |
| `templates/DOCS_TEMPLATE.md` | Style guide for Domain docs (DTOs, Actions) |
| `templates/LOGIC_TEMPLATE.md` | Style guide for Business Logic (Flowcharts, QA) |
| `templates/SPECIFIC_CASE_TEMPLATE.md` | Template for system interaction cases |
| `steps/` | All step prompts for Cursor |

-----

## 🤖 Generated Cursor Rules

After running the documentation workflow, Step 9 automatically generates `.cursor/rules.md` in your project with:

| Section | Content |
|---------|---------|
| **Architecture** | DDD project structure, namespaces |
| **DDEV Commands** | All artisan, composer, npm commands |
| **Code Conventions** | Models, Actions, DTOs, Controllers |
| **Frontend** | Vue 3 + Inertia patterns |
| **Documentation** | AI Docs Kit workflow, Mintlify components |
| **Quality Checks** | Pint, PHPStan, testing |
| **Don'ts** | Critical mistakes to avoid |
| **Documentation Context** | Dynamic index of all generated docs |

This gives your team consistent coding standards AND easy access to documentation via `@docs/` syntax in Cursor.

-----

## 🔄 Workflow Options

### Option A: Automated (Recommended)

Use the Quick Start above. The agent runs through all phases automatically.

### Option B: Manual Step-by-Step

For full control, execute each step individually:

1. Load context: `@templates/`, `@steps/`, `@src/Domain`, `@docs.json`
2. Run steps in order:
   - `@steps/step-3-cleanup.md` → Cleanup
   - `@steps/step-4-getting-started.md` → Getting Started
   - `@steps/step-7-domains.md` → Domains
   - `@steps/step-5-business-logic.md` → Business Logic
   - `@steps/step-6a-identify-cases.md` → Identify Cases
   - `@steps/step-6c-document-cases.md` → Document Cases
   - `@steps/step-8-navigation-validation.md` → Navigation
   - `@steps/step-9-cursor-context.md` → Cursor Rules & Context

### Option C: Incremental Updates

For ongoing development, update only changed documentation:

1. Load context: `@src/Domain`, `@docs/domains/`, `@docs/logic/`
2. Run `@steps/step-incremental-update.md`
3. Choose branch to compare (or use uncommitted changes)

**Benefits:**
- Only updates affected files
- Perfect for daily development
- No risk of overwriting unrelated docs

-----

## 📑 Generated Documentation Structure

The kit generates documentation organized into **4 tabs**:

| Tab | Content |
|-----|---------|
| **Getting Started** | Introduction, setup guides, development workflows |
| **Business Logic** | Workflow documentation with Mermaid diagrams, QA scenarios |
| **Cases** | Complex inter-system interaction documentation |
| **Domains** | Technical domain docs (DTOs, Actions, Models) |

-----

## 🌿 Preview Your Docs

After generation, preview with Mintlify:

```bash
npm i -g mint    # Install CLI (once)
cd docs
mint dev         # Preview at localhost:3000
```

-----

## 🧩 Customization

| To change... | Edit... |
|--------------|---------|
| Tone, global style | `templates/DOCS_PLAN.md` |
| DTO/Action format | `templates/DOCS_TEMPLATE.md` |
| Flowcharts, QA format | `templates/LOGIC_TEMPLATE.md` |
| Case study format | `templates/SPECIFIC_CASE_TEMPLATE.md` |

-----

## ⚠️ Troubleshooting

### "Context Window Full"

For large codebases (50+ domains), run steps individually or split by domain:
- "Execute Phase 2 for domains A-M"
- "Execute Phase 2 for domains N-Z"

### "MDX Build Errors"

Usually caused by PHP generics like `Collection<User>`. Fix with:
- Ask Cursor: "Fix MDX syntax errors in [filename].mdx, escape the brackets"

### Mintlify Issues

- Run `mint update` if dev server fails
- Ensure you're in a folder with valid `docs.json`
