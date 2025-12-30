# Laravel DTO - Cursor Rules

A comprehensive demonstration of Domain Driven Design (DDD) architecture using Spatie Laravel Data for type-safe DTOs in Laravel.

Dit is een Laravel 11 applicatie gebouwd met **Domain-Driven Design (DDD)** architectuur. Deze rules zorgen ervoor dat alle code consistent en volgens de project conventies wordt geschreven.

---

## 🏗️ Architectuur Overzicht

### Project Structuur

```
src/
├── App/          # Framework-specifieke code (Controllers, Middleware, Jobs, Providers)
├── Domain/       # Business logica per domein (Models, Actions, DTOs, Enums, Traits)
└── Support/      # Gedeelde utilities, base classes en connectors
```

### Namespaces

| Directory | Namespace | Doel |
|-----------|-----------|------|
| `src/App/` | `App\` | Controllers, Jobs, Middleware, Providers |
| `src/Domain/` | `Src\Domain\` | Business logica, Models, Actions, DTOs |
| `src/Support/` | `Support\` | Shared utilities, base classes, connectors |

---

## 📁 Domain Structuur

Elk domein volgt deze standaard structuur:

```
src/Domain/[DomainName]/
├── Actions/                    # Business logica operaties
│   ├── Create[Model]Action.php
│   ├── Edit[Model]Action.php
│   ├── Delete[Model]Action.php
│   └── View[Model]Action.php
├── Data/                       # Input/output data structuren (DataTransferObjects)
│   ├── [Model]Data.php         # Input DTO voor create/update
│   ├── [Model]Entity.php       # Output DTO voor views
│   └── Create[Model]Data.php   # Specifieke create DTO
├── Models/                     # Eloquent models
│   └── [Model].php
└── Services/                   # Domain services (optioneel)
```

---

## ⚙️ Development Environment (Docker/Docker Compose)

### ALTIJD Docker gebruiken voor commands

```bash
# Start de ontwikkelomgeving
docker-compose up -d

# Artisan commands
docker-compose exec apache php artisan migrate
docker-compose exec apache php artisan migrate:fresh --seed
docker-compose exec apache php artisan make:migration create_table_name
docker-compose exec apache php artisan test
docker-compose exec apache php artisan test --filter TestName
docker-compose exec apache php artisan tinker
docker-compose exec apache php artisan route:list

# Composer commands
docker-compose exec apache composer install
docker-compose exec apache composer require package/name
docker-compose exec apache composer pint              # Code style fixen
docker-compose exec apache composer phpstan           # Static analysis

# NPM commands
docker-compose exec apache npm install
docker-compose exec apache npm run dev
docker-compose exec apache npm run build

# Database access
docker-compose exec mysql mysql -u root -p

# Container shell
docker-compose exec apache bash
```

### ⚠️ Belangrijke Docker regels

- **NOOIT** directe `php`, `composer`, of `npm` commands gebruiken (tenzij lokaal geïnstalleerd)
- **ALTIJD** `docker-compose exec apache` prefix gebruiken voor PHP/Composer commands
- Database credentials staan in `.env` en worden automatisch door Docker geconfigureerd

---

## 📝 Code Conventies

### 1. Models (`src/Domain/[Domain]/Models/`)

```php
<?php

namespace Src\Domain\[Domain]\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class [Model] extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'date_field' => 'date:d/m/Y',
            'is_active' => 'boolean',
        ];
    }

    // Relaties
    public function relatedModels(): HasMany
    {
        return $this->hasMany(RelatedModel::class);
    }
}
```

**Regels:**
- Models staan ALTIJD in `src/Domain/[Domain]/Models/`
- Gebruik `$fillable` voor mass assignment
- Definieer `casts()` method voor type casting (Laravel 11+)
- Documenteer properties met PHPDoc block

### 2. Actions (`src/Domain/[Domain]/Actions/`)

Actions bevatten **ALLE** business logica. Controllers zijn alleen voor HTTP handling.

```php
<?php

namespace Src\Domain\[Domain]\Actions;

use Src\Domain\[Domain]\Data\[Model]Data;
use Src\Domain\[Domain]\Models\[Model];

class Create[Model]Action
{
    public function __invoke([Model]Data $data): [Model]
    {
        $model = [Model]::create([
            'name' => $data->name,
            'description' => $data->description,
        ]);

        return $model;
    }
}
```

**Regels:**
- Gebruik `__invoke()` method voor single-purpose actions
- Accepteer DTO's als input, NOOIT raw arrays of Request objects
- Return altijd het gecreëerde/gewijzigde model of entity
- Gebruik dependency injection voor andere actions

### 3. Data Transfer Objects (DTOs)

Gebruik Spatie Laravel Data voor DTOs:

```php
<?php

namespace Src\Domain\[Domain]\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Email;

class [Model]Data extends Data
{
    public function __construct(
        #[Required]
        public string $name,
        #[Required, Email]
        public string $email,
        public ?string $description = null,
    ) {}
}
```

**Regels:**
- Extend ALTIJD van `Spatie\LaravelData\Data`
- Gebruik type hints voor alle properties
- Nullable properties hebben `?` prefix en default `null` value
- Gebruik `[Model]Data` voor input, `[Model]Entity` voor output
- Gebruik Spatie validation attributes voor validatie

### 4. Controllers (`src/App/Portal/[Domain]/Controllers/`)

```php
<?php

