# Step 9: Configure Cursor Context for Documentation

**WAIT** until Step 8 (Navigation & Validation) is complete, then copy and paste the code block below into the Composer chat and hit **Enter**. Wait for completion before proceeding.

```text
You are an autonomous Documentation Engineer. Execute ONLY the Cursor Context Configuration step.

**CRITICAL:** This is a SEPARATE step. Only work on Cursor context configuration. Do NOT proceed to other documentation tasks.

**EXECUTE CURSOR CONTEXT CONFIGURATION:**

**Step 9.1 - Read Configuration:**
- Read `ai-docs.config.json` to get:
  * `project.name` - Project name for the rules header
  * `project.description` - Project description
  * `paths.domainSource` - Domain source path (default: `src/Domain`)
  * `language` - Documentation language
- Scan `docs/domains/` to get list of all documented domains
- Scan `docs/logic/` to get list of all business logic flows
- Scan `docs/cases/` to get list of all case studies

**Step 9.2 - Create Complete .cursor/rules.md:**
- Create the directory `.cursor/` if it doesn't exist
- Create or OVERWRITE `.cursor/rules.md` with the COMPLETE rules file below
- **CRITICAL:** Replace all `[PROJECT_NAME]` placeholders with the actual project name from config
- **CRITICAL:** Replace all `[PROJECT_DESCRIPTION]` placeholders with the actual description
- **CRITICAL:** The "Project Documentation Context" section at the end must be dynamically generated based on the actual files in `docs/`

**TEMPLATE FOR .cursor/rules.md:**

---BEGIN TEMPLATE---

# [PROJECT_NAME] - Cursor Rules

[PROJECT_DESCRIPTION]

Dit is een Laravel 11 applicatie gebouwd met **Domain-Driven Design (DDD)** architectuur. Deze rules zorgen ervoor dat alle code consistent en volgens de project conventies wordt geschreven.

---

## 🏗️ Architectuur Overzicht

### Project Structuur

\`\`\`
src/
├── App/          # Framework-specifieke code (Controllers, Middleware, Jobs, Providers)
├── Domain/       # Business logica per domein (Models, Actions, DTOs, Enums, Traits)
└── Support/      # Gedeelde utilities, base classes en connectors
\`\`\`

### Namespaces

| Directory | Namespace | Doel |
|-----------|-----------|------|
| `src/App/` | `App\` | Controllers, Jobs, Middleware, Providers |
| `src/Domain/` | `Domain\` | Business logica, Models, Actions, DTOs |
| `src/Support/` | `Support\` | Shared utilities, base classes, connectors |

---

## 📁 Domain Structuur

Elk domein volgt deze standaard structuur:

\`\`\`
src/Domain/[DomainName]/
├── Actions/                    # Business logica operaties
│   ├── Create[Model]Action.php
│   ├── Edit[Model]Action.php
│   ├── Delete[Model]Action.php
│   └── View[Model]Action.php
├── DataTransferObjects/        # Input/output data structuren
│   ├── [Model]Data.php         # Input DTO voor create/update
│   ├── [Model]Entity.php       # Output DTO voor views
│   └── Create[Model]Data.php   # Specifieke create DTO
├── Enums/                      # Enum classes
├── Mail/                       # Mailable classes
├── Models/                     # Eloquent models
│   └── [Model].php
├── Policies/                   # Authorization policies
└── Traits/                     # Domain-specifieke traits
    └── Has[Models].php
\`\`\`

---

## ⚙️ Development Environment (DDEV)

### ALTIJD DDEV gebruiken voor commands

\`\`\`bash
# Start de ontwikkelomgeving
ddev start

# Artisan commands
ddev artisan migrate
ddev artisan migrate:fresh --seed
ddev artisan make:migration create_table_name
ddev artisan test
ddev artisan test --filter TestName
ddev artisan tinker
ddev artisan route:list

# Composer commands
ddev composer install
ddev composer require package/name
ddev composer pint              # Code style fixen
ddev composer phpstan           # Static analysis

# NPM commands
ddev npm install
ddev npm run dev
ddev npm run build

# Database access
ddev mysql

# Container shell
ddev ssh
\`\`\`

### ⚠️ Belangrijke DDEV regels

- **NOOIT** directe `php`, `composer`, of `npm` commands gebruiken
- **ALTIJD** `ddev` prefix gebruiken
- Database credentials staan in `.env` en worden automatisch door DDEV geconfigureerd

---

## 📝 Code Conventies

### 1. Models (`src/Domain/[Domain]/Models/`)

\`\`\`php
<?php

namespace Domain\[Domain]\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class [Model] extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    protected $casts = [
        'date_field' => 'date:d/m/Y',
        'is_active' => 'boolean',
    ];

    // Relaties
    public function relatedModels(): HasMany
    {
        return $this->hasMany(RelatedModel::class);
    }
}
\`\`\`

**Regels:**
- Models staan ALTIJD in `src/Domain/[Domain]/Models/`
- Gebruik `$fillable` voor mass assignment
- Definieer `$casts` voor type casting
- Documenteer properties met PHPDoc block

### 2. Actions (`src/Domain/[Domain]/Actions/`)

Actions bevatten **ALLE** business logica. Controllers zijn alleen voor HTTP handling.

\`\`\`php
<?php

namespace Domain\[Domain]\Actions;

use Domain\[Domain]\DataTransferObjects\Create[Model]Data;
use Domain\[Domain]\Models\[Model];
use Support\Actions\Action;

class Create[Model]Action extends Action
{
    public function __construct(
        private OtherAction $otherAction,
    ) {}

    public function execute(Create[Model]Data $data): [Model]
    {
        $model = [Model]::create([
            'name' => $data->name,
            'description' => $data->description,
        ]);

        return $model;
    }
}
\`\`\`

**Regels:**
- Extend ALTIJD van `Support\Actions\Action`
- Accepteer DTO's als input, NOOIT raw arrays of Request objects
- Return altijd het gecreëerde/gewijzigde model of entity
- Gebruik dependency injection voor andere actions

### 3. Data Transfer Objects (DTOs)

Gebruik Spatie Laravel Data voor DTOs:

\`\`\`php
<?php

namespace Domain\[Domain]\DataTransferObjects;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Rule;

class Create[Model]Data extends Data
{
    public function __construct(
        public string $name,
        #[Rule(['email', 'unique:users,email'])]
        public string $email,
        public ?string $description = null,
    ) {}
}
\`\`\`

**Regels:**
- Extend ALTIJD van `Spatie\LaravelData\Data`
- Gebruik type hints voor alle properties
- Nullable properties hebben `?` prefix en default `null` value
- Gebruik `[Model]Data` voor input, `[Model]Entity` voor output

### 4. Controllers (`src/App/CRM/[Domain]/Controllers/`)

\`\`\`php
<?php

namespace App\CRM\[Domain]\Controllers;

use Domain\[Domain]\Actions\Create[Model]Action;
use Domain\[Domain]\DataTransferObjects\Create[Model]Data;
use Domain\[Domain]\Models\[Model];
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Support\Controllers\Controller;

class [Model]Controller extends Controller
{
    public function store(
        Create[Model]Data $data,
        Create[Model]Action $action
    ): RedirectResponse {
        $model = $action->execute($data);

        return redirect()->back()->with('newEntry', $model);
    }

    public function show([Model] $model): Response
    {
        return Inertia::render('CRM/[Domain]/Detail', [
            '[model]' => $model,
        ]);
    }
}
\`\`\`

**Regels:**
- Controllers bevatten GEEN business logica
- Injecteer Actions en DTOs via method injection
- Gebruik Inertia voor responses

---

## 🎨 Frontend Conventies (Vue 3 + Inertia.js)

### Component Structuur

\`\`\`vue
<script setup>
import MainLayout from "@/Layouts/CRM/MainLayout.vue";
import usePermissions from "@/Stores/Permissions.ts";
import { provide } from "vue";

const props = defineProps({
    models: {
        type: Object,
        required: true,
    },
});

const permission = usePermissions();
provide('permissions', {
    edit: permission.can('[models].edit'),
    create: permission.can('[models].create'),
});
</script>

<template>
    <LayoutHolder :title="__('[models].meta.title.index')">
        <MainLayout>
            <!-- Content -->
        </MainLayout>
    </LayoutHolder>
</template>
\`\`\`

**Regels:**
- Gebruik Composition API met `<script setup>`
- Gebruik `__()` helper voor vertalingen
- Gebruik `usePermissions()` voor authorization

---

## 📚 Documentatie Workflow (AI Docs Kit)

### Configuratie

Lees altijd eerst `ai-docs.config.json` voor project-specifieke instellingen:
- `config.language` - Documentatie taal
- `config.paths.domainSource` - Domain source pad
- `config.paths.*Output` - Output directories

### Templates

Gebruik de juiste template voor elk documentatie type:

| Type | Template | Output |
|------|----------|--------|
| Domain docs | `templates/DOCS_TEMPLATE.md` | `docs/domains/` |
| Business Logic | `templates/LOGIC_TEMPLATE.MD` | `docs/logic/` |
| Case Studies | `templates/SPECIFIC_CASE_TEMPLATE.md` | `docs/cases/` |

### Mintlify Components

Gebruik Mintlify componenten voor rijke documentatie:

\`\`\`mdx
<Card title="Titel" icon="icon-name" href="/link">
  Beschrijving
</Card>

<Steps>
  <Step title="Stap 1">Instructies</Step>
  <Step title="Stap 2">Instructies</Step>
</Steps>

<ParamField path="field_name" type="string" required>
  Beschrijving van het veld
</ParamField>

<Warning>Belangrijke waarschuwing</Warning>
<Note>Extra informatie</Note>
\`\`\`

### MDX Syntax Regels

- Escape PHP generics: `Collection<User>` → `Collection&lt;User&gt;` of backticks
- Quote frontmatter strings: `title: "Page Title"`
- Sluit alle component tags correct

---

## 🔍 Quality Checks

### Voor elke commit

\`\`\`bash
# PHP code style
ddev composer pint

# Static analysis
ddev composer phpstan

# Tests
ddev artisan test
\`\`\`

---

## ⚠️ Belangrijke Don'ts

### ❌ NOOIT doen:

1. **Business logica in Controllers**
2. **Raw arrays in plaats van DTOs**
3. **Facades in Actions** (gebruik dependency injection)
4. **Directe PHP/NPM commands** (gebruik DDEV)
5. **Models buiten Domain folder**

---

## 📖 Project Documentation Context

### Documentatie Structuur

Dit project heeft gegenereerde documentatie in `docs/`:

- **Business Logic Flows:** `docs/logic/` - Workflow documentatie met Mermaid diagrams
- **Domain Documentation:** `docs/domains/` - Technische domain docs (DTOs, Actions, Models)
- **Case Studies:** `docs/cases/` - Complexe multi-systeem interacties

### Cursor @docs/ Syntax

Gebruik `@` om documentatie te laden in Cursor:

\`\`\`
@docs/CONTEXT.md          # Overzicht van alle documentatie
@docs/logic/              # Alle business logic flows
@docs/domains/            # Alle domain documentatie
@docs/cases/              # Alle case studies
@docs/development.mdx     # Development workflow
\`\`\`

### Beschikbare Domains

[DYNAMISCH: Lijst hier alle domains uit docs/domains/ met hun .mdx bestanden]

### Beschikbare Business Logic Flows

[DYNAMISCH: Lijst hier alle flows uit docs/logic/ met hun .mdx bestanden]

### Beschikbare Case Studies

[DYNAMISCH: Lijst hier alle cases uit docs/cases/ met hun .mdx bestanden]

### Quick Reference

| Taak | Documentatie |
|------|--------------|
| Nieuwe feature bouwen | `@docs/development.mdx` |
| Domain begrijpen | `@docs/domains/[domain].mdx` |
| Business flow begrijpen | `@docs/logic/[flow].mdx` |
| Complexe interactie begrijpen | `@docs/cases/[case].mdx` |

---END TEMPLATE---

**Step 9.3 - Create docs/CONTEXT.md:**
- Create a new file `docs/CONTEXT.md` that serves as a documentation index for Cursor
- Include:
  * A header explaining this is a context index for Cursor AI
  * Quick reference section with common `@docs/` patterns
  * Organized lists of:
    - All business logic flows (grouped by domain/type)
    - All domain documentation files
    - All case study files
    - Getting started guides
    - Templates and reference materials
  * Usage examples showing how to reference specific documentation
- Format: Use clear markdown with sections and bullet points
- **CRITICAL:** Make it scannable and easy to reference

**Step 9.4 - Verify Configuration:**
- Verify that `.cursor/rules.md` was created with complete content
- Verify that all [DYNAMISCH] sections were properly filled with actual file lists
- Verify that `docs/CONTEXT.md` was created with comprehensive content
- Ensure all file paths are correct and match the actual documentation structure
- Check that the CONTEXT.md file references match the files in `docs/docs.json`

**Step 9.5 - Report Summary:**
- Report the number of documentation files indexed
- Report that `.cursor/rules.md` was created with complete project rules
- Confirm that Cursor can now use `@docs/CONTEXT.md` to get an overview of all documentation
- Confirm that developers can use `@docs/logic/`, `@docs/domains/`, `@docs/cases/` to load specific documentation categories

Report when Cursor Context Configuration is complete. Do NOT proceed to other tasks.
```

