# Documentation Context Index

Dit bestand dient als een overzicht van alle beschikbare documentatie voor Cursor AI. Gebruik `@docs/CONTEXT.md` in Cursor om snel toegang te krijgen tot alle documentatie.

## Quick Reference

Gebruik deze `@` syntax in Cursor om documentatie te laden:

```
@docs/CONTEXT.md              # Dit overzicht
@docs/development.mdx         # Development workflow
@docs/logic/                  # Alle business logic flows
@docs/domains/                # Alle domain documentatie
@docs/cases/                  # Alle case studies
@docs/setup.mdx              # Setup instructies
@docs/index.mdx              # Introductie pagina
```

## Getting Started

### Essentials

- **index.mdx** - Introductie en overzicht van de documentatie
- **setup.mdx** - Installatie en configuratie van de development omgeving
- **development.mdx** - Stap-voor-stap gids voor het toevoegen van nieuwe features
- **steps/step-incremental-update.mdx** - Incremental documentation updates workflow

### AI Tools

- **ai-tools/cursor.mdx** - Cursor AI tool documentatie
- **ai-tools/claude-code.mdx** - Claude Code tool documentatie
- **ai-tools/windsurf.mdx** - Windsurf tool documentatie

## Business Logic Flows

Alle business logic flows zijn gedocumenteerd in `docs/logic/` met complete Mermaid diagrammen, business regels, edge cases, en QA scenario's.

### Authentication Flows

- **login.mdx** - Login Flow - Business logica voor het inloggen van gebruikers
- **register.mdx** - Register Flow - Business logica voor het registreren van nieuwe gebruikers
- **password-reset-link.mdx** - Password Reset Link Flow - Business logica voor het versturen van wachtwoord reset links
- **reset-password.mdx** - Reset Password Flow - Business logica voor het resetten van wachtwoorden met token
- **confirm-password.mdx** - Confirm Password Flow - Business logica voor het bevestigen van wachtwoorden voor gevoelige acties

### User Management Flows

- **update-password.mdx** - Update Password Flow - Business logica voor het wijzigen van wachtwoorden door ingelogde gebruikers
- **update-profile.mdx** - Update Profile Flow - Business logica voor het bijwerken van gebruikersprofielen
- **delete-user.mdx** - Delete User Flow - Business logica voor het verwijderen van gebruikersaccounts

## Domain Documentation

Alle domains zijn volledig gedocumenteerd in `docs/domains/` met alle DTOs, Actions, Models, en gebruiksvoorbeelden.

### Available Domains

1. **auth.mdx** - Auth Domain
   - Authenticatie, registratie en wachtwoordbeheer
   - DTOs: LoginData, RegisterData, PasswordResetLinkData, NewPasswordData, ConfirmPasswordData
   - Actions: LoginAction, RegisterAction, SendPasswordResetLinkAction, ResetPasswordAction, ConfirmPasswordAction

2. **settings.mdx** - Settings Domain
   - Profiel en wachtwoord instellingen
   - DTOs: ProfileUpdateData, PasswordUpdateData
   - Actions: UpdatePasswordAction

3. **user.mdx** - User Domain
   - Gebruikersbeheer en profiel operaties
   - DTOs: UserData
   - Actions: UpdateUserProfileAction, DeleteUserAction
   - Models: User

## Case Studies

Complexe multi-systeem interacties zijn gedocumenteerd in `docs/cases/` met gedetailleerde systeem interactie diagrammen.

### Available Cases

1. **user-registration-email-verification.mdx**
   - User Registration with Email Verification - Systeem Interacties
   - Systemen: Auth Domain, User Domain, Laravel Events System, Database, Email System
   - Interactie: Cross-domain orchestration + event-driven flow

2. **password-reset-email-delivery.mdx**
   - Password Reset with Email Delivery - Systeem Interacties
   - Systemen: Auth Domain, Laravel Password Facade, Email System, Database, Session Management
   - Interactie: External integration (email) + data synchronization

3. **profile-update-email-verification.mdx**
   - Profile Update with Email Verification Reset - Systeem Interacties
   - Systemen: Settings Domain, User Domain, Database, Email Verification System
   - Interactie: Cross-domain orchestration + state management

4. **user-deletion-session-cleanup.mdx**
   - User Account Deletion with Session Cleanup - Systeem Interacties
   - Systemen: User Domain, Auth Domain, Session Management, Database
   - Interactie: Cross-domain orchestration + state cleanup

## Usage Examples

### Example 1: Understanding a Domain

```
@docs/domains/auth.mdx
```

Dit laadt de volledige Auth domain documentatie met alle DTOs, Actions, en gebruiksvoorbeelden.

### Example 2: Understanding a Business Flow

```
@docs/logic/login.mdx
```

Dit laadt de complete Login flow documentatie met Mermaid diagram, business regels, edge cases, en QA scenario's.

### Example 3: Understanding System Interactions

```
@docs/cases/user-registration-email-verification.mdx
```

Dit laadt de case study over user registratie met alle systeem interacties en dependencies.

### Example 4: Development Workflow

```
@docs/development.mdx
```

Dit laadt de development workflow gids voor het toevoegen van nieuwe features.

## Documentation Structure

```
docs/
├── index.mdx                    # Introductie
├── setup.mdx                    # Setup gids
├── development.mdx              # Development workflow
├── CONTEXT.md                   # Dit bestand
├── logic/                       # Business logic flows (8 files)
│   ├── login.mdx
│   ├── register.mdx
│   ├── password-reset-link.mdx
│   ├── reset-password.mdx
│   ├── confirm-password.mdx
│   ├── update-password.mdx
│   ├── update-profile.mdx
│   └── delete-user.mdx
├── domains/                     # Domain documentatie (3 files)
│   ├── auth.mdx
│   ├── settings.mdx
│   └── user.mdx
├── cases/                       # Case studies (4 files)
│   ├── user-registration-email-verification.mdx
│   ├── password-reset-email-delivery.mdx
│   ├── profile-update-email-verification.mdx
│   └── user-deletion-session-cleanup.mdx
├── steps/                       # Workflow steps
│   └── step-incremental-update.mdx
└── ai-tools/                    # AI tool documentatie
    ├── cursor.mdx
    ├── claude-code.mdx
    └── windsurf.mdx
```

## Summary

- **Total Documentation Files:** 19
  - Getting Started: 4 files
  - Business Logic: 8 flow documents
  - Cases: 4 case documents
  - Domains: 3 domain documents

Alle documentatie is georganiseerd in Mintlify tabs en klaar voor gebruik. Gebruik `@docs/` syntax in Cursor om snel toegang te krijgen tot specifieke documentatie.