namespace App\Portal\[Domain]\Controllers;

use Src\Domain\[Domain]\Actions\Create[Model]Action;
use Src\Domain\[Domain]\Data\[Model]Data;
use Src\Domain\[Domain]\Models\[Model];
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Src\Support\Controllers\Controller;

class [Model]Controller extends Controller
{
    public function store(
        [Model]Data $data,
        Create[Model]Action $action
    ): RedirectResponse {
        $model = $action($data);

        return redirect()->back()->with('newEntry', $model);
    }

    public function show([Model] $model): Response
    {
        return Inertia::render('Portal/[Domain]/Detail', [
            '[model]' => $model,
        ]);
    }
}
```

**Regels:**
- Controllers bevatten GEEN business logica
- Injecteer Actions en DTOs via method injection
- Gebruik Inertia voor responses
- Extend van `Src\Support\Controllers\Controller`

---

## 🎨 Frontend Conventies (Vue 3 + Inertia.js)

### Component Structuur

```vue
<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import { useForm } from "@inertiajs/vue3";

const props = defineProps({
    models: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    name: '',
    email: '',
});
</script>

<template>
    <MainLayout>
        <!-- Content -->
    </MainLayout>
</template>
```

**Regels:**
- Gebruik Composition API met `<script setup lang="ts">`
- Gebruik TypeScript voor type safety
- Gebruik `useForm` van Inertia voor form handling

---

## 📚 Documentatie Workflow (AI Docs Kit)

### Configuratie

Lees altijd eerst `ai-docs.config.json` voor project-specifieke instellingen:
- `config.language` - Documentatie taal (nl)
- `config.paths.domainSource` - Domain source pad (`src/Domain`)
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

```mdx
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
```

### MDX Syntax Regels

- Escape PHP generics: `Collection<User>` → `Collection&lt;User&gt;` of backticks
- Quote frontmatter strings: `title: "Page Title"`
- Sluit alle component tags correct

---

## 🔍 Quality Checks

### Voor elke commit

```bash
# PHP code style
docker-compose exec apache composer pint

# Static analysis
docker-compose exec apache ./vendor/bin/phpstan analyse

# Tests
docker-compose exec apache composer test
```

---

## ⚠️ Belangrijke Don'ts

### ❌ NOOIT doen:

1. **Business logica in Controllers**
2. **Raw arrays in plaats van DTOs**
3. **Facades in Actions** (gebruik dependency injection)
4. **Directe PHP/NPM commands** (gebruik Docker)
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

```
@docs/CONTEXT.md          # Overzicht van alle documentatie
@docs/logic/              # Alle business logic flows
@docs/domains/            # Alle domain documentatie
@docs/cases/              # Alle case studies
@docs/development.mdx     # Development workflow
```

### Beschikbare Domains

- **Auth Domain** - `docs/domains/auth.mdx` - Authenticatie, registratie en wachtwoordbeheer
- **Settings Domain** - `docs/domains/settings.mdx` - Profiel en wachtwoord instellingen
- **User Domain** - `docs/domains/user.mdx` - Gebruikersbeheer en profiel operaties

### Beschikbare Business Logic Flows

- **Login Flow** - `docs/logic/login.mdx` - Business logica voor het inloggen van gebruikers
- **Register Flow** - `docs/logic/register.mdx` - Business logica voor het registreren van nieuwe gebruikers
- **Password Reset Link Flow** - `docs/logic/password-reset-link.mdx` - Business logica voor het versturen van wachtwoord reset links
- **Reset Password Flow** - `docs/logic/reset-password.mdx` - Business logica voor het resetten van wachtwoorden met token
- **Confirm Password Flow** - `docs/logic/confirm-password.mdx` - Business logica voor het bevestigen van wachtwoorden voor gevoelige acties
- **Update Password Flow** - `docs/logic/update-password.mdx` - Business logica voor het wijzigen van wachtwoorden door ingelogde gebruikers
- **Update Profile Flow** - `docs/logic/update-profile.mdx` - Business logica voor het bijwerken van gebruikersprofielen
- **Delete User Flow** - `docs/logic/delete-user.mdx` - Business logica voor het verwijderen van gebruikersaccounts

### Beschikbare Case Studies

- **User Registration with Email Verification** - `docs/cases/user-registration-email-verification.mdx` - Systeem interacties tijdens gebruiker registratie met e-mail verificatie
- **Password Reset with Email Delivery** - `docs/cases/password-reset-email-delivery.mdx` - Systeem interacties tijdens wachtwoord reset met e-mail levering
- **Profile Update with Email Verification Reset** - `docs/cases/profile-update-email-verification.mdx` - Systeem interacties tijdens profiel update met e-mail verificatie reset
- **User Account Deletion with Session Cleanup** - `docs/cases/user-deletion-session-cleanup.mdx` - Systeem interacties tijdens account verwijdering met sessie cleanup

### Quick Reference

| Taak | Documentatie |
|------|--------------|
| Nieuwe feature bouwen | `@docs/development.mdx` |
| Domain begrijpen | `@docs/domains/[domain].mdx` |
| Business flow begrijpen | `@docs/logic/[flow].mdx` |
| Complexe interactie begrijpen | `@docs/cases/[case].mdx` |



