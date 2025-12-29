# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@cawpea/coderef` is a tool for validating and auto-fixing code references in markdown documentation. It ensures code snippets in documentation stay synchronized with actual source code through CODE_REF comments and AST-based symbol searching.

## Development Commands

### Building
```bash
npm run build              # Build for production (CJS + ESM + types)
npm run dev                # Watch mode for development
```

### Testing
```bash
npm test                   # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
```

Coverage thresholds are set to 80% for all metrics (branches, functions, lines, statements). CLI code is excluded from coverage as it's verified through integration tests.

### Linting & Formatting
```bash
npm run lint               # Lint TypeScript files
npm run lint:fix           # Auto-fix linting issues
npm run format             # Format code with Prettier
npm run format:check       # Check formatting without modifying
npm run type-check         # Run TypeScript compiler checks
```

### Single Test Execution
```bash
npx jest src/utils/foo.test.ts       # Run specific test file
npx jest -t "<test-name-pattern>"    # Run tests matching pattern
```

## Git Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

### Commit Message Format
```
<type>: <description>

[optional body]

[optional footer]
```

### Commit Types

| Type       | Description                                                    | Semantic Version Impact | Examples                                   |
| ---------- | -------------------------------------------------------------- | ----------------------- | ------------------------------------------ |
| `feat`     | New feature                                                    | MINOR (1.x.0)           | Add evaluation agent, new UI component     |
| `fix`      | Bug fix                                                        | PATCH (1.0.x)           | Fix contrast ratio calculation error       |
| `docs`     | Documentation only changes                                     | None                    | Update README, add comments                |
| `style`    | Changes that don't affect code meaning (whitespace, formatting)| None                    | Run Prettier, fix indentation              |
| `refactor` | Code changes that neither fix bugs nor add features            | None                    | Split function, rename variables           |
| `test`     | Adding or updating tests                                       | None                    | Add unit tests, improve mocks              |
| `chore`    | Changes to build process or tools                              | None                    | Update dependencies, modify config files   |
| `ci`       | Changes to CI configuration files and scripts                  | None                    | Update GitHub Actions                      |
| `perf`     | Performance improvements                                       | PATCH (1.0.x)           | Optimize API response time                 |
| `build`    | Changes to build system or external dependencies               | None                    | Modify Webpack config, add npm scripts     |
| `revert`   | Revert a previous commit                                       | Depends on original     | Revert previous commit                     |

## Architecture

### Build System
- **tsup**: Generates both CJS and ESM formats with type declarations
- Output directory: `./dist`
- Entry points defined in package.json exports for proper dual-package support

### Module Structure
The project is organized into three main directories under `src/`:
- `cli/`: Command-line interface implementations (validate.ts, fix.ts)
- `core/`: Core validation and fixing logic
- `utils/`: Shared utility functions

### CODE_REF Syntax Patterns
The tool supports three reference patterns:

1. **Line-based references**: `<!-- CODE_REF: src/index.ts:10-20 -->`
2. **Symbol references**: `<!-- CODE_REF: src/index.ts#myFunction -->`
3. **Class method references**: `<!-- CODE_REF: src/MyClass.ts#MyClass#myMethod -->`

### AST Parsing
Uses `@typescript-eslint/typescript-estree` for TypeScript/JavaScript symbol searching and code extraction.

### Test Configuration
- Test files: Co-located with source files as `**/*.test.ts`
- Path alias: `@/` maps to `src/`
- Environment: Node.js
- Preset: ts-jest

## Publishing
The `prepublishOnly` script ensures both build and tests pass before publishing to npm.

## Node Version
Minimum Node.js version: 16.0.0