**What this step does:**
- Creates **complete** `.cursor/rules.md` with Laravel DDD conventions, DDEV commands, code standards, and documentation workflow
- Creates `docs/CONTEXT.md` as a comprehensive documentation index
- Dynamically populates domain, logic, and case lists based on generated docs
- Enables easy reference to documentation using `@docs/` syntax

**Generated Rules Include:**
1. **Architecture Overview** - Project structure and namespaces
2. **Domain Structure** - Standard folder layout for domains
3. **DDEV Commands** - All development commands with ddev prefix
4. **Code Conventions** - Models, Actions, DTOs, Controllers
5. **Frontend Conventions** - Vue 3 + Inertia patterns
6. **Documentation Workflow** - AI Docs Kit templates and Mintlify
7. **Quality Checks** - Pint, PHPStan, tests
8. **Don'ts** - Critical mistakes to avoid
9. **Documentation Context** - Dynamic index of all generated docs

**Usage:**
After running this step, developers can:
- Use `@.cursor/rules.md` for all project conventions
- Use `@docs/CONTEXT.md` to get an overview of all documentation
- Use `@docs/logic/` to load all business logic flows
- Use `@docs/domains/` to load all domain documentation
- Use `@docs/cases/` to load all case studies
- Reference specific files like `@docs/logic/assignment-creation.mdx`

**Next Steps:**
Update `docs/steps/master-orchestrator.md` to include this as Execution Step 7 (after Navigation & Validation).
