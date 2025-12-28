# Example Documentation Output

This folder contains **examples** of what the AI Docs Kit generates. These are sample files to help you understand the output format before running the kit on your own codebase.

## Files

| File | Description |
|------|-------------|
| `sample-domain.mdx` | Example domain documentation (DTOs, Actions, Models) |
| `sample-logic-flow.mdx` | Example business logic flow with Mermaid diagrams |
| `sample-case.mdx` | Example case study for system interactions |

## What You'll Get

When you run the kit on your Laravel DDD project, you'll get:

### Domain Documentation (`docs/domains/`)
- One file per domain
- Complete DTO documentation with `<ParamField>` components
- All Actions with usage examples
- Model relationships, scopes, and accessors

### Business Logic (`docs/logic/`)
- Workflow documentation for complex processes
- Mermaid flowcharts
- Business rules in accordion format
- Edge cases with warnings
- QA test scenarios

### Case Studies (`docs/cases/`)
- Inter-system interaction documentation
- Sequence diagrams
- API contracts
- Error handling scenarios
- Monitoring alerts

## Preview These Examples

To preview these examples locally:

```bash
# From the ai-docs root
cd examples
mint dev
```

Note: You'll need a `docs.json` in the examples folder to preview. Copy from the main folder if needed.



